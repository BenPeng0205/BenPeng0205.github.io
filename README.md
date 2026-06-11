# ControlRookie Website

ControlRookie 个人网站项目。

目标是建设一个以 ForAI 为视觉基础的个人品牌与产品工作室网站，表达“跟得上时代的 AI 自动化架构师”的定位，并承接博客、产品、工具销售和联系方式。

## 当前阶段

当前 Open Design 首页高保真底座已确认满意，并已迁移为零依赖静态前端工程。项目已进入可静态发布的生产级基础版本：具备视觉回归、SEO、发布资产、独立内容数据、双语、搜索、二维码素材和综合验收脚本。

重要约束：

- `AGENTS.md` 是当前项目级强制规则入口，后续 AI/自动化维护必须先读取并遵守。
- `项目规划与TODO.md` 是唯一规划源。
- `设计调研与原型/controlrookie-website-design-preview.html` 只是早期方向板，不是高保真验收稿。
- 正式首页高保真原型只保留在 `prototypes/homepage-open-design/`。
- 正式工程入口位于 `src/app/index.html`，样式位于 `src/styles/site.css`，交互位于 `src/lib/site.js`，内容数据位于 `src/content/site-data.js`。
- ForAI 原站 HTML 只作为视觉标尺，不作为开发底座。
- FrontendDesign 只作为内容密集区备选辅助，不作为首页主路线。
- 后续新增页面必须沿用当前底座：黑白灰、`#f1f1f1` 浅灰色块、细边框、轻字重、克制字号、桌面单页段落、右上角黑色搜索和浅灰卡片网格。
- 导航栏以下必须使用稳定但不可见的正文边界：左边界对齐 `CR` logo 左缘，右边界对齐 `EN` 按钮右缘，内容不能超出边界但不要求占满。
- 全站布局必须以页面垂直中心轴为核心参照，页面主体内容视觉重心不得明显左偏或右偏。
- 正文边界只是最大安全范围，不是贴边排版目标；页面内容必须保留舒适内边距、呼吸感和居中视觉秩序。
- 当前首页主体已经确认满意并固定；除非用户明确要求，不得改动首页首屏、照片、主文案、四张领域卡片和对应布局。
- 首页后的个人经历页在导航中必须命名为 `关于我` / `About Me`，并作为第一个导航按钮；页面必须呈现真实时间线，而不是普通卡片堆叠。
- 文章页和产品页顶部标题必须与主体卡片贴合成同一内容组；联系页主文案不得使用灰色卡片背景，Logo 素材必须来自最新母版派生图，不得出现四角露白伪影。
- 网站 Logo 必须使用 `E:\07 自媒体\02 Logo\Control Rookie Logo.svg` 最新母版及其最新派生图，禁止使用 `当前在用老Logo` 目录中的旧 Logo，禁止 AI 自行重绘 Logo 图案。
- 文章系统必须支持大量文章长期增长，禁止单页无限罗列文章卡片；必须建立分类、系列、标签和子导航。
- 单篇文章页必须采用左侧固定目录、右侧标题正文、一键到顶/到底、代码复制按钮、站内互链和评论回复预留区的结构。
- 单篇文章页目录锚点必须唯一且逐项校验，每一个目录链接都必须跳到对应标题；目录链接不用正文强调色，正文超链接、面包屑、上一篇/下一篇必须明显可识别。
- 单篇文章目录采用固定专家阅读栏宽度，长章节标题在目录内部自然换行，不为单篇文章临时手工调整宽度；正式文章内容禁止出现表情、emoji 或娱乐化符号。
- 当前链接和品牌点缀色采用低饱和琉璃绿，只作为功能提示，不恢复大面积绿色装饰。
- 未经用户同意，不安装任何新依赖；如需引入 Astro、Next.js 或其它工具，必须先说明安装路径、用途和预计体积。
- 工程代码必须保留控件级注释，方便后续手动精细调整。
- 每次修改完成后必须自动弹出浏览器界面预览正式页面，不让用户手动打开。

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
- 文章模板：`src/app/article-template.html`
- 文章页目录：`src/app/articles/`
- 视觉样式：`src/styles/site.css`
- 页面交互：`src/lib/site.js`
- 内容数据：`src/content/site-data.js`
- 文章索引：`src/content/articles.json`
- 发布资产：`public/favicon.ico`、`public/site.webmanifest`、`public/robots.txt`、`public/sitemap.xml`
- 视觉基线截图：`tests/visual/baseline/`

## 验证命令

```powershell
& 'E:\ai-relavant\ben-blog-cli\.venv\Scripts\python.exe' 'scripts\verify_production_ready.py'
& 'E:\ai-relavant\ben-blog-cli\.venv\Scripts\python.exe' 'scripts\verify_visual_parity.py'
& 'E:\ai-relavant\ben-blog-cli\.venv\Scripts\python.exe' 'scripts\verify_static_app.py'
```

`verify_production_ready.py` 是综合生产级验收入口，会检查 SEO、发布资产、内容数据、UTF-8、代码契约，并调用视觉和功能验证。`verify_visual_parity.py` 会用桌面视口对比工程版和基线截图，防止视觉漂移；`verify_static_app.py` 会检查照片、二维码、搜索、双语、锚点和内容数据可用性。

## 文章导入工作流

分工原则：

- `ben-wemedia-agent`：生成 Markdown、图片、frontmatter 和 manifest 等结构化文章发布包。
- `controlrookie-website`：负责导入、渲染、排版、SEO、搜索、系列页和 ForAI 底座视觉一致性。
- 文章导入后必须写入统一内容索引，支持分类、系列、标签、相关文章、站内资源引用和搜索。
- 单篇文章页必须提供浅导航：左侧固定目录、同系列/相关文章入口、上一篇/下一篇、站内资源互链和回到列表路径。
- 代码块必须有复制按钮和适合代码阅读的等宽字体；文章末尾必须预留评论和回复区，具体权限与审核策略后续统一设计。

当前样例文章源：

```text
E:\Obsidian\Work\03_资源\通信\MQTT\MqttClient系列教程\第1篇_官方MQTT库要花钱_那我就自己开源一套CODESYS MQTT客户端_以及MQTT到底跑在哪一层.md
```

本地导入和验收：

```powershell
& 'E:\ai-relavant\ben-blog-cli\.venv\Scripts\python.exe' 'scripts\import_article_package.py'
& 'E:\ai-relavant\ben-blog-cli\.venv\Scripts\python.exe' 'scripts\verify_article_pages.py'
& 'E:\ai-relavant\ben-blog-cli\.venv\Scripts\python.exe' 'scripts\capture_article_preview.py'
```

生成结果：

- 文章页：`src/app/articles/mqtt-client-open-source-codesys-layer/index.html`
- 文章索引：`src/content/articles.json`
- 本地预览截图：`tests/visual/article-preview-mqtt-client-01.png`

当前文章系统开发阶段只做本地测试；除非用户明确要求上传，否则禁止自动同步到 GitHub 官网。

## 生产级边界

当前生产级标准指可静态发布的单页官网基础版本。已覆盖首页、资源、文章、产品、联系、双语、搜索、SEO 和发布资产；暂不包含后台 CMS、支付系统、用户系统、真实域名解析、服务器运维、第三方统计和完整站内博客。

## 临时发布

当前临时发布域名：`https://benpeng0205.github.io/`

GitHub Pages 构建入口：

```powershell
& 'E:\ai-relavant\ben-blog-cli\.venv\Scripts\python.exe' 'scripts\build_static_site.py'
```

构建产物位于 `dist/`。仓库推送到 GitHub 后，`.github/workflows/deploy-pages.yml` 会构建并发布 `dist/`。要使用该根域名，GitHub 仓库应为 `BenPeng0205/benpeng0205.github.io`，并在仓库 Pages 设置里启用 GitHub Actions 发布源。

正式域名购买后，需要统一替换 `https://benpeng0205.github.io/`，更新 `public/sitemap.xml`、`public/robots.txt` 和 `src/app/index.html` 中的 canonical / Open Graph / 结构化数据，然后重新运行生产级验收。
