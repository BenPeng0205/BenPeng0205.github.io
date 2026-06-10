# ControlRookie 个人网站项目规划与 TODO

> 单一规划源：本文件是当前项目唯一正式规划、路线图、TODO 和执行记录入口。后续不要再新建同类规划文档，直接更新本文件。

## 项目目标

建设 ControlRookie 个人网站，用 ForAI 的界面、风格、配色、字体、导航方式和作品墙组织方式作为设计基础，表达“跟得上时代的 AI 自动化架构师”的个人定位，并承接文章、产品、工具销售和联系方式。

## 核心定位

- 个人品牌：ControlRookie
- 定位：跟得上时代的 AI 自动化架构师
- 目标读者：工业自动化工程师、PLC/CODESYS/SmartControl 工程师、希望用 AI 提升工程效率的技术人
- 核心价值：控制、算法、架构、思想、前沿技术、AI、源码开源分享和工程工具产品化

## 设计总原则

1. ForAI 是设计基础，必须高保真还原其界面气质、配色、字体、导航、网格、留白、卡片和作品墙组织方式。
2. 当前预览页只是方向板，不作为高保真验收稿。
3. 正式设计必须先做一页 ForAI 高保真还原验收稿，用户确认后才能继续扩展。
4. 动画和复杂滚动不是必须项，优先静态页面加简单 hover、fade、marquee 等低维护动画。
5. 工业自动化语义只用于内容和局部视觉，不得破坏 ForAI 的基础审美。

## 项目目录层级

```text
controlrookie-website/
├── 项目规划与TODO.md
├── README.md
├── docs/
│   ├── requirements/       # 需求、范围、用户画像、内容清单
│   ├── research/           # 调研结论、参考站拆解、证据记录
│   ├── design/             # 设计规范、视觉系统、页面规格
│   ├── decisions/          # 关键决策记录
│   └── operations/         # 工具、部署、发布和验证说明
├── prototypes/
│   └── forai-fidelity-gate/ # ForAI 高保真单页验收原型
├── public/
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── fonts/
├── src/
│   ├── app/
│   ├── components/
│   ├── content/
│   ├── lib/
│   └── styles/
├── tests/
│   └── visual/
├── scripts/
└── 设计调研与原型/         # 本轮早期方向板和调研草稿归档
```

## 阶段规划

### P0：项目基线与工具可用性

状态：已完成

- [x] 建立项目目录层级。
- [x] 建立单一规划源。
- [x] 保留并标注早期方向板不是高保真验收稿。
- [x] 确认 FrontendDesign 前端、后端、健康检查和基础接口可正常访问。
- [x] 确认并修复 FrontendDesign 模型生成链路：从 Codex 配置同步 key/base_url/model，并补丁后端模型映射。
- [x] 确认 Open Design daemon 可正常访问并完成真实 artifact 写入验证。
- [x] 提交本地 Git。

### P1：ForAI 高保真单页验收

状态：待开始

- [ ] 采集 ForAI 关键页面/首屏结构证据。
- [ ] 提炼 ForAI 可维护版视觉规范：颜色、字号、网格、导航、卡片比例、边框、留白。
- [ ] 在 `prototypes/forai-fidelity-gate/` 产出一页 ControlRookie 化高保真 HTML 原型。
- [ ] 只加入低维护动效：hover、fade、轻量 marquee。
- [ ] 做桌面与移动端视觉检查。
- [ ] 用户验收“还原逼真度”。

### P2：首页正式设计

状态：待 P1 验收后开始

- [ ] 首屏：ControlRookie、定位、愿景、核心 CTA。
- [ ] 代表工程资产：CodeSys MQTT、SmartControl CLI、LicOS 技能包、内容发布工具。
- [ ] 文章入口：CSDN、微信公众号、精选专题。
- [ ] 产品入口：开源、试用、付费、定制咨询分层。
- [ ] 联系入口：微信、公众号、CSDN、GitHub、合作咨询。

### P3：博客与产品板块

状态：待开始

- [ ] 博客前期跳转 CSDN 和微信公众号。
- [ ] 站内维护精选文章卡片与专题。
- [ ] 产品卡片定义：名称、用途、适用人群、状态、获取方式、价格/咨询入口。
- [ ] 为后期站内 CMS 或静态内容源预留结构。

### P4：前端工程实现

状态：待开始

- [ ] 确定技术栈。
- [ ] 搭建源码工程。
- [ ] 实现页面组件和内容数据结构。
- [ ] 建立视觉回归检查脚本。
- [ ] 建立构建、预览、部署说明。

## 当前 TODO

- [x] 修复并验证 Open Design。
- [x] 验证 FrontendDesign。
- [x] 将本轮项目结构与规划提交到本地 Git。
- [ ] 下一轮开始前，先产出 ForAI 高保真单页验收原型。

## 风险与约束

- 微信公众号后台链接需要登录态，不能作为公开内容采集源。
- ForAI 是 Framer 站，复杂动效不应完整复刻；优先复刻静态视觉体系。
- 当前 Git 顶层是 `E:\ai-workspace`，提交时必须只暂存 `projects/controlrookie-website` 下的文件。
- 禁止把上级工作区其它改动加入本项目提交。

## 执行记录

- 2026-06-10：建立目录层级、单一规划源，明确 ForAI 高保真单页验收门禁。
- 2026-06-10：修复 Open Design daemon 启动方式，使用 Electron Node 运行 `daemon-cli.mjs`，完成 MCP 项目创建和 HTML artifact 写入验证。
- 2026-06-10：修复 FrontendDesign 反复缺 key/模型名不匹配问题，新增 `scripts/恢复FrontendDesign.ps1`，完成 OpenAI Responses 与 FrontendDesign provider 两级真实生成验证。
