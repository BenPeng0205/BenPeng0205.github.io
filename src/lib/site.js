// 页面显隐动画控件：对应资源、文章、产品、联系各段落的轻量 fade-in。
const revealItems = document.querySelectorAll(".fade-in");

// 导航右上角搜索控件：默认收起为图标，输入时展示匹配结果浮层。
const searchShell = document.getElementById("searchShell");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("siteSearch");
const searchPanel = document.getElementById("searchPanel");

// 导航最右侧语言切换控件：控制中文/英文文案和搜索结果语言。
const langToggle = document.getElementById("langToggle");
let currentLang = "zh";

// 双语文案表：data-i18n 控件的文字都从这里统一维护，便于后期手动精细调整。
const translations = {
  zh: {
    "nav.about": "关于我",
    "nav.resources": "资源",
    "nav.articles": "文章",
    "nav.products": "产品",
    "nav.contact": "联系",
    "search.placeholder": "搜索文章、资源、产品",
    "hero.statement": "跟得上时代的 AI 自动化架构师。",
    "hero.description": "致力于控制、算法、架构、前沿技术和 AI 工具的源码开源分享，帮助自动化工程师大幅提升工程效率。",
    "focus.1.kicker": "领域 01",
    "focus.1.copy": "控制逻辑、状态机、设备通信与工程现场问题。",
    "focus.2.kicker": "领域 02",
    "focus.2.copy": "Agent、自动化编程、知识蒸馏和工程提效。",
    "focus.3.kicker": "领域 03",
    "focus.3.copy": "源码开源、工具封装、脚本化和可复用工作流。",
    "focus.4.kicker": "领域 04",
    "focus.4.copy": "CSDN、公众号、教程、方案和工程复盘。",
    "resources.title": "资源",
    "about.title": "关于我",
    "about.intro.label": "时间线 / 工业现场",
    "about.intro.title": "从学术研究到工业现场。",
    "about.intro.copy": "这里先保留个人路径的骨架，后续会补充具体年份、项目职责、行业场景和能力描述。当前重点是把经历按时间顺序清晰放出来。",
    "about.node.1.name": "达姆施达特工业大学",
    "about.node.1.copy": "控制理论、系统建模和工程方法的学术基础。",
    "about.node.2.name": "Bosch",
    "about.node.2.copy": "工业研发体系、工程规范和跨团队协作经验。",
    "about.node.3.name": "Fraunhofer IWES",
    "about.node.3.copy": "新能源测试、仿真验证和研究型工程实践。",
    "about.node.4.name": "新能源 HIL",
    "about.node.4.copy": "控制器闭环测试、模型接入和自动化验证。",
    "about.node.5.name": "烟草",
    "about.node.5.copy": "离散制造现场、设备联调和工艺控制落地。",
    "about.node.6.name": "冶金传动",
    "about.node.6.copy": "大功率传动、现场调试和高可靠控制系统。",
    "about.node.7.name": "控制器厂家",
    "about.node.7.copy": "控制器产品化、生态工具和工程效率方案。",
    "about.capability.label": "能力描述 / 待补充",
    "about.capability.copy": "控制系统、HIL、行业工艺、传动控制、控制器产品化和 AI 工程效率能力将在这里展开。",
    "articles.title": "文章",
    "articles.nav.all": "全部",
    "articles.nav.series": "MQTT 系列",
    "articles.nav.resources": "相关资源",
    "articles.nav.contact": "交流讨论",
    "articles.series.label": "专题 01",
    "articles.series.title": "CODESYS MQTT 系列",
    "articles.series.copy": "从协议分层、CONNECT / CONNACK、PUBLISH、QoS 到 ST 状态机，按工程路径逐步整理。",
    "articles.series.progress": "已导入 1 篇 / 系列持续补全",
    "products.title": "产品",
    "contact.title": "联系",
    "contact.heading": "工控人太苦了，让我们一起告别水深火热",
    "contact.wechat.label": "微信",
    "contact.official.label": "公众号",
    "contact.email.label": "邮箱",
    "footer.copy": "一名跟得上时代的 AI 自动化架构师",
    "search.empty": "没有匹配结果。可以尝试 PLC、AI、CODESYS、MQTT、资源、产品。"
  },
  en: {
    "nav.about": "About Me",
    "nav.resources": "Resources",
    "nav.articles": "Articles",
    "nav.products": "Products",
    "nav.contact": "Contact",
    "search.placeholder": "Search articles, resources, products",
    "hero.statement": "An AI automation architect keeping pace with the era.",
    "hero.description": "ControlRookie shares source code, control ideas, algorithms, architecture, frontier technology, and AI tools to help automation engineers improve engineering efficiency.",
    "focus.1.kicker": "Domain 01",
    "focus.1.copy": "Control logic, state machines, device communication, and field issues.",
    "focus.2.kicker": "Domain 02",
    "focus.2.copy": "Agents, automated programming, knowledge distillation, and engineering efficiency.",
    "focus.3.kicker": "Domain 03",
    "focus.3.copy": "Open source code, tool packaging, scripts, and reusable workflows.",
    "focus.4.kicker": "Domain 04",
    "focus.4.copy": "CSDN, WeChat articles, tutorials, solutions, and engineering reviews.",
    "resources.title": "Resources",
    "about.title": "About Me",
    "about.intro.label": "Timeline / Industry",
    "about.intro.title": "From academic research to industrial sites.",
    "about.intro.copy": "This page keeps the career path as a structured timeline first. Years, project roles, industry scenes, and capability details can be expanded later.",
    "about.node.1.name": "TU Darmstadt",
    "about.node.1.copy": "Academic foundation in control theory, system modeling, and engineering methods.",
    "about.node.2.name": "Bosch",
    "about.node.2.copy": "Industrial R&D process, engineering standards, and cross-team collaboration.",
    "about.node.3.name": "Fraunhofer IWES",
    "about.node.3.copy": "Renewable energy testing, simulation validation, and research engineering.",
    "about.node.4.name": "New Energy HIL",
    "about.node.4.copy": "Controller closed-loop testing, model integration, and automated validation.",
    "about.node.5.name": "Tobacco",
    "about.node.5.copy": "Discrete manufacturing sites, equipment commissioning, and process control.",
    "about.node.6.name": "Metallurgical Drive",
    "about.node.6.copy": "High-power drives, field commissioning, and reliable control systems.",
    "about.node.7.name": "Controller Manufacturer",
    "about.node.7.copy": "Controller productization, ecosystem tooling, and efficiency solutions.",
    "about.capability.label": "Capabilities / Reserved",
    "about.capability.copy": "Control systems, HIL, industry processes, drive control, controller productization, and AI engineering efficiency will be expanded here.",
    "articles.title": "Articles",
    "articles.nav.all": "All",
    "articles.nav.series": "MQTT Series",
    "articles.nav.resources": "Related Resources",
    "articles.nav.contact": "Discussion",
    "articles.series.label": "Topic 01",
    "articles.series.title": "CODESYS MQTT Series",
    "articles.series.copy": "From protocol layers, CONNECT / CONNACK, PUBLISH, QoS, to ST state machines, organized along an engineering path.",
    "articles.series.progress": "1 imported / series in progress",
    "products.title": "Products",
    "contact.title": "Contact",
    "contact.heading": "Industrial control is hard. Let us get out of the fire together.",
    "contact.wechat.label": "WeChat",
    "contact.official.label": "Official Account",
    "contact.email.label": "Email",
    "footer.copy": "An AI automation architect keeping pace with the times.",
    "search.empty": "No results. Try PLC, AI, CODESYS, MQTT, resources, or product."
  }
};

const siteData = window.CONTROLROOKIE_SITE_DATA;

if (!siteData) {
  throw new Error("缺少 CONTROLROOKIE_SITE_DATA，搜索和内容数据无法初始化。");
}

// 内容数据同步到页面已有 DOM：保持已验收视觉结构不变，只把文字从统一数据源灌入。
function hydrateContentFromData() {
  siteData.resources.forEach((item, index) => {
    const card = document.querySelectorAll(".work-card")[index];
    if (!card) return;
    card.querySelector(".work-index").textContent = item.type[currentLang];
    card.querySelector(".work-title").textContent = item.title[currentLang];
    card.querySelector(".work-meta").textContent = item.copy[currentLang];
  });

  const article = siteData.articles[0];
  const articleCard = document.querySelector("#articles .info-card");
  if (article && articleCard) {
    articleCard.href = article.href;
    articleCard.querySelector("small").textContent = `01 · ${article.type[currentLang]}`;
    articleCard.querySelector("h3").textContent = article.title[currentLang];
    articleCard.querySelector("p").textContent = article.copy[currentLang];
    articleCard.querySelector("footer").textContent = localizedText(article.status, currentLang) || "01 / MQTT Client";
  }

  const product = siteData.products[0];
  const productCard = document.querySelector("#products .info-card");
  if (product && productCard) {
    productCard.querySelector("small").textContent = `01 · ${product.type[currentLang]}`;
    productCard.querySelector("h3").textContent = product.title[currentLang];
    productCard.querySelector("p").textContent = product.copy[currentLang];
  }
}

// 全站搜索索引：覆盖文章、资源、产品和联系方式；后续接入真实站内内容时优先扩展这里。
const searchIndex = [
  ...siteData.articles.map((item) => ({ ...item, href: item.searchHref || item.href })),
  {
    title: { zh: "关于我", en: "About Me" },
    type: { zh: "关于我", en: "About Me" },
    text: {
      zh: "达姆施达特工业大学 Bosch Fraunhofer IWES 新能源 HIL 烟草 冶金传动 控制器厂家 能力描述",
      en: "TU Darmstadt Bosch Fraunhofer IWES new energy HIL tobacco metallurgical drive controller manufacturer capabilities",
    },
    href: "#about",
    keywords: "about me experience timeline Darmstadt Bosch Fraunhofer IWES HIL tobacco metallurgical drive controller",
  },
  {
    title: { zh: "资源库", en: "Resources" },
    type: { zh: "资源", en: "Resource" },
    text: { zh: "源代码 库文件 标准 模板 MQTT 资料 脚本", en: "source code libraries standards templates MQTT scripts" },
    href: "#works",
    keywords: siteData.resources.map((item) => item.keywords).join(" "),
  },
  ...siteData.products,
  ...siteData.contacts.map((item) => ({ ...item, href: item.searchHref || item.href, text: item.copy })),
];

function localizedText(value, lang) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] || "";
}

// 语言切换流程：更新 html lang、所有 data-i18n 文案、placeholder 和搜索浮层。
function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (key === "contact.heading" && lang === "zh") {
      node.innerHTML = '工控人太苦了，<span class="no-break">让我们一起告别水深火热</span>';
      return;
    }
    if (translations[lang][key]) node.textContent = translations[lang][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (translations[lang][key]) node.setAttribute("placeholder", translations[lang][key]);
  });
  hydrateContentFromData();
  langToggle.textContent = lang === "zh" ? "EN" : "中";
  langToggle.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
  if (searchShell.classList.contains("open") || searchPanel.classList.contains("visible") || document.activeElement === searchInput) {
    renderSearch(searchInput.value);
  }
}

// 搜索结果渲染：基于关键词匹配 searchIndex，生成 ForAI 风格的浮层结果卡片。
function renderSearch(query) {
  const keyword = query.trim().toLowerCase();
  const matches = keyword
    ? searchIndex.filter((item) => `${item.title.zh} ${item.title.en} ${item.type.zh} ${item.type.en} ${localizedText(item.text, "zh")} ${localizedText(item.text, "en")} ${localizedText(item.copy, "zh")} ${localizedText(item.copy, "en")} ${item.keywords || ""}`.toLowerCase().includes(keyword))
    : searchIndex.slice(0, 5);

  searchPanel.innerHTML = matches.length
    ? matches.map((item, index) => `<a class="search-result${index === 0 ? " active" : ""}" href="${item.href}"><strong>${item.title[currentLang]}</strong><span>${item.type[currentLang]} / ${localizedText(item.text || item.copy, currentLang)}</span></a>`).join("")
    : `<div class="search-empty">${translations[currentLang]["search.empty"]}</div>`;
  searchPanel.classList.add("visible");
  searchShell.classList.add("open");
  searchButton.setAttribute("aria-expanded", "true");
}

function closeSearch() {
  searchShell.classList.remove("open");
  searchPanel.classList.remove("visible");
  searchButton.setAttribute("aria-expanded", "false");
}

// 点击搜索图标：展开黑色搜索框并展示默认结果。
searchButton.addEventListener("click", () => {
  searchShell.classList.add("open");
  searchInput.focus();
  renderSearch(searchInput.value);
});

// 搜索输入：即时过滤所有已登记文章、资源、产品和联系方式。
searchInput.addEventListener("input", () => renderSearch(searchInput.value));
searchInput.addEventListener("focus", () => {
  searchShell.classList.add("open");
  renderSearch(searchInput.value);
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSearch();
    searchButton.focus();
  }
});

// 语言按钮：中文与英文一键切换。
langToggle.addEventListener("click", () => {
  applyLanguage(currentLang === "zh" ? "en" : "zh");
});

// 点击搜索区域外：收起搜索框和结果面板。
document.addEventListener("click", (event) => {
  if (!searchShell.contains(event.target) && !searchPanel.contains(event.target)) {
    closeSearch();
  }
});

// 段落进入视口时触发轻量显隐动画；不支持 IntersectionObserver 时直接显示。
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

searchButton.setAttribute("aria-expanded", "false");
searchButton.setAttribute("aria-controls", "searchPanel");
applyLanguage("zh");
