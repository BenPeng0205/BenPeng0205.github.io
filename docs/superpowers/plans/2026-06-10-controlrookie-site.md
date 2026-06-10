# ControlRookie Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个可部署到 GitHub Pages 的双页面个人站点，包含首页与仓库介绍页，采用紫禁城风格并突出 ControlRookie 的工业自动化开源专家定位。

**Architecture:** 采用纯静态 HTML + 共享 CSS 的两页站点结构。首页负责品牌叙事、愿景使命和关于我入口；仓库页负责“精选项目 + 分类入口”的展示结构，不接真实仓库数据，先做高保真展示层。

**Tech Stack:** HTML5、CSS3、少量原生 JavaScript（如有需要）、本地静态文件组织，面向 GitHub Pages。

---

### Task 1: 建立站点骨架

**Files:**
- Create: `index.html`
- Create: `repositories/index.html`
- Create: `assets/css/site.css`
- Create: `assets/img/controlrookie-mark.svg`

- [ ] **Step 1: 建立页面和资源目录**
- [ ] **Step 2: 约定共享 CSS 变量与页面布局骨架**
- [ ] **Step 3: 创建 ControlRookie Logo 资产**

### Task 2: 实现首页

**Files:**
- Modify: `index.html`
- Modify: `assets/css/site.css`

- [ ] **Step 1: 实现导航与 Hero**
- [ ] **Step 2: 实现关于我、使命与方法论区块**
- [ ] **Step 3: 实现精选项目预览与页脚**

### Task 3: 实现仓库介绍页

**Files:**
- Modify: `repositories/index.html`
- Modify: `assets/css/site.css`

- [ ] **Step 1: 实现页头与页面说明**
- [ ] **Step 2: 实现精选项目大卡片**
- [ ] **Step 3: 实现分类入口和未来扩展区**

### Task 4: 响应式与验证

**Files:**
- Modify: `assets/css/site.css`

- [ ] **Step 1: 完成桌面与移动端响应式收口**
- [ ] **Step 2: 用本地文件方式检查页面可打开**
- [ ] **Step 3: 汇总交付结果与后续扩展建议**
