# Minecraft导航网站项目规则

## 项目概述
本项目是一个Minecraft导航网站，主要包含以下核心内容模块：
- 实用网站导航（数据通过JSON接口获取）
- 启动器下载功能（数据通过JSON接口获取，且需支持代理配置以应对GitHub下载源的访问需求）
- 关于网站的介绍页面
- 响应式导航栏（支持桌面端和移动端汉堡菜单）
- 透明背景页脚

## 技术栈
- **前端框架**: Next.js 14.0.0
- **UI组件库**: Ant Design 5.x
- **样式框架**: Tailwind CSS 3.3.0
- **开发语言**: TypeScript 5.0.0
- **HTTP客户端**: Axios 1.6.0

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
├── package.json           # 项目依赖配置
├── next.config.js         # Next.js配置
├── tailwind.config.js     # Tailwind配置
├── tsconfig.json          # TypeScript配置
└── .trae/rules/           # 项目规则文档
    └── project_rules.md   # 本项目规则文件
```

## 核心功能

### 1. 实用网站导航
- 通过JSON接口获取网站数据
- 支持分类展示（官方、模组、社区、百科等）
- 响应式网格布局
- 一键访问外部网站

### 2. 启动器下载
- 通过JSON接口获取启动器数据
- 支持代理下载功能（针对GitHub资源）
- 显示版本信息和平台支持
- 一键下载启动器

### 3. 响应式导航栏
- 桌面端：水平菜单布局
- 移动端：汉堡菜单设计
- 黑色背景，白色文字配色
- 深色主题支持

### 4. 透明背景页脚
- 透明背景设计
- 黑色文字配色
- 响应式布局
- 网站信息展示

### 5. 代理下载功能
- 专门处理GitHub资源下载
- 解决国内访问GitHub慢的问题
- 可配置开关控制

## 开发规范
1. 使用TypeScript进行类型安全开发
2. 组件采用函数式组件和Hooks
3. 样式使用Tailwind CSS原子类
4. 数据通过API接口获取，便于维护
5. 响应式设计，支持移动端访问
6. 组件模块化，便于复用和维护

## 部署说明
1. 安装依赖：`npm install`
2. 开发模式：`npm run dev`
3. 构建项目：`npm run build`
4. 生产环境：`npm start`

## 数据维护
- 网站数据：编辑 `api/websites.json`
- 启动器数据：编辑 `api/launchers.json`
- 数据格式保持JSON标准，便于扩展

## 更新记录
不需要，git提交记录即可