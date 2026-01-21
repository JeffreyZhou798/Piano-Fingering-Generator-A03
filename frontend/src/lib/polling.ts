// src/lib/polling.ts

import { checkJobStatus } from './api';

export interface JobStatus {
  job_id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  created_at: string;
  started_at?: string;
  completed_at?: string;
  duration?: number;
  result?: string;
  filename?: string;
  error?: string;
}

export interface PollingOptions {
  interval?: number;        // 轮询间隔（毫秒）
  maxAttempts?: number;     // 最大尝试次数
  onProgress?: (status: JobStatus) => void;
  onComplete?: (result: string, filename: string) => void;
  onError?: (error: string) => void;
}

/**
 * 轮询作业状态
 */
export async function pollJobStatus(
  jobId: string,
  options: PollingOptions = {}
): Promise<{ result?: string; filename?: string; error?: string }> {
  const {
    interval = 3000,        // 默认 3 秒
    maxAttempts = 200,      // 默认最多 200 次（10 分钟）
    onProgress,
    onComplete,
    onError,
  } = options;

  let attempts = 0;

  return new Promise((resolve) => {
    const poll = async () => {
      attempts++;

      try {
        const status: JobStatus = await checkJobStatus(jobId);

        // 调用进度回调
        if (onProgress) {
          onProgress(status);
        }

        // 根据状态处理
        if (status.status === 'completed') {
          console.log('作业完成', status);
          if (onComplete && status.result && status.filename) {
            onComplete(status.result, status.filename);
          }
          resolve({
            result: status.result,
            filename: status.filename,
          });
          return;
        }

        if (status.status === 'failed') {
          console.error('作业失败', status);
          const errorMsg = status.error || '处理失败';
          if (onError) {
            onError(errorMsg);
          }
          resolve({
            error: errorMsg,
          });
          return;
        }

        // 继续轮询
        if (attempts < maxAttempts) {
          setTimeout(poll, interval);
        } else {
          const error = '处理超时，请稍后重试';
          console.error(error);
          if (onError) {
            onError(error);
          }
          resolve({ error });
        }
      } catch (error) {
        console.error('轮询错误', error);
        if (attempts < maxAttempts) {
          setTimeout(poll, interval);
        } else {
          const errorMessage = '网络错误，请检查连接后重试';
          if (onError) {
            onError(errorMessage);
          }
          resolve({ error: errorMessage });
        }
      }
    };

    // 开始轮询
    poll();
  });
}
