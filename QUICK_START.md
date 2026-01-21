# 快速启动指南

## 🚀 本地调试链接

### 方式1：开发模式（推荐用于开发）

```bash
# 1. 进入frontend目录
cd frontend

# 2. 安装依赖（首次运行需要）
npm install

# 3. 启动开发服务器
npm run dev
```

**访问地址**：
- 🌐 **http://localhost:3000**
- 🌐 **http://127.0.0.1:3000**

**特点**：
- ✅ 热重载（修改代码自动刷新）
- ✅ 详细的错误信息
- ✅ 开发工具支持
- ⚠️ 性能略低于生产模式

---

### 方式2：生产模式（推荐用于测试）

```bash
# 1. 进入frontend目录
cd frontend

# 2. 构建生产版本
npm run build

# 3. 预览生产版本
npx serve out
```

**访问地址**：
- 🌐 **http://localhost:3000** （或serve显示的端口）

**特点**：
- ✅ 完全模拟生产环境
- ✅ 性能最优
- ✅ 验证部署配置
- ❌ 无热重载

---

## 📦 GitHub上传文件分类

### ✅ 必须上传（约6MB）

#### 核心文件
```
frontend/src/              ✅ 所有源代码
frontend/public/           ✅ 静态资源
frontend/package.json      ✅ 依赖配置
frontend/package-lock.json ✅ 依赖锁定
frontend/*.config.*        ✅ 所有配置文件
frontend/vercel.json       ✅ Vercel配置
```

#### 文档文件
```
README.md                  ✅ 项目说明
TESTING_GUIDE.md           ✅ 测试指南
DEPLOYMENT.md              ✅ 部署指南
QUICK_START.md             ✅ 快速启动（本文件）
GITHUB_UPLOAD_CHECKLIST.md ✅ 上传清单
项目改造方案2-Web前端化.md  ✅ 改造方案
原项目程序原理教学文档.md   ✅ 原理文档
```

#### 测试文件
```
CompositionExamples/       ✅ 所有测试乐谱
```

#### 参考代码（建议保留）
```
src.jl-backend/            ⚠️ Julia原代码（作为参考）
```

#### Git配置
```
.gitignore                 ✅ Git忽略配置
.github/workflows/         ✅ CI/CD配置
```

---

### ❌ 不要上传（约360MB）

```
frontend/node_modules/     ❌ npm依赖包（~300MB）
frontend/.next/            ❌ 构建缓存（~50MB）
frontend/out/              ❌ 静态输出（~10MB）
.env*                      ❌ 环境变量
.vscode/                   ❌ IDE配置
.DS_Store                  ❌ 系统文件
*.log                      ❌ 日志文件
```

---

## 🎯 一键上传命令

```bash
# 添加所有必须的文件
git add frontend/src/ frontend/public/ frontend/package*.json frontend/*.config.* frontend/vercel.json
git add README.md TESTING_GUIDE.md DEPLOYMENT.md QUICK_START.md GITHUB_UPLOAD_CHECKLIST.md
git add 项目改造方案2-Web前端化.md 原项目程序原理教学文档.md
git add CompositionExamples/
git add src.jl-backend/
git add .gitignore .github/

# 提交
git commit -m "feat: 完成TypeScript重写，准备部署"

# 推送
git push origin main
```

---

## ✅ 上传前检查清单

### 必须检查
- [ ] 运行 `npm run build` 成功
- [ ] 没有 `node_modules/` 在git中
- [ ] 没有 `.next/` 在git中
- [ ] 没有 `out/` 在git中
- [ ] 没有 `.env` 文件在git中
- [ ] 所有源代码已添加

### 验证命令
```bash
# 查看将要提交的文件
git status

# 查看是否有大文件
find . -type f -size +10M

# 检查.gitignore是否生效
git check-ignore -v frontend/node_modules/
git check-ignore -v frontend/.next/
git check-ignore -v frontend/out/
```

---

## 🔗 相关文档

- 📖 [完整部署指南](DEPLOYMENT.md)
- 📋 [详细上传清单](GITHUB_UPLOAD_CHECKLIST.md)
- 🧪 [测试指南](TESTING_GUIDE.md)
- 📚 [项目说明](README.md)

---

**快速帮助**：
- 本地开发：`cd frontend && npm run dev`
- 访问地址：http://localhost:3000
- 上传GitHub：参考上方"一键上传命令"
