# 0001：Open Design 作为高保真主路线

## 决策

ControlRookie 个人网站后续采用 Open Design 作为高保真重构和正式原型主路线。

ForAI 原站 HTML 只作为视觉标尺和参数参考，不作为正式开发底座。FrontendDesign 仅作为内容密集区、产品区、博客区的备选辅助工具，不作为主路线。

2026-06-10，`prototypes/homepage-open-design/index.html` 已被用户确认为满意版本，并固化为后续页面和正式前端工程的视觉底座基线。

## 原因

ForAI 原站 HTML 是 Framer 编译产物，短期像素相似度最高，但包含大量自动生成类名、远程 Framer 脚本、隐藏断点、SSR 结构和动画状态。它适合做研究证据，不适合长期维护。

Open Design 输出的 HTML/CSS 更可控，适合逐屏做高保真复刻、移动端适配和后续组件化。它虽然第一稿需要人工校准，但越往后迭代越稳定。

FrontendDesign 生成速度快，长页完整度高，但容易自发挥成 SaaS/产品落地页，偏离 ForAI 的极简气质，因此只作为局部方案辅助。

## 工具分工

- Open Design：主原型工具，负责首页、作品墙、核心页面的高保真设计。
- ForAI 原站 HTML：仅保留为临时调研标尺，后续不纳入正式项目产物。
- FrontendDesign：用于快速探索产品区、博客区、联系区的内容组织备选方案。
- Playwright/Chromium：用于桌面浏览器辅助验证和桌面截图；移动端只在正式响应式阶段单独验证，不作为当前高保真首页主验收依据。

## 影响

- 正式保留的高保真首页位于 `prototypes/homepage-open-design/`。
- `design-research-temp/`、FrontendDesign 对比稿、双工具过程报告等测试产物清理出正式项目。
- 后续所有首页视觉迭代以 Open Design 版本为唯一原型源。
