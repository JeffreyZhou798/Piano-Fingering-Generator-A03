// 主处理逻辑 - 翻译自 src/process.jl
import { Note, Hand, Finger, Fingering, Part, FingeringResult, FingeringResultEntry, ProgressCallback } from './types';
import { QLearningSolver } from './qlearning';

/**
 * 分段范围计算
 */
function splitedRange(notes: Note[][], hand: Hand): number[][] {
  const ranges: number[][] = [];
  let start = 0;
  const maxSegmentSize = 50; // 每段最多50个音符组

  while (start < notes.length) {
    const end = Math.min(start + maxSegmentSize, notes.length);
    ranges.push([start, end]);
    start = end;
  }

  return ranges;
}

/**
 * 带进度追踪的分段处理
 */
function runSplitWithProgress(
  notes: Note[][],
  hand: Hand,
  readRange: number[][],
  totalSegments: number,
  completedSegments: { value: number },
  progressCallback?: ProgressCallback
): Fingering[] {
  const resultFingering: Fingering[] = new Array(notes.length);

  for (let index = 0; index < readRange.length; index++) {
    const [start, end] = readRange[index];
    const rangeLen = readRange.length;

    // 确定部分类型
    let part: Part;
    if (rangeLen === 1) {
      part = Part.WholePart;
    } else if (index === 0) {
      part = Part.FirstPart;
    } else if (index === rangeLen - 1) {
      part = Part.LastPart;
    } else {
      part = Part.MiddlePart;
    }

    // 创建求解器
    const solver = new QLearningSolver({
      nEpisodes: 100,
      maxEpisodeLength: 100,
      learningRate: 0.99,
      explorationRate: 0.8
    });

    // 求解
    const segmentNotes = notes.slice(start, end);
    const policy = solver.solve(hand, segmentNotes, part, (episode, total) => {
      // 内部进度（可选）
    });

    // 保存结果
    for (let i = 0; i < policy.length; i++) {
      resultFingering[start + i] = policy[i];
    }

    console.log(`Completed: part ${index + 1}/${rangeLen}, length ${segmentNotes.length}`);

    // 更新进度
    completedSegments.value += 1;
    const progressPct = (completedSegments.value / totalSegments) * 100;

    if (progressCallback) {
      try {
        progressCallback(progressPct);
      } catch (e) {
        console.warn('Progress callback failed:', e);
      }
    }
  }

  console.log('runSplitWithProgress result:', {
    isArray: Array.isArray(resultFingering),
    length: resultFingering.length,
    firstItem: resultFingering[0],
    lastItem: resultFingering[resultFingering.length - 1]
  });

  return resultFingering;
}

/**
 * 主指法生成函数
 */
export function generateFingering(
  notesRh: Note[][],
  notesLh: Note[][],
  progressCallback?: ProgressCallback
): FingeringResult {
  console.log('generateFingering called with:', {
    rhLength: notesRh.length,
    lhLength: notesLh.length
  });

  // 处理空手的情况
  if (notesRh.length === 0 && notesLh.length === 0) {
    console.warn('Both hands are empty!');
    return { rightHand: [], leftHand: [] };
  }

  // 计算总分段数
  const readRangeRh = notesRh.length > 0 ? splitedRange(notesRh, Hand.RightHand) : [];
  const readRangeLh = notesLh.length > 0 ? splitedRange(notesLh, Hand.LeftHand) : [];
  const totalSegments = readRangeRh.length + readRangeLh.length;
  const completedSegments = { value: 0 };

  let rhResult: Fingering[] = [];
  let lhResult: Fingering[] = [];

  if (notesRh.length > 0) {
    console.log('Right hand processing started...');
    rhResult = runSplitWithProgress(
      notesRh,
      Hand.RightHand,
      readRangeRh,
      totalSegments,
      completedSegments,
      progressCallback
    );
  } else {
    console.log('Right hand is empty, skipping...');
  }

  if (notesLh.length > 0) {
    console.log('Left hand processing started...');
    lhResult = runSplitWithProgress(
      notesLh,
      Hand.LeftHand,
      readRangeLh,
      totalSegments,
      completedSegments,
      progressCallback
    );
  } else {
    console.log('Left hand is empty, skipping...');
  }

  // 转换为输出格式
  const result = {
    rightHand: rhResult.length > 0 ? convertToFingeringEntries(rhResult) : [],
    leftHand: lhResult.length > 0 ? convertToFingeringEntries(lhResult) : []
  };

  console.log('generateFingering result:', {
    rhCount: result.rightHand.length,
    lhCount: result.leftHand.length
  });

  return result;
}

/**
 * 转换为指法条目格式
 */
function convertToFingeringEntries(
  fingerings: Fingering[]
): FingeringResultEntry[] {
  console.log('convertToFingeringEntries called with:', {
    isArray: Array.isArray(fingerings),
    length: fingerings?.length,
    type: typeof fingerings
  });

  if (!Array.isArray(fingerings)) {
    console.error('fingerings is not an array!', fingerings);
    throw new Error(`fingerings must be an array, got ${typeof fingerings}`);
  }

  const entries: FingeringResultEntry[] = [];

  for (let i = 0; i < fingerings.length; i++) {
    const fingering = fingerings[i];
    
    console.log(`Processing fingering ${i}:`, {
      isArray: Array.isArray(fingering),
      length: fingering?.length,
      type: typeof fingering
    });

    // 防御性检查：确保fingering是数组
    if (!Array.isArray(fingering)) {
      console.error(`Invalid fingering at index ${i} (not an array):`, fingering);
      continue;
    }

    for (let j = 0; j < fingering.length; j++) {
      const entry = fingering[j];
      
      // 防御性检查：确保entry有必需的属性
      if (!entry || typeof entry.pitch !== 'number' || typeof entry.finger !== 'number') {
        console.error(`Invalid fingering entry at [${i}][${j}]:`, entry);
        continue;
      }

      entries.push({
        pitch: entry.pitch,
        finger: entry.finger,
        position: entries.length // 使用当前长度作为position
      });
    }
  }

  console.log('convertToFingeringEntries result:', {
    entriesCount: entries.length
  });

  return entries;
}
