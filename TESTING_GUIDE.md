# 测试指南 - PianoFingering.jl Web版

## 🎯 测试目标

验证所有CompositionExamples文件都能正确生成完整的左右手指法。

## 📋 测试文件清单

| 文件名 | 预期右手指法 | 预期左手指法 | 备注 |
|--------|------------|------------|------|
| simple_test.musicxml | 4 | 4 | 最简单的测试用例 |
| simple_test2.mxl | 4 | 4 | MXL压缩格式 |
| S1_Bach_G_Major.musicxml | 66 | 59 | 巴赫G大调 |
| S1_Bach_G_Major2.mxl | 66 | 59 | MXL格式 |
| S6_no_5.musicxml | 95 | 167 | 左手音符更多 |
| S6_no_5-2.mxl | 95 | 167 | MXL格式 |
| Waltz.musicxml | 109 | 103 | 华尔兹 |
| Waltz2.mxl | 109 | 103 | MXL格式 |
| S8_wedding.musicxml | 180 | 77 | 婚礼进行曲 |
| S8_wedding2.mxl | 180 | 77 | MXL格式 |
| S9_turkish_march.musicxml | 143 | 116 | 土耳其进行曲 |
| S9_turkish_march2.mxl | 143 | 116 | MXL格式 |

## 🔍 测试步骤

### 1. 启动开发服务器

```bash
cd frontend
npm run dev
```

访问：http://localhost:3000

### 2. 打开浏览器控制台

按F12打开开发者工具，切换到Console标签页。

### 3. 测试单个文件

1. 点击"选择文件"按钮
2. 选择CompositionExamples目录中的一个文件
3. 等待处理完成（30秒-2分钟）
4. 观察控制台输出
5. 下载生成的MusicXML文件

### 4. 验证控制台日志

应该看到以下关键日志：

```
[Parser] Extracted X note groups. Staff distribution: staff1=X, staff2=X
[Parser] Split result: X right hand groups, X left hand groups
generateFingering called with: rhLength=X, lhLength=X
Right hand processing started...
Completed: part 1/Y, length Z
Left hand processing started...
Completed: part 1/Y, length Z
generateFingering result: rhCount=X, lhCount=X
addFingeringToMusicXML called with: rightHandCount=X, leftHandCount=X
right hand: processed X notes (skipped X from other staff, X tied), added X fingerings
left hand: processed X notes (skipped X from other staff, X tied), added X fingerings
```

### 5. 检查关键数值

对于每个文件，验证：

- ✅ `rhCount` = 预期右手指法数量
- ✅ `lhCount` = 预期左手指法数量
- ✅ `added X fingerings` = 对应的指法数量
- ⚠️ 如果有警告"Pitch mismatch"，记录下来

### 6. 在MuseScore中验证

1. 打开MuseScore
2. 导入下载的MusicXML文件
3. 检查：
   - 右手（高音谱表）每个音符是否都有指法数字
   - 左手（低音谱表）每个音符是否都有指法数字
   - 指法数字是否合理（1-5）
   - 没有重复或缺失的指法

## ⚠️ 常见问题

### 问题1：部分音符没有指法

**可能原因：**
- 音高匹配失败（控制台会显示"Pitch mismatch"）
- 连音线处理问题
- Staff编号识别错误

**检查方法：**
查看控制台日志中的：
- `processed X notes` vs `added X fingerings`
- 如果数字不匹配，说明有音符没有被添加指法

### 问题2：左手或右手完全没有指法

**可能原因：**
- Staff分割失败
- Channel映射错误

**检查方法：**
查看控制台日志：
- `Staff distribution: staff1=X, staff2=X`
- `Split result: X right hand groups, X left hand groups`
- 如果某只手的groups=0，说明分割失败

### 问题3：指法数量不匹配

**可能原因：**
- 和弦处理问题
- 休止符处理问题
- 连音线处理问题

**检查方法：**
对比：
- 预期指法数量（见上表）
- 实际生成数量（`rhCount`, `lhCount`）
- 实际添加数量（`added X fingerings`）

## 📊 测试记录模板

```
文件名: _______________
日期: _______________

解析结果:
- 右手音符组: _____
- 左手音符组: _____
- Staff1音符: _____
- Staff2音符: _____

生成结果:
- 右手指法: _____ (预期: _____)
- 左手指法: _____ (预期: _____)

写入结果:
- 右手添加: _____ (预期: _____)
- 左手添加: _____ (预期: _____)

MuseScore验证:
- 右手完整性: ☐ 完整 ☐ 部分缺失 ☐ 完全缺失
- 左手完整性: ☐ 完整 ☐ 部分缺失 ☐ 完全缺失
- 指法合理性: ☐ 合理 ☐ 部分不合理 ☐ 不合理

问题记录:
_______________________________
_______________________________
```

## 🎯 成功标准

所有12个文件都满足：
- ✅ 右手指法数量 = 预期数量
- ✅ 左手指法数量 = 预期数量
- ✅ MuseScore中所有音符都有指法
- ✅ 没有"Pitch mismatch"警告
- ✅ 指法数字合理（1-5）

## 🔧 调试工具

### 运行解析测试

```bash
cd frontend
node test-parser.js
```

查看每个文件的音符统计。

### 运行提取测试

```bash
cd frontend
node test-extraction.js
```

查看音符提取和分割的详细结果。

## 📝 报告问题

如果发现问题，请记录：
1. 文件名
2. 控制台完整日志
3. MuseScore截图
4. 预期 vs 实际的指法数量
5. 具体哪些音符缺失指法

---

**测试链接：** http://localhost:3000
**最后更新：** 2026-01-20
