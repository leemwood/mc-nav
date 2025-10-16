# Minecraft导航网站

一个专业的Minecraft资源导航网站，为玩家提供最全面、最实用的Minecraft资源导航服务。

## 功能特性

### 🎯 核心功能
- **实用网站导航** - 汇集Minecraft相关的官方网站、社区、模组平台等资源
- **启动器下载** - 提供各种Minecraft启动器的下载链接
- **代理下载支持** - 针对GitHub资源提供代理下载功能
- **响应式导航栏** - 支持桌面端和移动端汉堡菜单
- **透明背景页脚** - 现代化的页脚设计
- **响应式设计** - 完美支持桌面端和移动端访问

### 🛠 技术栈
- **前端框架**: Next.js 14.0.0
- **UI组件库**: Ant Design 5.x
- **样式框架**: Tailwind CSS 3.3.0
- **开发语言**: TypeScript 5.0.0
- **HTTP客户端**: Axios 1.6.0

## 快速开始

### 环境要求
- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问 http://localhost:3000 查看网站

### 生产构建
```bash
npm run build
npm start
```

## 项目结构

```
mc-nav/
├── app/                    # Next.js App Router
│   ├── api/               # API路由
│   │   ├── data/          # 数据接口
│   │   │   ├── launchers/ # 启动器API
│   │   │   └── websites/  # 网站API
│   │   └── proxy/         # 代理下载API
│   ├── layout.tsx         # 根布局组件
│   ├── page.tsx           # 首页组件
│   └── globals.css        # 全局样式
├── components/             # 可复用组件
│   ├── Header.tsx         # 导航头部（响应式设计）
│   ├── WebsitesSection.tsx # 网站导航组件
│   ├── LaunchersSection.tsx # 启动器下载组件
│   ├── AboutSection.tsx   # 关于页面组件
│   └── Footer.tsx         # 透明背景页脚
├── api/                    # 数据文件目录
│   ├── launchers.json     # 启动器数据
│   └── websites.json      # 网站数据
└── 配置文件
    ├── package.json       # 项目依赖配置
    ├── next.config.js     # Next.js配置
    ├── tailwind.config.js # Tailwind配置
    └── tsconfig.json      # TypeScript配置
```

## 数据管理

### 网站数据
编辑 `api/websites.json` 文件来管理网站导航数据：

```json
{
  "id": 1,
  "name": "网站名称",
  "url": "https://example.com",
  "description": "网站描述",
  "category": "分类"
}
```

### 启动器数据
编辑 `api/launchers.json` 文件来管理启动器数据：

```json
{
  "id": 1,
  "name": "启动器名称",
  "description": "启动器描述",
  "downloadUrl": "https://download.url",
  "version": "版本号",
  "platform": "支持平台"
}
```

## 代理下载功能

网站支持GitHub资源代理下载，解决国内访问GitHub慢的问题：

- 在启动器下载页面勾选"启用GitHub代理下载"
- 系统会自动通过代理服务器下载GitHub资源
- 代理接口位于 `/api/proxy`

## 开发指南

### 添加新组件
1. 在 `components/` 目录下创建新的 `.tsx` 文件
2. 使用TypeScript定义组件props接口
3. 在页面中导入并使用组件

### 添加新API路由
1. 在 `api/` 目录下创建新的 `.ts` 文件
2. 导出相应的HTTP方法（GET、POST等）
3. 在前端组件中调用API

### 样式定制
- 使用Tailwind CSS类名进行样式定制
- 如需自定义样式，可编辑 `app/globals.css`
- 主题配置在 `tailwind.config.js` 中

## 部署说明

### Vercel部署（推荐）
1. 将代码推送到GitHub仓库（主分支：`main`）
2. 在Vercel中导入项目
3. 配置环境变量（如有需要）
4. 自动部署完成

### 其他平台部署
- 支持所有支持Node.js的平台
- 构建命令：`npm run build`
- 启动命令：`npm start`

### GitHub Pages部署
1. 在GitHub仓库设置中启用GitHub Pages
2. 选择`main`分支作为源分支
3. 选择根目录作为发布目录
4. 访问 `https://leemwood.github.io/mc-nav` 查看部署结果

## 贡献指南

欢迎提交Issue和Pull Request来改进项目！

### 开发流程
1. Fork本项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 许可证

本项目采用MIT许可证。详见LICENSE文件。

## 联系方式

- 项目地址：https://github.com/leemwood/mc-nav
- 问题反馈：在GitHub仓库中创建Issue

---

**注意**: 本项目仅供学习和参考使用，请遵守相关网站的使用条款和版权规定。