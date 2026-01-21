# 部署指南

## 📍 本地调试链接

### 开发服务器
```bash
cd frontend
npm install
npm run dev
```

**本地访问地址**：
- 🌐 **http://localhost:3000**
- 🌐 **http://127.0.0.1:3000**

### 生产构建预览
```bash
cd frontend
npm run build
npx serve out
```

**预览地址**：
- 🌐 **http://localhost:3000** (或serve指定的端口)

---

## 🚀 Vercel部署配置验证

### 1. 配置文件检查

#### ✅ `frontend/vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "framework": "nextjs",
  "regions": ["hnd1"],
  "headers": [...]
}
```

#### ✅ `frontend/next.config.mjs`
```javascript
const nextConfig = {
  output: 'export',  // 静态导出
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.globalObject = 'self';  // Web Worker支持
    }
    return config;
  },
};
```

#### ✅ `frontend/package.json`
- ✅ 包含所有必需依赖
- ✅ 构建脚本正确配置

### 2. 部署步骤（不实际执行）

#### 方式A：通过Vercel Dashboard（推荐）

1. **登录Vercel**
   - 访问 https://vercel.com
   - 使用GitHub账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择你的GitHub仓库
   - Vercel会自动检测Next.js项目

3. **配置项目**
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `out`
   - **Install Command**: `npm install`

4. **环境变量**（可选）
   - 本项目不需要环境变量
   - 所有计算都在浏览器端完成

5. **部署**
   - 点击 "Deploy"
   - 等待构建完成（约2-3分钟）
   - 获得部署URL：`https://your-project.vercel.app`

#### 方式B：通过Vercel CLI

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 进入frontend目录
cd frontend

# 部署（预览）
vercel

# 部署（生产）
vercel --prod
```

### 3. 部署验证清单

- ✅ 构建成功（无错误）
- ✅ 静态文件生成在`out/`目录
- ✅ Web Workers正常工作
- ✅ IndexedDB可用
- ✅ 文件上传功能正常
- ✅ 指法生成功能正常
- ✅ 下载功能正常

---

## 📦 GitHub文件上传指南

### ✅ 必须上传的文件

#### 1. 源代码文件
```
frontend/src/              # 所有源代码
├── app/                   # Next.js页面
├── components/            # React组件
├── lib/                   # 核心逻辑
│   ├── algorithm/         # 算法实现
│   ├── music/             # 音乐处理
│   └── cache/             # 缓存管理
└── workers/               # Web Workers
```

#### 2. 配置文件
```
frontend/
├── package.json           # 依赖配置
├── package-lock.json      # 依赖锁定
├── next.config.mjs        # Next.js配置
├── vercel.json            # Vercel配置
├── tsconfig.json          # TypeScript配置
├── tailwind.config.ts     # Tailwind配置
├── postcss.config.js      # PostCSS配置
└── .eslintrc.json         # ESLint配置
```

#### 3. 静态资源
```
frontend/public/           # 公共资源
└── favicon.ico            # 网站图标
```

#### 4. 文档文件
```
README.md                  # 项目说明
TESTING_GUIDE.md           # 测试指南
DEPLOYMENT.md              # 部署指南（本文件）
项目改造方案2-Web前端化.md  # 改造方案
原项目程序原理教学文档.md   # 原理文档
```

#### 5. 测试文件
```
CompositionExamples/       # 测试乐谱
├── *.musicxml
└── *.mxl
```

#### 6. 参考代码
```
src.jl-backend/            # Julia原代码（作为参考）
├── const.jl
├── mdp.jl
├── q_learning.jl
├── dyna.jl
└── process.jl
```

#### 7. Git配置
```
.gitignore                 # Git忽略配置
.github/                   # GitHub Actions配置
└── workflows/
    └── deploy.yml
```

---

### ❌ 不应上传的文件

#### 1. 构建产物
```
frontend/.next/            # Next.js构建缓存
frontend/out/              # 静态导出输出
frontend/dist/             # 其他构建输出
```

#### 2. 依赖包
```
frontend/node_modules/     # npm依赖包
node_modules/              # 根目录依赖包
```

#### 3. 环境配置
```
frontend/.env.local        # 本地环境变量
frontend/.env.*.local      # 其他本地环境变量
.env                       # 环境变量
```

#### 4. IDE配置
```
.vscode/                   # VS Code配置
.idea/                     # IntelliJ IDEA配置
*.swp                      # Vim临时文件
*.swo                      # Vim临时文件
```

#### 5. 系统文件
```
.DS_Store                  # macOS系统文件
Thumbs.db                  # Windows缩略图
desktop.ini                # Windows桌面配置
```

#### 6. 日志文件
```
*.log                      # 所有日志文件
npm-debug.log*             # npm调试日志
yarn-debug.log*            # yarn调试日志
yarn-error.log*            # yarn错误日志
```

#### 7. 临时文件
```
*.tmp                      # 临时文件
*.temp                     # 临时文件
.cache/                    # 缓存目录
```

---

## 📋 .gitignore 配置

当前`.gitignore`配置：

```gitignore
# Frontend build
frontend/.next/
frontend/out/
frontend/node_modules/
frontend/.env.local

# IDE
.vscode/
.idea/

# System
.DS_Store
Thumbs.db

# Logs
*.log
```

### 建议补充：

```gitignore
# 依赖包
node_modules/
**/node_modules/

# 构建产物
frontend/.next/
frontend/out/
frontend/dist/
frontend/build/

# 环境变量
.env
.env.local
.env.*.local
frontend/.env
frontend/.env.local
frontend/.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# 系统文件
.DS_Store
Thumbs.db
desktop.ini

# 日志
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# 测试覆盖率
coverage/
.nyc_output/

# 临时文件
*.tmp
*.temp
.cache/

# 调试
.vscode/launch.json
```

---

## 🔍 部署前检查清单

### 本地验证
- [ ] `npm install` 成功
- [ ] `npm run lint` 无错误
- [ ] `npm run build` 成功
- [ ] `out/` 目录生成
- [ ] 本地预览正常工作

### 文件检查
- [ ] 所有源代码已提交
- [ ] 配置文件已提交
- [ ] `.gitignore` 配置正确
- [ ] 没有敏感信息（密钥、密码等）
- [ ] 没有大文件（>100MB）

### 功能验证
- [ ] 文件上传功能
- [ ] 指法生成功能
- [ ] 进度显示功能
- [ ] 结果下载功能
- [ ] 多语言切换功能
- [ ] 缓存功能

---

## 📊 文件大小统计

### 必须上传的文件大小估算

```
源代码:           ~500KB
配置文件:         ~50KB
文档:             ~200KB
测试文件:         ~5MB
参考代码:         ~100KB
----------------------------
总计:             ~6MB
```

### 不上传的文件大小（节省空间）

```
node_modules:     ~300MB
.next:            ~50MB
out:              ~10MB
----------------------------
节省:             ~360MB
```

---

## 🎯 快速部署命令

### 1. 准备代码
```bash
# 确保在项目根目录
git status

# 添加所有必要文件
git add frontend/src/
git add frontend/public/
git add frontend/*.json
git add frontend/*.mjs
git add frontend/*.ts
git add README.md
git add DEPLOYMENT.md
git add .gitignore
git add .github/

# 提交
git commit -m "feat: 完成TypeScript重写，准备部署"

# 推送到GitHub
git push origin main
```

### 2. 本地测试
```bash
cd frontend
npm install
npm run build
npx serve out
```

### 3. Vercel部署
- 访问 https://vercel.com
- 导入GitHub仓库
- 配置Root Directory为`frontend`
- 点击Deploy

---

## 🔗 相关链接

- **Vercel文档**: https://vercel.com/docs
- **Next.js文档**: https://nextjs.org/docs
- **GitHub Actions文档**: https://docs.github.com/actions

---

## ⚠️ 注意事项

1. **不要提交敏感信息**
   - 不要提交API密钥
   - 不要提交密码
   - 不要提交个人信息

2. **检查文件大小**
   - GitHub单文件限制：100MB
   - 仓库总大小建议：<1GB

3. **保持.gitignore更新**
   - 定期检查是否有新的临时文件
   - 确保构建产物不被提交

4. **测试后再部署**
   - 本地构建成功后再推送
   - 避免在生产环境调试

---

**最后更新**: 2026年1月
**维护者**: 项目开发团队
