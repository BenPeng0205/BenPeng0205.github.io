# 双工具 ForAI 重构对比评估

## 评估目标

对 `https://forai.design/?ref=killerportfolio` 首页进行高保真重构检验，分别评估 Open Design 与 FrontendDesign 在重构精度、完整度、耗时、维护性和后续可控性上的表现。

## 参考证据

- ForAI 桌面端首屏：`design-research-temp/forai-evidence/forai-home-desktop-wait.png`
- ForAI 移动端首屏：`design-research-temp/forai-evidence/forai-home-mobile-wait.png`
- ForAI 页面源码快照：`design-research-temp/forai-evidence/forai-home.html`

## 原型产物

- Open Design 版本：`prototypes/forai-fidelity-gate/open-design/index.html`
- Open Design 桌面截图：`prototypes/forai-fidelity-gate/open-design/screenshot-desktop-final.png`
- Open Design 移动截图：`prototypes/forai-fidelity-gate/open-design/screenshot-mobile.png`
- FrontendDesign 版本：`prototypes/forai-fidelity-gate/frontend-design/index.html`
- FrontendDesign 桌面截图：`prototypes/forai-fidelity-gate/frontend-design/screenshot-desktop-final.png`
- FrontendDesign 移动截图：`prototypes/forai-fidelity-gate/frontend-design/screenshot-mobile.png`

## 工具耗时

| 工具 | 生成耗时 | 说明 |
| --- | ---: | --- |
| FrontendDesign | 118.97 秒 | 生成速度快，直接得到完整长页；后续手动修复首屏可见态和移动端溢出。 |
| Open Design | 约 4.6 分钟 | 从 run 创建到 artifact 更新时间估算约 278 秒；产物风格更克制，但主视觉动画初态需要手动修正为静态可见。 |

## 重构精度

| 维度 | Open Design | FrontendDesign |
| --- | --- | --- |
| 首屏结构 | 更接近 ForAI：顶部固定导航、居中大标题、副标题、下方液态球体和大留白。 | 基础结构接近，但加入了 eyebrow 和工业信号面板，偏离 ForAI 极简首屏。 |
| 字体气质 | 更接近 ForAI 的轻字重、宽松留白和白底灰文案。 | 标题更粗，品牌字重更重，整体更像 SaaS/产品页。 |
| 配色 | 黑白灰克制，接近 ForAI。 | 黑白灰也稳定，但局部玻璃面板增强了产品说明感。 |
| 主视觉 | 经修正后形成黑白液态球体，方向接近 ForAI。 | 球体可见度强，但叠加了工业流程卡，重构精度被削弱。 |
| 导航方式 | 接近 ForAI 桌面导航；移动端做了简化以避免裁切。 | 桌面导航接近；移动端也简化后可用。 |

精度判断：如果目标是“严格 ForAI 高保真”，Open Design 更适合作为后续主路线。

## 完整度

| 工具 | 完整度判断 |
| --- | --- |
| Open Design | 已覆盖 works、testimonials、mission、services、pricing、archive、contact 等核心段落，表达更克制。 |
| FrontendDesign | 也覆盖核心段落，内容密度和业务化说明更充分，适合快速生成完整可讲解页面。 |

完整度判断：FrontendDesign 的长页完成度更强；Open Design 更像高保真视觉验收稿。

## 维护性

| 工具 | 维护性判断 |
| --- | --- |
| Open Design | CSS 结构相对克制，视觉变量集中，适合后续提炼为正式设计系统。需要注意避免复杂 reveal 动画导致首屏截图或加载态不可见。 |
| FrontendDesign | 页面组件更多，业务表达更丰满，但自发挥较多，后续要做 ForAI 精准还原时需要删除或压制额外装饰。 |

## 结论

1. 后续如果以“高保真还原 ForAI”为第一目标，建议使用 Open Design 作为主设计工具。
2. 如果目标是“快速生成完整可讲解的长页面”，FrontendDesign 更快，覆盖内容更多。
3. 当前 ControlRookie 官网第一阶段应先走 Open Design 路线，把首页首屏和作品墙精度打到用户可验收，再用 FrontendDesign 辅助生成产品、博客、联系等内容密集区的备选方案。
4. 两个工具都能用，但不能直接信任原始输出；必须保留桌面端和移动端截图门禁，尤其检查主视觉是否可见、移动端是否裁切、是否擅自加入偏离 ForAI 的业务装饰。
