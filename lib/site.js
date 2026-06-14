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
    "nav.article.menu.client": "MQTT Client 第1篇",
    "nav.article.menu.server": "MQTT Server 资料",
    "search.placeholder": "搜索文章、资源、产品",
    "hero.statement": "跟得上时代的 AI 自动化架构师。",
    "hero.description": "致力于控制、算法、架构、前沿技术和 AI 工具的源码开源分享，帮助自动化工程师大幅提升工程效率。",
    "focus.1.title": "思想和经验",
    "focus.1.copy": "把现场踩过的坑、架构取舍和调试方法，讲成工程师能直接复用的判断框架。",
    "focus.2.title": "源码和库",
    "focus.2.copy": "沉淀可运行、可验证、可迁移的 CODESYS / 工控源码、功能块和协议库。",
    "focus.3.title": "AI 工具链",
    "focus.3.copy": "用 Agent、脚本和自动化工具改造研发流程，让重复劳动交给机器。",
    "focus.4.title": "企业标准化",
    "focus.4.copy": "把代码规范、测试、文档和交付流程，整理成团队能长期执行的工程标准。",
    "resources.title": "资源",
    "about.title": "关于我",
    "about.intro.title": "从现场成长起来的菜鸟",
    "about.intro.copy": "没有谁一毕业就站在云端讲架构。我真实的故事是：先被德国工程规范拧过螺丝，再被工业现场按在地上摩擦，最后决定把这些坑写成工程师看得懂、用得上的源码、教程、工具和产品。",
    "about.city.kunming": "昆明",
    "about.city.darmstadt": "达姆施塔特",
    "about.city.shanghai": "上海",
    "about.node.1.name": "达姆施塔特工业大学",
    "about.node.1.copy": "控制理论、系统建模和工程方法打底；后来发现，理论真正值钱，是能扛住现场脾气。",
    "about.node.2.name": "Bosch Rexroth",
    "about.node.2.copy": "接触德国工业研发体系、工程规范和跨团队协作：好代码只是开始，好工程要能长期维护。",
    "about.node.3.name": "Fraunhofer IWES",
    "about.node.3.copy": "理解新能源测试、仿真验证和模型可信度，把“算得对”转成“测得稳”。",
    "about.node.4.name": "新能源：风电、汽车",
    "about.node.4.copy": "做风电 HIL 和电气仿真建模，围绕控制器、实时模型和闭环测试打磨验证链路。",
    "about.node.5.name": "离散工业：烟草制丝、成型、卷包",
    "about.node.5.copy": "从方案、选型到 PLC/HMI/SCADA 和现场调试，正式被离散制造现场教育。",
    "about.node.6.name": "流程工业：冶金、起重、传动",
    "about.node.6.copy": "负责项目、研发和团队管理，啃过电子防摇、全厂集控系统和大功率传动可靠性。",
    "about.node.7.name": "工业控制器厂家",
    "about.node.7.copy": "聚焦 PLC/PAC、功能库、标准化、通信协议栈和 AI 工程效率，把踩坑经验沉淀成源码和教程。",
    "about.capability.skill.copy": "PLC、HMI、运动控制、SCADA、C#、HIL、通信协议栈都摸过。优点是能把锅从现场背回代码里，缺点是看到临时方案会忍不住想重构。",
    "about.capability.advantage.copy": "能写程序，也扛得住调试现场的风扇声；能做方案，也能把复杂东西讲到别人愿意点头，而不是只想点关闭。",
    "about.capability.self.copy": "自称菜鸟不是谦虚，是风险提示：我踩过的坑比较多。好处是我写出来的东西，通常会先替读者把坑边的警示牌插好。",
    "articles.title": "文章",
    "articles.index.label": "知识库索引",
    "articles.index.domain.communication": "工业通信",
    "articles.index.topic.mqtt": "MQTT",
    "articles.index.article.first": "第1篇：开源客户端与协议分层",
    "articles.index.article.server": "CSDN MQTT 资料索引",
    "articles.series.label": "文章库",
    "articles.series.title": "文章中心",
    "articles.series.copy": "系列专题 1 个 / 文章 32 篇",
    "articles.series.progress": "系列专题 1 个 / 文章 32 篇",
    "articles.topic.label": "系列专题",
    "articles.topic.title": "CodeSys MQTT 系列",
    "articles.topic.progress": "Client 16 篇 / Broker 16 篇",
    "articles.list.server.title": "MQTT Broker 资料",
    "articles.list.server.copy": "服务器、Broker、主题通信和排障教程暂先连接到 CSDN MQTT 分类页。",
    "articles.list.server.meta": "外部分发 / CSDN",
    "resources.index.label": "资源索引",
    "resources.index.domain.engineering": "工程资源",
    "resources.series.label": "资源库",
    "resources.series.title": "工程资源中心",
    "products.title": "产品",
    "products.index.label": "产品索引",
    "products.index.domain.tools": "工程效率工具",
    "products.series.label": "产品中心",
    "products.series.title": "工程效率工具",
    "product.1.version": "V1.0",
    "product.1.mode": "本地优先",
    "product.1.scope": "工程协作",
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
    "nav.article.menu.client": "MQTT Client Part 1",
    "nav.article.menu.server": "MQTT Server Notes",
    "search.placeholder": "Search articles, resources, products",
    "hero.statement": "An AI automation architect keeping pace with the era.",
    "hero.description": "ControlRookie shares source code, control ideas, algorithms, architecture, frontier technology, and AI tools to help automation engineers improve engineering efficiency.",
    "focus.1.title": "Thinking and Experience",
    "focus.1.copy": "Hard lessons, architecture tradeoffs, and debugging methods turned into reusable engineering judgment.",
    "focus.2.title": "Source Code and Libraries",
    "focus.2.copy": "Runnable, verifiable, and portable CODESYS / industrial control source code, function blocks, and protocol libraries.",
    "focus.3.title": "AI Toolchain",
    "focus.3.copy": "Agents, scripts, and automation workflows that move repetitive engineering work to machines.",
    "focus.4.title": "Enterprise Standardization",
    "focus.4.copy": "Code rules, tests, documents, and delivery workflows shaped into standards teams can actually sustain.",
    "resources.title": "Resources",
    "about.title": "About Me",
    "about.intro.title": "A rookie shaped by real industrial sites.",
    "about.intro.copy": "Nobody graduates and immediately starts talking architecture from the clouds. My real story is simpler: German engineering discipline tightened the bolts first, industrial sites did the humbling later, and now I turn those bruises into source code, tutorials, tools, and products engineers can actually use.",
    "about.city.kunming": "Kunming",
    "about.city.darmstadt": "Darmstadt",
    "about.city.shanghai": "Shanghai",
    "about.node.1.name": "TU Darmstadt",
    "about.node.1.copy": "Control theory, system modeling, and engineering methods built the base. Theory matters when it survives the field.",
    "about.node.2.name": "Bosch Rexroth",
    "about.node.2.copy": "Industrial R&D process, standards, and collaboration taught me that good code is only the beginning.",
    "about.node.3.name": "Fraunhofer IWES",
    "about.node.3.copy": "Renewable energy testing and simulation validation connected models, measurement, and trustworthiness.",
    "about.node.4.name": "New Energy: Wind Power and Automotive",
    "about.node.4.copy": "Wind-power HIL and electrical simulation modeling around controllers, real-time models, and closed-loop validation.",
    "about.node.5.name": "Discrete Industry: Tobacco Process, Filter, Packaging",
    "about.node.5.copy": "Solution design, selection, PLC/HMI/SCADA, and commissioning. This was where sites started teaching hard lessons.",
    "about.node.6.name": "Process Industry: Metallurgy, Crane, Drive",
    "about.node.6.copy": "Project, R&D, and team work across anti-sway, plant-wide control systems, high-power drives, and reliability.",
    "about.node.7.name": "Industrial Controller Manufacturer",
    "about.node.7.copy": "PLC/PAC, function libraries, standards, communication stacks, AI efficiency tools, source code, and tutorials.",
    "about.capability.skill.copy": "PLC, HMI, motion control, SCADA, C#, HIL, and protocol stacks. I can drag a field problem back into code, which is useful and occasionally bad for my sleep.",
    "about.capability.advantage.copy": "I can write code, survive commissioning noise, design systems, and explain hard things without making people search for the close button.",
    "about.capability.self.copy": "Calling myself a rookie is not modesty; it is a warning label. I have stepped into enough holes to know where the next signpost should go.",
    "articles.title": "Articles",
    "articles.index.label": "Knowledge Index",
    "articles.index.domain.communication": "Industrial Communication",
    "articles.index.topic.mqtt": "MQTT",
    "articles.index.article.first": "Part 1: Open Client and Protocol Layers",
    "articles.index.article.server": "CSDN MQTT Notes Index",
    "articles.series.label": "Article Library",
    "articles.series.title": "Article Center",
    "articles.series.copy": "1 series / 32 articles",
    "articles.series.progress": "1 series / 32 articles",
    "articles.topic.label": "Series",
    "articles.topic.title": "CodeSys MQTT Series",
    "articles.topic.progress": "Client 16 articles / Broker 16 articles",
    "articles.list.server.title": "MQTT Broker References",
    "articles.list.server.copy": "Server, broker, topic communication, and troubleshooting tutorials currently link to the CSDN MQTT category.",
    "articles.list.server.meta": "External / CSDN",
    "resources.index.label": "Resource Index",
    "resources.index.domain.engineering": "Engineering Resources",
    "resources.series.label": "Resource Library",
    "resources.series.title": "Engineering Resource Center",
    "products.title": "Products",
    "products.index.label": "Product Index",
    "products.index.domain.tools": "Engineering Efficiency Tools",
    "products.series.label": "Product Center",
    "products.series.title": "Engineering Efficiency Tools",
    "product.1.version": "V1.0",
    "product.1.mode": "Local-first",
    "product.1.scope": "Engineering Workflow",
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

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

function externalAttrs(href) {
  return /^https?:\/\//.test(href || "") ? ' target="_blank" rel="noreferrer"' : "";
}

function articlesForFolder(folderZh) {
  return siteData.articles.filter((item) => localizedText(item.folder, "zh") === folderZh);
}

function articleSequenceLabel(item) {
  const progress = localizedText(item.progress, "zh");
  const match = progress.match(/第(\d+)篇/);
  const index = match ? Number(match[1]) : Number(item.order || 0);
  if (currentLang === "zh") {
    return `第${String(index).padStart(2, "0")}篇`;
  }
  return `Part ${String(index).padStart(2, "0")}`;
}

function articleReadingTime(item) {
  if (item.readingTime && item.readingTime[currentLang]) {
    return item.readingTime[currentLang];
  }
  const text = `${item.title[currentLang] || ""}${item.copy[currentLang] || ""}`;
  const minutes = Math.max(1, Math.round(text.length / 550));
  return currentLang === "zh" ? `约 ${minutes} 分钟阅读` : `${minutes} min read`;
}

function articleFolderLabel(item) {
  return localizedText(item.folder, currentLang);
}

function compactTypeLabel(item) {
  return localizedText(item.type, currentLang).replace(/^\d+\s*·\s*/, "");
}

function renderResourceHub() {
  const resources = siteData.resources || [];
  const indexTree = document.querySelector("#works .resource-index-panel .article-index-tree");
  const seriesHeading = document.querySelector("#works .resource-series-heading");
  if (!resources.length || !indexTree || !seriesHeading) return;

  indexTree.innerHTML = `
    <details class="article-tree-group" open>
      <summary><span>${escapeHtml(translations[currentLang]["resources.index.domain.engineering"])}</span><em>${resources.length}</em></summary>
      <div class="article-tree-children">
        ${resources.map((item, index) => `<a class="${index === 0 ? "active" : ""}" href="${escapeAttribute(item.href || "#works")}"><span>${escapeHtml(item.title[currentLang])}</span><em>${escapeHtml(compactTypeLabel(item))}</em></a>`).join("")}
      </div>
    </details>
  `;

  seriesHeading.innerHTML = `
    <small>${escapeHtml(translations[currentLang]["resources.series.label"])}</small>
    <h3>${escapeHtml(translations[currentLang]["resources.series.title"])}</h3>
  `;
}

function renderArticleHub() {
  const articles = siteData.articles || [];
  const articlePanel = document.querySelector(".nav-article-panel");
  const indexTree = document.querySelector("#articles .article-index-tree");
  const seriesHeading = document.querySelector("#articles .article-series-heading");
  const articleList = document.querySelector("#articles .article-list");
  if (!articles.length || !indexTree || !seriesHeading || !articleList) return;

  const isTopicView = window.location.hash === "#articles-mqtt";
  const clientArticles = articlesForFolder("客户端");
  const brokerArticles = articlesForFolder("Broker");
  const total = articles.length;
  const articleCenterProgress = currentLang === "zh"
    ? `系列专题 1 个 / 文章 ${total} 篇`
    : `1 series / ${total} articles`;
  const mqttTopicProgress = currentLang === "zh"
    ? `Client ${clientArticles.length} 篇 / Broker ${brokerArticles.length} 篇`
    : `Client ${clientArticles.length} articles / Broker ${brokerArticles.length} articles`;

  if (articlePanel) {
    const domainLabel = translations[currentLang]["articles.index.domain.communication"];
    articlePanel.innerHTML = `
      <div class="nav-menu-item nav-menu-branch">
        <span class="nav-menu-link nav-menu-branch-trigger nav-menu-label" aria-disabled="true" tabindex="0">
          <span>${escapeHtml(domainLabel)}</span>
        </span>
        <div class="nav-article-subpanel" aria-label="${escapeAttribute(domainLabel)}">
          <a class="nav-menu-link" href="#articles-mqtt">
            <span>MQTT</span>
          </a>
        </div>
      </div>
    `;
  }

  const renderLeaf = (item) => {
    const active = item.id === articles[0].id ? "active" : "";
    return `<a class="${active.trim()}" href="${escapeAttribute(item.href)}"${externalAttrs(item.href)}><span>${escapeHtml(item.title[currentLang])}</span><em>${escapeHtml(item.kind[currentLang])}</em></a>`;
  };

  const renderFolder = (labelZh, labelEn, items) => (
    `<details class="article-tree-node" open>
      <summary><span>${escapeHtml(currentLang === "zh" ? labelZh : labelEn)}</span><em>${items.length}</em></summary>
      <div class="article-tree-children">
        ${items.map(renderLeaf).join("")}
      </div>
    </details>`
  );

  if (isTopicView) {
    indexTree.innerHTML = `
      <details class="article-tree-group" open>
        <summary><span>${escapeHtml(translations[currentLang]["articles.index.domain.communication"])}</span><em>1</em></summary>
        <div class="article-tree-children">
          <details class="article-tree-node article-tree-selected" open>
            <summary><span>${escapeHtml(translations[currentLang]["articles.index.topic.mqtt"])}</span><em>${total}</em></summary>
            <div class="article-tree-children">
              ${renderFolder("客户端", "Client", clientArticles)}
              ${renderFolder("Broker", "Broker", brokerArticles)}
            </div>
          </details>
        </div>
      </details>
    `;
  } else {
    indexTree.innerHTML = `
      <details class="article-tree-group" open>
        <summary><span>${escapeHtml(translations[currentLang]["articles.index.domain.communication"])}</span><em>1</em></summary>
        <div class="article-tree-children">
          <a href="#articles-mqtt"><span>${escapeHtml(translations[currentLang]["articles.index.topic.mqtt"])}</span><em>${total}</em></a>
        </div>
      </details>
    `;
  }

  seriesHeading.setAttribute("aria-label", isTopicView
    ? translations[currentLang]["articles.topic.title"]
    : translations[currentLang]["articles.series.title"]);
  if (isTopicView) {
    seriesHeading.innerHTML = `
      <small>${escapeHtml(translations[currentLang]["articles.topic.label"])}</small>
      <h3>${escapeHtml(translations[currentLang]["articles.topic.title"])}</h3>
      <div class="series-progress" aria-label="CodeSys MQTT series progress">
        <span>${escapeHtml(mqttTopicProgress)}</span>
        <b><i style="width: 100%;"></i></b>
      </div>
    `;
  } else {
    seriesHeading.innerHTML = `
      <small>${escapeHtml(translations[currentLang]["articles.series.label"])}</small>
      <h3>${escapeHtml(translations[currentLang]["articles.series.title"])}</h3>
      <div class="series-progress" aria-label="Article center progress">
        <span>${escapeHtml(articleCenterProgress)}</span>
        <b><i style="width: 100%;"></i></b>
      </div>
    `;
  }

  if (!isTopicView) {
    articleList.classList.add("article-topic-list");
    articleList.setAttribute("aria-label", currentLang === "zh" ? "文章系列专题列表" : "Article series list");
    articleList.innerHTML = `
      <a class="article-list-card article-topic-card" href="#articles-mqtt">
        <small>${escapeHtml(translations[currentLang]["articles.index.domain.communication"])}</small>
        <span class="article-card-meta">
          <em>${currentLang === "zh" ? `${total} 篇文章` : `${total} articles`}</em>
        </span>
        <strong>
          <span class="article-card-no">${currentLang === "zh" ? "系列 01" : "Series 01"}</span>
          <span>${escapeHtml(translations[currentLang]["articles.topic.title"])}</span>
        </strong>
      </a>
    `;
    return;
  }

  articleList.classList.remove("article-topic-list");
  articleList.setAttribute("aria-label", currentLang === "zh" ? "CodeSys MQTT 文章列表" : "CodeSys MQTT article list");
  articleList.innerHTML = articles.map((item) => {
    return `<a class="article-list-card" href="${escapeAttribute(item.href)}"${externalAttrs(item.href)}>
      <small>${escapeHtml(articleFolderLabel(item))}</small>
      <span class="article-card-meta">
        <time datetime="${escapeAttribute(item.date || "")}">${escapeHtml(item.date || "")}</time>
        <em>${escapeHtml(articleReadingTime(item))}</em>
      </span>
      <strong>
        <span class="article-card-no">${escapeHtml(articleSequenceLabel(item))}</span>
        <span>${escapeHtml(item.title[currentLang])}</span>
      </strong>
    </a>`;
  }).join("");
}

function renderProductHub() {
  const products = siteData.products || [];
  const indexTree = document.querySelector("#products .product-index-panel .article-index-tree");
  const seriesHeading = document.querySelector("#products .product-series-heading");
  if (!products.length || !indexTree || !seriesHeading) return;

  indexTree.innerHTML = `
    <details class="article-tree-group" open>
      <summary><span>${escapeHtml(translations[currentLang]["products.index.domain.tools"])}</span><em>${products.length}</em></summary>
      <div class="article-tree-children">
        ${products.map((item, index) => `<a class="${index === 0 ? "active" : ""}" href="${escapeAttribute(item.href || "#products")}"><span>${escapeHtml(item.title[currentLang])}</span><em>${escapeHtml(compactTypeLabel(item))}</em></a>`).join("")}
      </div>
    </details>
  `;

  seriesHeading.innerHTML = `
    <small>${escapeHtml(translations[currentLang]["products.series.label"])}</small>
    <h3>${escapeHtml(translations[currentLang]["products.series.title"])}</h3>
  `;
}

// 内容数据同步到页面已有 DOM：保持已验收视觉结构不变，只把文字从统一数据源灌入。
function hydrateContentFromData() {
  renderResourceHub();
  siteData.resources.forEach((item, index) => {
    const card = document.querySelectorAll(".work-card")[index];
    if (!card) return;
    card.querySelector(".work-index").textContent = item.type[currentLang];
    card.querySelector(".work-title").textContent = item.title[currentLang];
    card.querySelector(".work-meta").textContent = item.copy[currentLang];
  });

  renderArticleHub();
  renderProductHub();

  const product = siteData.products[0];
  const productCard = document.querySelector("#products .info-card");
  if (product && productCard) {
    productCard.querySelector(".product-console-head small").textContent = `01 · ${product.type[currentLang]}`;
    productCard.querySelector("h3").textContent = product.title[currentLang];
    productCard.querySelector("p").textContent = product.copy[currentLang];
  }
}

// 全站搜索索引：覆盖文章、资源、产品和联系方式；后续接入真实站内内容时优先扩展这里。
const searchIndex = [
  ...siteData.articles.map((item) => ({ ...item, href: item.searchHref || item.href })),
  ...siteData.resources.map((item) => ({
    ...item,
    href: item.searchHref || item.href,
    type: { zh: "资源", en: "Resource" },
  })),
  ...siteData.products,
  ...siteData.contacts.map((item) => ({ ...item, href: item.searchHref || item.href, text: item.copy })),
  {
    title: { zh: "关于我", en: "About Me" },
    type: { zh: "关于我", en: "About Me" },
    text: {
      zh: "达姆施塔特工业大学 Bosch Rexroth Fraunhofer IWES 新能源 风电 汽车 离散工业 烟草制丝 成型 卷包 流程工业 冶金 起重 传动 全厂集控系统 工业控制器厂家",
      en: "TU Darmstadt Bosch Rexroth Fraunhofer IWES new energy wind power automotive discrete industry tobacco process filter packaging process industry metallurgy crane drive plant-wide control industrial controller manufacturer",
    },
    href: "#about",
    keywords: "about me experience timeline Darmstadt Bosch Rexroth Fraunhofer IWES wind power automotive tobacco metallurgical drive plant-wide control controller",
  },
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
    ? matches.map((item, index) => `<a class="search-result${index === 0 ? " active" : ""}" href="${item.href}"><span class="search-result-type">${item.type[currentLang]}</span><strong>${item.title[currentLang]}</strong></a>`).join("")
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

// 文章中心采用 hash 驱动的两级视图：#articles 是总入口，#articles-mqtt 是具体系列。
window.addEventListener("hashchange", () => {
  renderArticleHub();
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
