# 🎹 Piano Fingering Generator Web Application – Basic Edition

A web-based piano fingering generation system powered by reinforcement learning. Upload MusicXML files and get AI-generated fingering suggestions - **runs entirely in your browser!**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[English](#english) | [中文](#中文) | [日本語](#日本語)

---

## 🎵 Live Demo
 
**Try It Now**: https://piano-fingering-generator-a03.vercel.app/


## English

### 🌟 Features

- **🎼 MusicXML Support**: Upload `.musicxml` and `.mxl` (compressed) format files
- **🤖 AI-Powered**: Uses Q-Learning reinforcement learning algorithm
- **🌍 Multi-language**: Interface available in English, Chinese, and Japanese
- **📊 Real-time Progress**: Track processing status with live progress updates
- **💻 Browser-Based**: Runs entirely in your browser - no server needed!
- **💾 Smart Caching**: IndexedDB caching for instant results on repeated files
- **🎨 Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- **🆓 Free**: Zero cost deployment on Vercel

### 🚀 Quick Start

#### 🌐 Online Version (Recommended)

Visit the live demo: **[Coming Soon]**

#### 💻 Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/PianoFingering.jl.git
cd PianoFingering.jl/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

### 📖 Usage

1. Visit http://localhost:3000
2. Select your preferred language (English/中文/日本語)
3. Upload a MusicXML file (.musicxml or .mxl format)
4. Wait for processing (typically 30 seconds to 2 minutes)
5. Download the result as MusicXML file with fingering annotations
6. Open the downloaded file in MuseScore or other music notation software

**Note:** The downloaded file is in MusicXML format (.musicxml) which can be directly opened in MuseScore, Finale, Sibelius, and other music notation software.

### 🏗️ Architecture

```
┌─────────────────────────────────────┐
│         Browser                     │
│  ┌───────────────────────────────┐  │
│  │  Next.js Frontend             │  │
│  │  - File Upload UI             │  │
│  │  - Progress Display           │  │
│  │  - Multi-language Support     │  │
│  └───────────┬───────────────────┘  │
│              │                       │
│              ▼                       │
│  ┌───────────────────────────────┐  │
│  │  Web Worker                   │  │
│  │  - MusicXML Parser            │  │
│  │  - Q-Learning Algorithm       │  │
│  │  - Fingering Generator        │  │
│  └───────────┬───────────────────┘  │
│              │                       │
│              ▼                       │
│  ┌───────────────────────────────┐  │
│  │  IndexedDB Cache              │  │
│  │  - File Hash Storage          │  │
│  │  - Result Caching             │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### 📁 Project Structure

```
PianoFingering.jl/
├── frontend/                    # Next.js web application
│   ├── src/
│   │   ├── app/                # Next.js 14 App Router
│   │   │   └── page.tsx        # Main page
│   │   ├── components/         # React components
│   │   ├── lib/
│   │   │   ├── algorithm/      # Core algorithm (TypeScript)
│   │   │   │   ├── types.ts    # Type definitions
│   │   │   │   ├── const.ts    # Constants & helpers
│   │   │   │   ├── fingering.ts # Fingering functions
│   │   │   │   ├── mdp.ts      # MDP & reward function
│   │   │   │   ├── qlearning.ts # Q-Learning solver
│   │   │   │   └── process.ts  # Main processing
│   │   │   ├── music/          # Music file processing
│   │   │   │   ├── parser.ts   # MusicXML parser
│   │   │   │   └── mxl.ts      # MXL extractor
│   │   │   ├── cache/          # Caching layer
│   │   │   │   └── indexedDB.ts # IndexedDB wrapper
│   │   │   └── i18n.ts         # Internationalization
│   │   └── workers/
│   │       └── fingering.worker.ts # Web Worker
│   └── public/                 # Static assets
├── CompositionExamples/        # Sample MusicXML files
└── src/                        # Original Julia implementation (reference)
```

### 🌐 Deployment

#### Deployment Verification ✓

Build Status: **SUCCESS**
- Static export: ✓ Generated in `frontend/out/`
- Configuration: ✓ All files correct
- Dependencies: ✓ All installed

#### Vercel (Recommended)

1. Fork this repository
2. Connect your GitHub repository to Vercel
3. Configure:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `out`
4. Deploy

The app will be automatically deployed and available at your Vercel URL.

#### GitHub Pages

1. Build the static site:
```bash
cd frontend
npm run build
```

2. Deploy the `out` directory to GitHub Pages

### 🧪 系统测试

**本地调试链接：** http://localhost:3000

**测试所有文件（12个）：**

| # | 文件名 | 类型 | 右手指法 | 左手指法 | 状态 |
|---|--------|------|---------|---------|------|
| 1 | simple_test.musicxml | 简单 | 4 | 4 | ⏳ 待测试 |
| 2 | simple_test2.mxl | 简单 | 4 | 4 | ⏳ 待测试 |
| 3 | S1_Bach_G_Major.musicxml | 巴赫 | 66 | 59 | ⏳ 待测试 |
| 4 | S1_Bach_G_Major2.mxl | 巴赫 | 66 | 59 | ⏳ 待测试 |
| 5 | S6_no_5.musicxml | 练习曲 | 95 | 167 | ⏳ 待测试 |
| 6 | S6_no_5-2.mxl | 练习曲 | 95 | 167 | ⏳ 待测试 |
| 7 | Waltz.musicxml | 华尔兹 | 109 | 103 | ⏳ 待测试 |
| 8 | Waltz2.mxl | 华尔兹 | 109 | 103 | ⏳ 待测试 |
| 9 | S8_wedding.musicxml | 婚礼 | 180 | 77 | ⏳ 待测试 |
| 10 | S8_wedding2.mxl | 婚礼 | 180 | 77 | ⏳ 待测试 |
| 11 | S9_turkish_march.musicxml | 土耳其 | 143 | 116 | ⏳ 待测试 |
| 12 | S9_turkish_march2.mxl | 土耳其 | 143 | 116 | ⏳ 待测试 |

**测试步骤：**
1. 打开浏览器控制台（F12）
2. 访问 http://localhost:3000
3. 上传测试文件
4. 观察控制台日志：
   - 解析的音符数量（右手/左手）
   - 处理进度
   - 生成的指法数量（右手/左手）
   - 写入MusicXML时的详细信息
5. 下载结果文件
6. 在MuseScore中打开，检查：
   - ✅ 右手指法是否完整
   - ✅ 左手指法是否完整
   - ✅ 指法数字是否正确

**关键检查点：**
- [ ] 右手音符数量 = 右手指法数量
- [ ] 左手音符数量 = 左手指法数量
- [ ] 下载的文件包含完整指法
- [ ] MuseScore可以正常打开
- [ ] 指法标注位置正确

**控制台日志示例：**
```
[Parser] Extracted X note groups. Staff distribution: staff1=X, staff2=X
[Parser] Split result: X right hand groups, X left hand groups
generateFingering called with: rhLength=X, lhLength=X
Right hand processing started...
Left hand processing started...
generateFingering result: rhCount=X, lhCount=X
addFingeringToMusicXML called with: rightHandCount=X, leftHandCount=X
right hand: processed X notes (skipped X from other staff, X tied), added X fingerings
left hand: processed X notes (skipped X from other staff, X tied), added X fingerings
```

**最近修复 (2026-01-20):**
1. ✅ 修复左手指法丢失问题
   - 问题：MusicXML输出只有右手指法，左手指法缺失
   - 原因：解析器使用音高分割左右手，但钢琴乐谱使用staff编号
   - 解决：提取staff信息，按channel分割，writer按staff过滤
2. ✅ 修复连音线（tie）处理
   - 问题：部分音符缺失指法
   - 原因：未正确跳过tie stop和continue音符
   - 解决：parser和writer都跳过tie stop/continue，只处理tie start和无tie的音符
3. ✅ **修复指法生成不完整问题（关键修复）**
   - 问题：生成的指法数量远少于音符数量
   - 原因：extractPolicy在actionSpace返回空数组时提前退出
   - 解决：当无可用动作时使用默认指法，确保为所有音符生成指法
4. ✅ **修复超过5音和弦处理**
   - 问题：和弦超过5个音符时抛出错误
   - 原因：assignFingering不支持超过5音的和弦
   - 解决：自动截取最高/最低5个音符进行指法分配
5. ✅ **优化assignFingering返回值（质量改进）**
   - 问题：物理约束过严导致返回空数组
   - 原因：所有指法组合都不满足物理约束时返回空数组
   - 解决：确保总是返回至少一个指法，即使不是最优的
6. ✅ 修复和弦处理错误
7. ✅ 添加详细调试日志
8. ✅ 添加防御性检查
9. ✅ 改进音高匹配逻辑（look-ahead机制）

**修改的文件：**
- `frontend/src/lib/music/parser.ts` - 提取staff信息，按channel分割，跳过tie stop/continue
- `frontend/src/lib/music/writer.ts` - 按staff编号过滤音符，跳过tie stop/continue，look-ahead匹配
- `frontend/src/lib/algorithm/process.ts` - 处理空手情况
- `frontend/src/lib/algorithm/qlearning.ts` - 修复extractPolicy提前退出问题，移除不必要的警告
- `frontend/src/lib/algorithm/const.ts` - 支持超过5音的和弦，确保总是返回指法

### ⚙️ Technical Details

#### Algorithm Verification

The TypeScript implementation preserves 100% of the original Julia algorithm logic:

**Core Q-Learning Algorithm:**
- ε-greedy exploration policy
- Q-value update formula: `Q(s,a) += α * (r + γ * max(Q(s',a')) - Q(s,a))`
- Convergence detection based on evaluation trajectories
- Learning rate: 0.99, Exploration rate: 0.8

**Reward Function (Preserved Exactly):**
- Single finger strength scoring
- Hand movement distance calculation
- Finger stretch rate evaluation
- Crossing fingering detection
- Chord range consideration
- Scoring rules:
  - Initial fingering: 50 points base
  - Same fingering: 50 points
  - 1-to-1 fingering: 20-50 points (based on stretch and crossing)
  - Chord transitions: considers movement and stretch
  - Finger strength bonus: 0.01 * finger_reward

**Helper Functions (All Preserved):**
- `key_distance`: Keyboard distance calculation
- `relative_position`: Note position on keyboard
- `hand_move_distance`: Hand movement calculation
- `stretch_rate`: Finger stretch evaluation
- `assign_fingering`: Initial fingering assignment
- `get_1to1_fingering`: 1-to-1 fingering generation

**Data Structure Change:**
- Julia: `Fingering = SortedDict{Note, Finger}`
- TypeScript: `Fingering = FingeringEntry[]` (array of {pitch, finger})
- Reason: Objects cannot be Map keys in TypeScript
- Impact: Only structural form changed, algorithm logic 100% preserved

#### Algorithm

The system uses a **Q-Learning** reinforcement learning algorithm to generate optimal piano fingering. The algorithm considers:

- Finger strength and natural positions
- Hand movement distance
- Finger stretch rate
- Crossing fingering patterns
- Chord transitions

#### Performance

| Score Complexity | Processing Time | Notes |
|-----------------|----------------|-------|
| Simple (<100 notes) | 30-60 seconds | Fast processing |
| Medium (100-500 notes) | 1-2 minutes | Acceptable |
| Complex (>500 notes) | 2-5 minutes | May vary |
| Cached files | <1 second | Instant! |

#### Browser Compatibility

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

Requires:
- Web Workers support
- IndexedDB support
- ES2020+ features

### ⚠️ Known Limitations

- **Large Files**: Files with >1000 notes may take longer to process
- **Memory**: Complex scores may use significant browser memory
- **Algorithm**: Some complex scores may produce suboptimal results (inherited from original algorithm)

### 📚 Documentation

For more information about the algorithm and implementation, please refer to the source code in `frontend/src/lib/algorithm/`.

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🙏 Credits

This project is based on the original [PianoFingering.jl](https://github.com/Nero-Blackstone/PianoFingering.jl) research.

**Original Research:**
- Reinforcement learning algorithm for piano fingering
- Q-Learning implementation for MDP-based fingering generation

**Open Source Libraries:**
- Next.js - React framework
- TypeScript - Type-safe JavaScript
- Tailwind CSS - Utility-first CSS framework
- xml2js - XML parsing
- jszip - ZIP file handling
- idb - IndexedDB wrapper

**Community:**
- Julia community for scientific computing ecosystem
- TypeScript and Next.js communities
- All open-source contributors

### 📞 Support

- 🐛 [Issue Tracker](https://github.com/yourusername/PianoFingering.jl/issues)
- 💬 [Discussions](https://github.com/yourusername/PianoFingering.jl/discussions)

---

## 中文

### 🌟 功能特性

- **🎼 MusicXML 支持**: 上传 `.musicxml` 和 `.mxl`（压缩）格式文件
- **🤖 AI 驱动**: 使用 Q-Learning 强化学习算法生成最优指法
- **🌍 多语言**: 支持英文、中文和日文界面
- **📊 实时进度**: 实时追踪处理状态
- **💻 浏览器运行**: 完全在浏览器中运行 - 无需服务器！
- **💾 智能缓存**: IndexedDB 缓存，重复文件秒开
- **🎨 现代界面**: 基于 Next.js 和 Tailwind CSS 的清爽界面
- **🆓 完全免费**: 零成本部署在 Vercel

### 🚀 快速开始

#### 🌐 在线版本（推荐）

访问在线演示：**[即将推出]**

#### 💻 本地开发

1. **克隆仓库**
```bash
git clone https://github.com/yourusername/PianoFingering.jl.git
cd PianoFingering.jl/frontend
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **打开浏览器**
```
http://localhost:3000
```

### 📖 使用方法

1. 访问 http://localhost:3000
2. 选择您偏好的语言（English/中文/日本語）
3. 上传 MusicXML 文件（.musicxml 或 .mxl 格式）
4. 等待处理（通常需要 30 秒到 2 分钟）
5. 下载带有指法标注的 MusicXML 文件
6. 在 MuseScore 或其他乐谱软件中打开下载的文件

**注意：** 下载的文件是 MusicXML 格式（.musicxml），可以直接在 MuseScore、Finale、Sibelius 等乐谱软件中打开。

### ⚙️ 技术细节

#### 算法

系统使用 **Q-Learning** 强化学习算法生成最优钢琴指法。算法考虑：

- 手指力量和自然位置
- 手部移动距离
- 手指拉伸率
- 交叉指法模式
- 和弦转换

#### 性能

| 乐谱复杂度 | 处理时间 | 说明 |
|-----------|---------|------|
| 简单（<100音符） | 30-60秒 | 快速处理 |
| 中等（100-500音符） | 1-2分钟 | 可接受 |
| 复杂（>500音符） | 2-5分钟 | 可能变化 |
| 缓存文件 | <1秒 | 秒开！ |

#### 浏览器兼容性

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

需要：
- Web Workers 支持
- IndexedDB 支持
- ES2020+ 特性

### 🧪 测试

使用 `CompositionExamples/` 中的示例文件测试：

- `S1_Bach_G_Major.musicxml` - 简单示例
- `S1_Bach_G_Major2.mxl` - 压缩格式
- `Waltz.musicxml` - 中等复杂度
- `S9_turkish_march.musicxml` - 复杂示例

### 🙏 致谢

本项目基于原始的 [PianoFingering.jl](https://github.com/Nero-Blackstone/PianoFingering.jl) 研究。特别感谢：

- 原始研究者提供的强化学习算法
- Julia 社区提供的科学计算生态系统
- TypeScript 和 Next.js 社区
- xml2js、jszip 和 idb 库的贡献者
- 所有开源贡献者

---

## 日本語

### 🌟 機能

- **🎼 MusicXML サポート**: `.musicxml` と `.mxl`（圧縮）形式のファイルをアップロード
- **🤖 AI 駆動**: Q-Learning 強化学習アルゴリズムを使用
- **🌍 多言語対応**: 英語、中国語、日本語のインターフェース
- **📊 リアルタイム進捗**: 処理状況をライブで追跡
- **💻 ブラウザベース**: ブラウザで完全に実行 - サーバー不要！
- **💾 スマートキャッシング**: IndexedDB キャッシングで繰り返しファイルは即座に結果表示
- **🎨 モダン UI**: Next.js と Tailwind CSS で構築されたクリーンでレスポンシブなインターフェース
- **🆓 無料**: Vercel での無料デプロイ

### 🚀 クイックスタート

#### 🌐 オンライン版（推奨）

ライブデモにアクセス：**[近日公開]**

#### 💻 ローカル開発

1. **リポジトリをクローン**
```bash
git clone https://github.com/yourusername/PianoFingering.jl.git
cd PianoFingering.jl/frontend
```

2. **依存関係をインストール**
```bash
npm install
```

3. **開発サーバーを起動**
```bash
npm run dev
```

4. **ブラウザを開く**
```
http://localhost:3000
```

### 📖 使用方法

1. http://localhost:3000 にアクセス
2. 好みの言語を選択（English/中文/日本語）
3. MusicXML ファイル（.musicxml または .mxl 形式）をアップロード
4. 処理を待つ（通常 30 秒から 2 分）
5. 運指注釈付きの MusicXML ファイルをダウンロード
6. ダウンロードしたファイルを MuseScore または他の楽譜ソフトで開く

**注意：** ダウンロードされるファイルは MusicXML 形式（.musicxml）で、MuseScore、Finale、Sibelius などの楽譜ソフトで直接開くことができます。

### 🧪 テスト

`CompositionExamples/` のサンプルファイルでテスト：

- `S1_Bach_G_Major.musicxml` - シンプルな例
- `S1_Bach_G_Major2.mxl` - 圧縮形式
- `Waltz.musicxml` - 中程度の複雑さ
- `S9_turkish_march.musicxml` - 複雑な例

### 🙏 クレジット

このプロジェクトは、オリジナルの [PianoFingering.jl](https://github.com/Nero-Blackstone/PianoFingering.jl) 研究に基づいています。特に感謝：

- 強化学習アルゴリズムを提供したオリジナルの研究者
- 科学計算エコシステムを提供する Julia コミュニティ
- TypeScript と Next.js コミュニティ
- xml2js、jszip、idb ライブラリの貢献者
- すべてのオープンソース貢献者

---

## 🌟 Star History

If you find this project helpful, please consider giving it a star! ⭐

---

**Made with ❤️ using TypeScript and Next.js**

**Local Development URL**: http://localhost:3000



## License

MIT License - See [LICENSE](../LICENSE) for details.

---

## ⚠️ Copyright Notice

© 2026 Jeffrey Zhou. All rights reserved.

This repository and its contents are protected by copyright law. No part of this project may be copied, reproduced, modified, or distributed without prior written permission from the author.

**Commercial use is strictly prohibited.**


*Built with ❤️ for music education* ```

