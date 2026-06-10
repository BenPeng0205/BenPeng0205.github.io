// 全站内容数据源：资源、文章、产品和联系方式统一从这里维护。
// 后续新增卡片时，先更新本文件，再让页面渲染和搜索索引复用同一份数据。
window.CONTROLROOKIE_SITE_DATA = {
  resources: [
    {
      id: "source-code",
      type: { zh: "01 · 源代码", en: "01 · Source" },
      title: { zh: "CODESYS 示例工程", en: "CODESYS Examples" },
      copy: {
        zh: "控制逻辑、通信、状态机和工程模板源码。",
        en: "Control logic, communication, state machines, and project templates.",
      },
      keywords: "PLC CODESYS source code example project control logic state machine",
      href: "#works",
    },
    {
      id: "plc-library",
      type: { zh: "02 · 库文件", en: "02 · Library" },
      title: { zh: "PLC Library", en: "PLC Library" },
      copy: {
        zh: "可复用功能块、通信封装和工程基础库。",
        en: "Reusable function blocks, communication wrappers, and base libraries.",
      },
      keywords: "PLC library function block communication wrapper",
      href: "#works",
    },
    {
      id: "engineering-standards",
      type: { zh: "03 · 标准", en: "03 · Standard" },
      title: { zh: "工程标准", en: "Engineering Standards" },
      copy: {
        zh: "命名、状态机、交付、测试和文档规范。",
        en: "Naming, state machines, delivery, testing, and documentation rules.",
      },
      keywords: "standard naming state machine test documentation",
      href: "#works",
    },
    {
      id: "project-scaffold",
      type: { zh: "04 · 模板", en: "04 · Template" },
      title: { zh: "项目脚手架", en: "Project Scaffold" },
      copy: {
        zh: "工程初始化、目录结构、清单和验证流程。",
        en: "Initialization, folder structure, checklists, and validation workflows.",
      },
      keywords: "template scaffold checklist validation workflow",
      href: "#works",
    },
    {
      id: "mqtt-resources",
      type: { zh: "05 · 协议", en: "05 · Protocol" },
      title: { zh: "MQTT 资料", en: "MQTT Resources" },
      copy: {
        zh: "服务器、客户端、主题设计和排障资料。",
        en: "Server, client, topic design, and troubleshooting references.",
      },
      keywords: "MQTT broker server client topic troubleshooting",
      href: "#works",
    },
    {
      id: "automation-scripts",
      type: { zh: "06 · 脚本", en: "06 · Script" },
      title: { zh: "自动化脚本", en: "Automation Scripts" },
      copy: {
        zh: "面向工程效率的批处理、检查和生成工具。",
        en: "Batch, checking, and generation tools for engineering efficiency.",
      },
      keywords: "automation scripts batch check generator engineering efficiency",
      href: "#works",
    },
    {
      id: "llm-workflows",
      type: { zh: "07 · AI", en: "07 · AI" },
      title: { zh: "LLM 工作流", en: "LLM Workflows" },
      copy: {
        zh: "提示词、技能、Agent 和自动化协作规则。",
        en: "Prompts, skills, agents, and automation collaboration rules.",
      },
      keywords: "LLM prompt skill agent workflow AI automation",
      href: "#works",
    },
    {
      id: "engineering-library",
      type: { zh: "08 · 资料", en: "08 · Reference" },
      title: { zh: "工程资料库", en: "Engineering Library" },
      copy: {
        zh: "手册、笔记、复盘和关键技术路线图。",
        en: "Manuals, notes, reviews, and technical roadmaps.",
      },
      keywords: "manual note review roadmap engineering reference",
      href: "#works",
    },
  ],
  articles: [
    {
      id: "codesys-mqtt-series",
      type: { zh: "文章", en: "Article" },
      title: { zh: "CODESYS MQTT 系列", en: "CODESYS MQTT Series" },
      copy: {
        zh: "已发布服务器、客户端、Broker、主题通信和排障教程，先跳转 CSDN 分类页。",
        en: "Published tutorials cover server, client, broker, topic communication, and troubleshooting. Link to the CSDN category first.",
      },
      href: "https://blog.csdn.net/weixin_44442562/category_13163069.html",
      searchHref: "#articles",
      keywords: "CODESYS MQTT broker server client topic CSDN tutorial",
    },
  ],
  products: [
    {
      id: "codesys-llm-synchronizer",
      type: { zh: "产品", en: "Product" },
      title: { zh: "codesys-llm-synchronizer", en: "codesys-llm-synchronizer" },
      copy: {
        zh: "面向 CODESYS / SmartControl 工程的 LLM 同步与协作工具，用于工程镜像、代码上下文、规则和自动化工作流衔接。",
        en: "An LLM synchronization and collaboration tool for CODESYS / SmartControl projects, connecting project mirrors, code context, rules, and automation workflows.",
      },
      href: "#products",
      keywords: "CODESYS SmartControl LLM synchronizer project mirror workflow",
    },
  ],
  contacts: [
    {
      id: "wechat-peaceandbless",
      type: { zh: "联系", en: "Contact" },
      title: { zh: "微信 PeaceAndBless", en: "WeChat PeaceAndBless" },
      copy: { zh: "个人微信二维码", en: "Personal WeChat QR code" },
      href: "#contact",
      keywords: "WeChat PeaceAndBless 微信",
    },
    {
      id: "email",
      type: { zh: "联系", en: "Contact" },
      title: { zh: "邮箱 ben_peng0205@hotmail.com", en: "Email ben_peng0205@hotmail.com" },
      copy: { zh: "合作咨询、工具试用和工程效率交流", en: "Collaboration, tool trials, and engineering efficiency discussions" },
      href: "#contact",
      keywords: "email mail contact cooperation",
    },
    {
      id: "official-account",
      type: { zh: "联系", en: "Contact" },
      title: { zh: "微信公众号 ControlRookie", en: "Official Account ControlRookie" },
      copy: { zh: "微信公众号二维码", en: "Official account QR code" },
      href: "#contact",
      keywords: "WeChat official account ControlRookie 公众号",
    },
    {
      id: "csdn-blog",
      type: { zh: "文章", en: "Article" },
      title: { zh: "CSDN 技术博客", en: "CSDN Blog" },
      copy: { zh: "ControlRookie 技术博客和工程复盘", en: "ControlRookie technical blog and engineering reviews" },
      href: "https://blog.csdn.net/weixin_44442562?type=blog",
      searchHref: "#contact",
      keywords: "CSDN blog article engineering review",
    },
  ],
};
