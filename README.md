# ControlRookie Website

ControlRookie 个人网站项目。

目标是建设一个以 ForAI 为视觉基础的个人品牌与产品工作室网站，表达“跟得上时代的 AI 自动化架构师”的定位，并承接博客、产品、工具销售和联系方式。

## 当前阶段

当前 Open Design 首页高保真底座已确认满意，并已迁移为零依赖静态前端工程。原型继续作为视觉基线，工程版作为后续开发入口。

重要约束：

- `项目规划与TODO.md` 是唯一规划源。
- `设计调研与原型/controlrookie-website-design-preview.html` 只是早期方向板，不是高保真验收稿。
- 正式首页高保真原型只保留在 `prototypes/homepage-open-design/`。
- 正式工程入口位于 `src/app/index.html`，样式位于 `src/styles/site.css`，交互位于 `src/lib/site.js`。
- ForAI 原站 HTML 只作为视觉标尺，不作为开发底座。
- FrontendDesign 只作为内容密集区备选辅助，不作为首页主路线。
- 后续新增页面必须沿用当前底座：黑白灰、`#f1f1f1` 浅灰色块、细边框、轻字重、克制字号、桌面单页段落、右上角黑色搜索和浅灰卡片网格。
- 未经用户同意，不安装任何新依赖；如需引入 Astro、Next.js 或其它工具，必须先说明安装路径、用途和预计体积。
- 工程代码必须保留控件级注释，方便后续手动精细调整。

## 目录

```text
docs/          调研、需求、设计规范、决策和运维说明
prototypes/    高保真原型
public/        静态资源
src/           正式前端源码
tests/         测试与视觉验证
scripts/       自动化脚本
设计调研与原型/ 早期调研与方向板归档
```

## 当前正式原型

- 首页 HTML：`prototypes/homepage-open-design/index.html`
- 桌面辅助截图：`prototypes/homepage-open-design/screenshot-desktop.png`
- 当前高保真验收以桌面浏览器实际打开为准，移动端适配后续单独进入响应式阶段。

## 当前正式工程

- 工程入口：`src/app/index.html`
- 视觉样式：`src/styles/site.css`
- 页面交互：`src/lib/site.js`
- 视觉基线截图：`tests/visual/baseline/`

## 验证命令

```powershell
& 'E:\ai-relavant\ben-blog-cli\.venv\Scripts\python.exe' 'scripts\verify_visual_parity.py'
& 'E:\ai-relavant\ben-blog-cli\.venv\Scripts\python.exe' 'scripts\verify_static_app.py'
```

`verify_visual_parity.py` 会用桌面视口对比工程版和基线截图，防止视觉漂移；`verify_static_app.py` 会检查照片、二维码、搜索、双语和锚点可用性。
