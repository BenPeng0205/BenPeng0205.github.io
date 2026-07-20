// 页面显隐动画控件：对应资源、文章、产品、联系各段落的轻量 fade-in。
const revealItems = document.querySelectorAll(".fade-in");

// 导航右上角搜索控件：默认收起为图标，输入时展示匹配结果浮层。
const searchShell = document.getElementById("searchShell");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("siteSearch");
const searchPanel = document.getElementById("searchPanel");
const siteNav = document.querySelector(".nav");

// 导航最右侧语言切换控件：控制中文/英文文案和搜索结果语言。
const langToggle = document.getElementById("langToggle");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenuPanel = document.getElementById("mobileMenuPanel");
let currentLang = "zh";
let searchFilter = "all";

// 双语文案表：data-i18n 控件的文字都从这里统一维护，便于后期手动精细调整。
const translations = {
  zh: {
    "nav.about": "关于我",
    "nav.resources": "资源",
    "nav.articles": "文章",
    "nav.products": "产品",
    "nav.contact": "联系",
    "a11y.skip": "跳到主要内容",
    "a11y.search": "搜索",
    "a11y.search.results": "搜索结果",
    "a11y.search.filters": "搜索筛选",
    "a11y.menu": "移动主导航",
    "a11y.menu.open": "打开主菜单",
    "a11y.menu.close": "关闭主菜单",
    "nav.article.menu.client": "MQTT Client 第1篇",
    "nav.article.menu.server": "MQTT Server 资料",
    "search.placeholder": "搜索文章、资源、产品",
    "search.filter.all": "全部",
    "search.filter.article": "文章",
    "search.filter.resource": "资源",
    "search.filter.product": "产品",
    "search.filter.contact": "联系",
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
    "resources.detail.label": "资源详情",
    "resources.detail.breadcrumb": "资源中心",
    "resources.detail.domain": "工程资源",
    "resources.detail.status": "开放状态",
    "resources.detail.access": "获取方式",
    "resources.detail.format": "资料形态",
    "resources.detail.scene": "适用场景",
    "resources.detail.related": "相关入口",
    "products.title": "产品",
    "products.index.label": "产品索引",
    "products.index.domain.tools": "工程效率工具",
    "products.series.label": "产品中心",
    "products.series.title": "工程效率工具",
    "products.detail.label": "产品详情",
    "products.detail.breadcrumb": "产品中心",
    "products.detail.pain": "解决痛点",
    "products.detail.capability": "核心能力",
    "products.detail.workflow": "工作流",
    "products.detail.delivery": "交付边界",
    "product.1.version": "V1.4",
    "product.1.mode": "工程同步",
    "product.1.scope": "差异审查",
    "product.1.capability.1": "工程可读",
    "product.1.capability.2": "差异可见",
    "product.1.capability.3": "写回可控",
    "product.1.cta": "查看产品详情",
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
    "a11y.skip": "Skip to main content",
    "a11y.search": "Search",
    "a11y.search.results": "Search results",
    "a11y.search.filters": "Search filters",
    "a11y.menu": "Mobile primary navigation",
    "a11y.menu.open": "Open primary menu",
    "a11y.menu.close": "Close primary menu",
    "nav.article.menu.client": "MQTT Client Part 1",
    "nav.article.menu.server": "MQTT Server Notes",
    "search.placeholder": "Search articles, resources, products",
    "search.filter.all": "All",
    "search.filter.article": "Articles",
    "search.filter.resource": "Resources",
    "search.filter.product": "Products",
    "search.filter.contact": "Contact",
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
    "resources.detail.label": "Resource Detail",
    "resources.detail.breadcrumb": "Resource Center",
    "resources.detail.domain": "Engineering Resources",
    "resources.detail.status": "Status",
    "resources.detail.access": "Access",
    "resources.detail.format": "Format",
    "resources.detail.scene": "Use Case",
    "resources.detail.related": "Related",
    "products.title": "Products",
    "products.index.label": "Product Index",
    "products.index.domain.tools": "Engineering Efficiency Tools",
    "products.series.label": "Product Center",
    "products.series.title": "Engineering Efficiency Tools",
    "products.detail.label": "Product Detail",
    "products.detail.breadcrumb": "Product Center",
    "products.detail.pain": "Pain Solved",
    "products.detail.capability": "Core Capabilities",
    "products.detail.workflow": "Workflow",
    "products.detail.delivery": "Delivery Boundary",
    "product.1.version": "V1.4",
    "product.1.mode": "Project sync",
    "product.1.scope": "Diff review",
    "product.1.capability.1": "Readable projects",
    "product.1.capability.2": "Visible differences",
    "product.1.capability.3": "Controlled write-back",
    "product.1.cta": "View Product Details",
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

function detailHash(prefix, item) {
  return `#${prefix}-${item.id}`;
}

function currentHashItem(prefix, items) {
  const hash = window.location.hash || "";
  return items.find((item) => hash === detailHash(prefix, item));
}

function localizedList(value) {
  const list = value && Array.isArray(value[currentLang]) ? value[currentLang] : [];
  return list.map((item) => escapeHtml(item)).join("");
}

function renderInlineList(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderMetaTile(labelKey, value) {
  return `<div class="detail-meta-tile"><span>${escapeHtml(translations[currentLang][labelKey])}</span><strong>${escapeHtml(localizedText(value, currentLang))}</strong></div>`;
}

function setContentIndexCurrent(sectionSelector, label) {
  const node = document.querySelector(`${sectionSelector} [data-index-current]`);
  if (node) node.textContent = label;
}

function renderResourceHub() {
  const resources = siteData.resources || [];
  const indexTree = document.querySelector("#works .resource-index-panel .article-index-tree");
  const seriesHeading = document.querySelector("#works .resource-series-heading");
  const resourceGrid = document.querySelector("#works .resource-card-grid");
  const detailPanel = document.querySelector("#works .resource-detail-panel");
  if (!resources.length || !indexTree || !seriesHeading || !resourceGrid || !detailPanel) return;

  const selected = currentHashItem("works", resources);

  indexTree.innerHTML = `
    <details class="article-tree-group" open>
      <summary><span>${escapeHtml(translations[currentLang]["resources.index.domain.engineering"])}</span><em>${resources.length}</em></summary>
      <div class="article-tree-children">
        ${resources.map((item, index) => {
          const href = item.href || detailHash("works", item);
          const active = selected ? selected.id === item.id : index === 0;
          return `<a class="${active ? "active" : ""}" href="${escapeAttribute(href)}"><span>${escapeHtml(item.title[currentLang])}</span><em>${escapeHtml(compactTypeLabel(item))}</em></a>`;
        }).join("")}
      </div>
    </details>
  `;

  seriesHeading.innerHTML = `
    <small>${escapeHtml(translations[currentLang]["resources.series.label"])}</small>
    <h3>${escapeHtml(selected ? selected.title[currentLang] : translations[currentLang]["resources.series.title"])}</h3>
  `;
  setContentIndexCurrent("#works", selected ? selected.title[currentLang] : translations[currentLang]["resources.series.title"]);

  resourceGrid.querySelectorAll(".work-card").forEach((card, index) => {
    const item = resources[index];
    if (!item) return;
    card.setAttribute("href", item.href || detailHash("works", item));
    card.classList.toggle("active", Boolean(selected && selected.id === item.id));
  });

  if (!selected) {
    detailPanel.hidden = true;
    detailPanel.innerHTML = "";
    resourceGrid.hidden = false;
    resourceGrid.closest(".resource-library-panel").classList.remove("is-detail");
    return;
  }

  const typeLabel = compactTypeLabel(selected);
  const related = Array.isArray(selected.related) ? selected.related : [];
  detailPanel.hidden = false;
  resourceGrid.hidden = true;
  resourceGrid.closest(".resource-library-panel").classList.add("is-detail");
  detailPanel.innerHTML = `
    <nav class="detail-breadcrumb" aria-label="${escapeAttribute(translations[currentLang]["resources.detail.breadcrumb"])}">
      <a href="#works">${escapeHtml(translations[currentLang]["resources.detail.breadcrumb"])}</a>
      <span>/</span>
      <span>${escapeHtml(translations[currentLang]["resources.detail.domain"])}</span>
      <span>/</span>
      <span>${escapeHtml(typeLabel)}</span>
    </nav>
    <div class="detail-panel-head">
      <small>${escapeHtml(translations[currentLang]["resources.detail.label"])}</small>
      <h4>${escapeHtml(selected.title[currentLang])}</h4>
      <p>${escapeHtml(localizedText(selected.detail, currentLang))}</p>
    </div>
    <div class="detail-meta-grid">
      ${renderMetaTile("resources.detail.status", selected.status)}
      ${renderMetaTile("resources.detail.access", selected.access)}
      ${renderMetaTile("resources.detail.format", selected.format)}
    </div>
    <section class="detail-block">
      <strong>${escapeHtml(translations[currentLang]["resources.detail.scene"])}</strong>
      ${renderInlineList(selected.bullets[currentLang] || [])}
    </section>
    <section class="detail-block detail-links">
      <strong>${escapeHtml(translations[currentLang]["resources.detail.related"])}</strong>
      ${related.map((item) => `<a href="${escapeAttribute(item.href)}"${externalAttrs(item.href)}>${escapeHtml(item[currentLang])}</a>`).join("")}
    </section>
  `;
}

function renderArticleHub() {
  const articles = siteData.articles || [];
  const articlePanel = document.querySelector(".nav-article-panel");
  const indexTree = document.querySelector("#articles .article-index-tree");
  const seriesHeading = document.querySelector("#articles .article-series-heading");
  const articleList = document.querySelector("#articles .article-list");
  if (!articles.length || !indexTree || !seriesHeading || !articleList) return;

  const topics = [];
  const topicByKey = new Map();
  articles.forEach((item) => {
    const key = item.topicKey || "mqtt";
    let topic = topicByKey.get(key);
    if (!topic) {
      topic = {
        key,
        title: item.topicTitle || (key === "mqtt"
          ? { zh: "CodeSys MQTT 系列", en: "CodeSys MQTT Series" }
          : { zh: key.toUpperCase(), en: key.toUpperCase() }),
        categoryKey: item.categoryKey || "industrial-communication",
        category: item.category || {
          zh: translations.zh["articles.index.domain.communication"],
          en: translations.en["articles.index.domain.communication"],
        },
        articles: [],
      };
      topicByKey.set(key, topic);
      topics.push(topic);
    }
    topic.articles.push(item);
  });
  const hashTopicKey = window.location.hash.startsWith("#articles-")
    ? window.location.hash.slice("#articles-".length)
    : "";
  const selectedTopic = topicByKey.get(hashTopicKey) || null;
  const total = articles.length;
  const articleCenterProgress = currentLang === "zh"
    ? `系列专题 ${topics.length} 个 / 文章 ${total} 篇`
    : `${topics.length} series / ${total} articles`;
  const categoryGroups = [];
  const categoryByKey = new Map();
  topics.forEach((topic) => {
    let group = categoryByKey.get(topic.categoryKey);
    if (!group) {
      group = { key: topic.categoryKey, title: topic.category, topics: [] };
      categoryByKey.set(topic.categoryKey, group);
      categoryGroups.push(group);
    }
    group.topics.push(topic);
  });

  if (articlePanel) {
    articlePanel.innerHTML = categoryGroups.map((group) => {
      const domainLabel = localizedText(group.title, currentLang);
      return `<div class="nav-menu-item nav-menu-branch">
        <span class="nav-menu-link nav-menu-branch-trigger nav-menu-label" aria-disabled="true" tabindex="0">
          <span>${escapeHtml(domainLabel)}</span>
        </span>
        <div class="nav-article-subpanel" aria-label="${escapeAttribute(domainLabel)}">
          ${group.topics.map((topic) => `<a class="nav-menu-link" href="#articles-${escapeAttribute(topic.key)}"><span>${escapeHtml(topic.key.toUpperCase())}</span></a>`).join("")}
        </div>
      </div>`;
    }).join("");
  }

  const renderLeaf = (item) => {
    const active = item.id === articles[0].id ? "active" : "";
    return `<a class="${active.trim()}" href="${escapeAttribute(item.href)}"${externalAttrs(item.href)}><span>${escapeHtml(item.title[currentLang])}</span><em>${escapeHtml(item.kind[currentLang])}</em></a>`;
  };

  const renderFolder = (label, items) => (
    `<details class="article-tree-node" open>
      <summary><span>${escapeHtml(label)}</span><em>${items.length}</em></summary>
      <div class="article-tree-children">
        ${items.map(renderLeaf).join("")}
      </div>
    </details>`
  );

  indexTree.innerHTML = categoryGroups.map((group) => {
    const selectedInGroup = selectedTopic && selectedTopic.categoryKey === group.key;
    return `<details class="article-tree-group" open>
      <summary><span>${escapeHtml(localizedText(group.title, currentLang))}</span><em>${group.topics.length}</em></summary>
      <div class="article-tree-children">
        ${group.topics.map((topic) => {
          if (!selectedTopic || topic.key !== selectedTopic.key) {
            return `<a href="#articles-${escapeAttribute(topic.key)}"><span>${escapeHtml(topic.key.toUpperCase())}</span><em>${topic.articles.length}</em></a>`;
          }
          const folders = [];
          const folderMap = new Map();
          topic.articles.forEach((item) => {
            const folder = localizedText(item.folder, currentLang) || articleFolderLabel(item);
            if (!folderMap.has(folder)) {
              const entry = { label: folder, items: [] };
              folderMap.set(folder, entry);
              folders.push(entry);
            }
            folderMap.get(folder).items.push(item);
          });
          return `<details class="article-tree-node article-tree-selected" open>
            <summary><span>${escapeHtml(topic.key.toUpperCase())}</span><em>${topic.articles.length}</em></summary>
            <div class="article-tree-children">${folders.map((folder) => renderFolder(folder.label, folder.items)).join("")}</div>
          </details>`;
        }).join("")}
      </div>
    </details>`;
  }).join("");
  const currentTitle = selectedTopic
    ? localizedText(selectedTopic.title, currentLang)
    : translations[currentLang]["articles.series.title"];
  setContentIndexCurrent("#articles", currentTitle);

  seriesHeading.setAttribute("aria-label", currentTitle);
  if (selectedTopic) {
    const folderCounts = new Map();
    selectedTopic.articles.forEach((item) => {
      const folder = localizedText(item.folder, currentLang) || articleFolderLabel(item);
      folderCounts.set(folder, (folderCounts.get(folder) || 0) + 1);
    });
    const topicProgress = [...folderCounts.entries()]
      .map(([folder, count]) => {
        const progressFolder = currentLang === "zh" && folder === "客户端" ? "Client" : folder;
        return currentLang === "zh" ? `${progressFolder} ${count} 篇` : `${progressFolder} ${count} articles`;
      })
      .join(" / ");
    seriesHeading.innerHTML = `
      <small>${escapeHtml(translations[currentLang]["articles.topic.label"])}</small>
      <h3>${escapeHtml(currentTitle)}</h3>
      <div class="series-progress" aria-label="${escapeAttribute(currentTitle)}">
        <span>${escapeHtml(topicProgress)}</span>
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

  if (!selectedTopic) {
    articleList.classList.add("article-topic-list");
    articleList.setAttribute("aria-label", currentLang === "zh" ? "文章系列专题列表" : "Article series list");
    articleList.innerHTML = topics.map((topic, index) => `
      <a class="article-list-card article-topic-card" href="#articles-${escapeAttribute(topic.key)}">
        <small>${escapeHtml(localizedText(topic.category, currentLang))}</small>
        <span class="article-card-meta">
          <em>${currentLang === "zh" ? `${topic.articles.length} 篇文章` : `${topic.articles.length} articles`}</em>
        </span>
        <strong>
          <span class="article-card-no">${currentLang === "zh" ? `系列 ${String(index + 1).padStart(2, "0")}` : `Series ${String(index + 1).padStart(2, "0")}`}</span>
          <span>${escapeHtml(localizedText(topic.title, currentLang))}</span>
        </strong>
      </a>
    `).join("");
    return;
  }

  articleList.classList.remove("article-topic-list");
  articleList.setAttribute("aria-label", currentTitle);
  articleList.innerHTML = selectedTopic.articles.map((item) => {
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
  const detailPanel = document.querySelector("#products .product-detail-panel");
  const productGrid = document.querySelector("#products .product-card-grid");
  if (!products.length || !indexTree || !seriesHeading || !detailPanel || !productGrid) return;

  const selected = currentHashItem("products", products);

  indexTree.innerHTML = `
    <details class="article-tree-group" open>
      <summary><span>${escapeHtml(translations[currentLang]["products.index.domain.tools"])}</span><em>${products.length}</em></summary>
      <div class="article-tree-children">
        ${products.map((item, index) => {
          const href = item.href || detailHash("products", item);
          const active = selected ? selected.id === item.id : index === 0;
          return `<a class="${active ? "active" : ""}" href="${escapeAttribute(href)}"><span>${escapeHtml(item.title[currentLang])}</span><em>${escapeHtml(compactTypeLabel(item))}</em></a>`;
        }).join("")}
      </div>
    </details>
  `;

  seriesHeading.innerHTML = `
    <small>${escapeHtml(translations[currentLang]["products.series.label"])}</small>
    <h3>${escapeHtml(selected ? selected.title[currentLang] : translations[currentLang]["products.series.title"])}</h3>
  `;
  setContentIndexCurrent("#products", selected ? selected.title[currentLang] : translations[currentLang]["products.series.title"]);

  productGrid.classList.toggle("product-grid-single", products.length === 1);
  productGrid.innerHTML = products.map((item, index) => {
    const capabilities = item.cardCapabilities?.[currentLang] || item.capabilities?.[currentLang] || [];
    const coverPath = item.cover || "assets/images/products/syncbridge-cover.png";
    const cover = window.location.protocol === "file:" && window.location.pathname.replaceAll("\\", "/").includes("/src/app/")
      ? `../../public/${coverPath}`
      : coverPath;
    const pills = item.cardPills?.[currentLang] || [item.version || "V1.0", localizedText(item.status, currentLang), localizedText(item.access, currentLang)];
    return `<a class="info-card product-console-card${selected?.id === item.id ? " active" : ""}" href="${escapeAttribute(item.href || detailHash("products", item))}">
      <div class="product-console-main">
        <div class="product-console-head">
          <small>${String(index + 1).padStart(2, "0")} · ${escapeHtml(compactTypeLabel(item))}</small>
          <div class="product-version-pills" aria-label="${escapeAttribute(item.title[currentLang])}">
            ${pills.map((pill) => `<span>${escapeHtml(pill)}</span>`).join("")}
          </div>
        </div>
        <h3>${escapeHtml(item.title[currentLang])}</h3>
        <p>${escapeHtml(localizedText(item.copy, currentLang))}</p>
        <div class="product-console-footer">
          <div class="product-console-capabilities" aria-label="${escapeAttribute(item.title[currentLang])}">
            ${capabilities.slice(0, 3).map((capability) => `<span>${escapeHtml(capability)}</span>`).join("")}
          </div>
          <span class="product-console-cta"><span>${escapeHtml(translations[currentLang]["product.1.cta"])}</span><i aria-hidden="true">→</i></span>
        </div>
      </div>
      <figure class="product-cover-orb" aria-label="${escapeAttribute(item.title[currentLang])}">
        <img src="${escapeAttribute(cover)}" alt="${escapeAttribute(item.title[currentLang])}">
      </figure>
    </a>`;
  }).join("");

  if (!selected) {
    detailPanel.hidden = true;
    detailPanel.innerHTML = "";
    productGrid.hidden = false;
    productGrid.closest(".product-library-panel").classList.remove("is-detail");
    return;
  }

  detailPanel.hidden = false;
  productGrid.hidden = true;
  productGrid.closest(".product-library-panel").classList.add("is-detail");
  const detailCoverPath = selected.cover || "assets/images/products/syncbridge-cover.png";
  const detailCover = window.location.protocol === "file:" && window.location.pathname.replaceAll("\\", "/").includes("/src/app/")
    ? `../../public/${detailCoverPath}`
    : detailCoverPath;
  const facts = selected.facts?.[currentLang] || [];
  const capabilityDetails = selected.capabilityDetails?.[currentLang] || [];
  const workflowSteps = selected.workflowSteps?.[currentLang] || [];
  const compatibility = selected.compatibility?.[currentLang] || {};
  const boundaries = selected.boundaries?.[currentLang] || [];
  const purchase = selected.purchase?.[currentLang] || {};
  const faq = selected.faq?.[currentLang] || [];
  const detailLabels = currentLang === "zh"
    ? {
        capability: "核心能力",
        capabilityTitle: "每个价值，都对应一个工程动作。",
        workflow: "标准工作流",
        workflowTitle: "先建立基线，再审查变化。",
        compatibility: "向下兼容",
        boundary: "交付边界",
        boundaryTitle: "工业软件的边界，必须说清楚。",
        faq: "FAQ",
        faqTitle: "购买前常见问题",
      }
    : {
        capability: "Core capabilities",
        capabilityTitle: "Every value maps to an engineering action.",
        workflow: "Standard workflow",
        workflowTitle: "Establish the baseline before reviewing change.",
        compatibility: "Backward compatibility",
        boundary: "Delivery boundary",
        boundaryTitle: "Industrial software boundaries must be explicit.",
        faq: "FAQ",
        faqTitle: "Questions before purchase",
      };
  detailPanel.innerHTML = `
    <nav class="detail-breadcrumb" aria-label="${escapeAttribute(translations[currentLang]["products.detail.breadcrumb"])}">
      <a href="#products">${escapeHtml(translations[currentLang]["products.detail.breadcrumb"])}</a>
      <span>/</span>
      <span>${escapeHtml(translations[currentLang]["products.index.domain.tools"])}</span>
      <span>/</span>
      <span>${escapeHtml(selected.title[currentLang])}</span>
    </nav>
    <section class="syncbridge-detail-hero" aria-labelledby="syncbridge-detail-title">
      <div class="syncbridge-detail-identity">
        <div class="syncbridge-nameplate">
          <img src="${escapeAttribute(detailCover)}" alt="${escapeAttribute(selected.title[currentLang])}">
          <div><strong>${escapeHtml(selected.title[currentLang])}</strong><span>by ControlRookie</span></div>
        </div>
        <p class="syncbridge-eyebrow"><span>${escapeHtml(translations[currentLang]["products.detail.label"])}</span><span>${escapeHtml(localizedText(selected.category, currentLang))}</span></p>
        <h4 id="syncbridge-detail-title">${escapeHtml(localizedText(selected.headline, currentLang))}</h4>
        <p class="syncbridge-lead">${escapeHtml(localizedText(selected.copy, currentLang))}</p>
        <div class="syncbridge-pills" aria-label="${escapeAttribute(selected.title[currentLang])}">
          ${(selected.cardPills?.[currentLang] || []).map((pill) => `<span>${escapeHtml(pill)}</span>`).join("")}
        </div>
        <p class="syncbridge-access-line"><span>${escapeHtml(localizedText(selected.status, currentLang))}</span><span>${escapeHtml(localizedText(selected.access, currentLang))}</span></p>
      </div>
      <div class="syncbridge-console" aria-label="${escapeAttribute(selected.title[currentLang])}">
        <div class="syncbridge-console-head"><span>SYNC / REVIEW / CONTROL</span><strong>01</strong></div>
        <div class="syncbridge-console-flow">
          <div><small>IDE</small><strong>${currentLang === "zh" ? "工程对象" : "Project objects"}</strong><code>POU · GVL · DUT</code></div>
          <span class="syncbridge-bridge" aria-hidden="true"><i></i><i></i></span>
          <div><small>FILES</small><strong>${currentLang === "zh" ? "可读文件" : "Readable files"}</strong><code>ST · XML · Git</code></div>
        </div>
        <div class="syncbridge-console-statement">
          ${(selected.cardCapabilities?.[currentLang] || []).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </div>
    </section>
    <section class="syncbridge-fact-strip" aria-label="${currentLang === "zh" ? "商业信息" : "Commercial terms"}">
      ${facts.map((item) => `<div><small>${escapeHtml(item.label)}</small><strong>${escapeHtml(item.value)}</strong></div>`).join("")}
    </section>
    <section class="syncbridge-content-section" id="syncbridge-capabilities">
      <header class="syncbridge-section-head"><small>${escapeHtml(detailLabels.capability)}</small><h5>${escapeHtml(detailLabels.capabilityTitle)}</h5></header>
      <div class="syncbridge-capability-grid">
        ${capabilityDetails.map((item, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h6>${escapeHtml(item.title)}</h6><p>${escapeHtml(item.copy)}</p></article>`).join("")}
      </div>
    </section>
    <section class="syncbridge-content-section" id="syncbridge-workflow">
      <header class="syncbridge-section-head"><small>${escapeHtml(detailLabels.workflow)}</small><h5>${escapeHtml(detailLabels.workflowTitle)}</h5></header>
      <ol class="syncbridge-workflow-list">
        ${workflowSteps.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.copy)}</p></div></li>`).join("")}
      </ol>
    </section>
    <section class="syncbridge-content-section" id="syncbridge-compatibility">
      <header class="syncbridge-section-head"><small>${escapeHtml(detailLabels.compatibility)}</small><h5>${escapeHtml(compatibility.title || "")}</h5></header>
      <div class="syncbridge-compatibility-panel">
        <p>${escapeHtml(compatibility.copy || "")}</p>
        <ul>${(compatibility.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
    </section>
    <section class="syncbridge-content-section" id="syncbridge-boundary">
      <header class="syncbridge-section-head"><small>${escapeHtml(detailLabels.boundary)}</small><h5>${escapeHtml(detailLabels.boundaryTitle)}</h5></header>
      <div class="syncbridge-boundary-table">
        ${boundaries.map((item) => `<div><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></div>`).join("")}
      </div>
    </section>
    <section class="syncbridge-purchase-panel" id="syncbridge-purchase">
      <div><small>${escapeHtml(purchase.label || "")}</small><h5>${escapeHtml(purchase.price || "")}</h5><p>${escapeHtml(purchase.policy || "")}</p></div>
      <div class="syncbridge-purchase-action"><a href="#contact">${escapeHtml(purchase.cta || "")}</a><small>${escapeHtml(purchase.channel || "")}</small></div>
    </section>
    <section class="syncbridge-content-section syncbridge-faq-section" aria-labelledby="syncbridge-faq-title">
      <header class="syncbridge-section-head"><small>${escapeHtml(detailLabels.faq)}</small><h5 id="syncbridge-faq-title">${escapeHtml(detailLabels.faqTitle)}</h5></header>
      ${faq.map((item) => `<details><summary>${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p></details>`).join("")}
    </section>
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

}

// 全站搜索索引：覆盖文章、资源、产品和联系方式；后续接入真实站内内容时优先扩展这里。
const searchIndex = [
  ...siteData.articles.map((item) => ({ ...item, href: item.searchHref || item.href, searchGroup: "article" })),
  ...siteData.resources.map((item) => ({
    ...item,
    href: item.searchHref || item.href,
    type: { zh: "资源", en: "Resource" },
    searchGroup: "resource",
  })),
  ...siteData.products.map((item) => ({ ...item, searchGroup: "product" })),
  ...siteData.contacts.map((item) => ({ ...item, href: item.searchHref || item.href, text: item.copy, searchGroup: "contact" })),
  {
    title: { zh: "关于我", en: "About Me" },
    type: { zh: "关于我", en: "About Me" },
    text: {
      zh: "达姆施塔特工业大学 Bosch Rexroth Fraunhofer IWES 新能源 风电 汽车 离散工业 烟草制丝 成型 卷包 流程工业 冶金 起重 传动 全厂集控系统 工业控制器厂家",
      en: "TU Darmstadt Bosch Rexroth Fraunhofer IWES new energy wind power automotive discrete industry tobacco process filter packaging process industry metallurgy crane drive plant-wide control industrial controller manufacturer",
    },
    href: "#about",
    searchGroup: "about",
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
    if (translations[lang][key]) node.textContent = translations[lang][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (translations[lang][key]) node.setAttribute("placeholder", translations[lang][key]);
  });
  hydrateContentFromData();
  langToggle.textContent = lang === "zh" ? "EN" : "中";
  langToggle.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
  searchButton.setAttribute("aria-label", translations[lang]["a11y.search"]);
  searchInput.setAttribute("aria-label", translations[lang]["search.placeholder"]);
  searchPanel.setAttribute("aria-label", translations[lang]["a11y.search.results"]);
  mobileMenuPanel?.setAttribute("aria-label", translations[lang]["a11y.menu"]);
  mobileMenuToggle?.setAttribute(
    "aria-label",
    translations[lang][mobileMenuToggle.getAttribute("aria-expanded") === "true" ? "a11y.menu.close" : "a11y.menu.open"],
  );
  if (searchShell.classList.contains("open") || searchPanel.classList.contains("visible") || document.activeElement === searchInput) {
    renderSearch(searchInput.value);
  }
}

// 搜索结果渲染：基于关键词匹配 searchIndex，生成 ForAI 风格的浮层结果卡片。
function renderSearch(query) {
  const keyword = query.trim().toLowerCase();
  const typedMatches = keyword
    ? searchIndex.filter((item) => {
      const haystack = [
        item.title.zh,
        item.title.en,
        item.type.zh,
        item.type.en,
        localizedText(item.text, "zh"),
        localizedText(item.text, "en"),
        localizedText(item.copy, "zh"),
        localizedText(item.copy, "en"),
        localizedText(item.detail, "zh"),
        localizedText(item.detail, "en"),
        localizedText(item.pain, "zh"),
        localizedText(item.pain, "en"),
        item.aliases || "",
        item.keywords || "",
      ].join(" ").toLowerCase();
      return haystack.includes(keyword);
    })
    : searchIndex.slice(0, 5);
  const matches = searchFilter === "all"
    ? typedMatches
    : typedMatches.filter((item) => item.searchGroup === searchFilter);
  const filters = [
    ["all", translations[currentLang]["search.filter.all"]],
    ["article", translations[currentLang]["search.filter.article"]],
    ["resource", translations[currentLang]["search.filter.resource"]],
    ["product", translations[currentLang]["search.filter.product"]],
    ["contact", translations[currentLang]["search.filter.contact"]],
  ];
  const filterBar = `<div class="search-filter-bar" role="tablist" aria-label="${escapeAttribute(translations[currentLang]["a11y.search.filters"])}">
    ${filters.map(([value, label]) => `<button type="button" role="tab" aria-selected="${searchFilter === value ? "true" : "false"}" class="${searchFilter === value ? "active" : ""}" data-search-filter="${value}">${escapeHtml(label)}</button>`).join("")}
  </div>`;

  const resultList = matches.length
    ? matches.map((item, index) => `<a class="search-result${index === 0 ? " active" : ""}" href="${item.href}"${externalAttrs(item.href)}><span class="search-result-type">${item.type[currentLang]}</span><strong>${item.title[currentLang]}</strong></a>`).join("")
    : `<div class="search-empty">${translations[currentLang]["search.empty"]}</div>`;
  searchPanel.innerHTML = `${filterBar}<div class="search-results">${resultList}</div>`;
  searchPanel.hidden = false;
  searchPanel.inert = false;
  searchPanel.classList.add("visible");
  searchShell.classList.add("open");
  siteNav?.classList.add("search-active");
  searchButton.setAttribute("aria-expanded", "true");
}

function closeSearch() {
  searchShell.classList.remove("open");
  searchPanel.classList.remove("visible");
  searchPanel.hidden = true;
  searchPanel.inert = true;
  siteNav?.classList.remove("search-active");
  searchButton.setAttribute("aria-expanded", "false");
}

function closeMobileMenu(restoreFocus = false) {
  if (!mobileMenuToggle || !mobileMenuPanel) return;
  mobileMenuToggle.setAttribute("aria-expanded", "false");
  mobileMenuToggle.setAttribute("aria-label", translations[currentLang]["a11y.menu.open"]);
  mobileMenuPanel.hidden = true;
  if (restoreFocus) mobileMenuToggle.focus();
}

function openMobileMenu() {
  if (!mobileMenuToggle || !mobileMenuPanel) return;
  closeSearch();
  mobileMenuPanel.hidden = false;
  mobileMenuToggle.setAttribute("aria-expanded", "true");
  mobileMenuToggle.setAttribute("aria-label", translations[currentLang]["a11y.menu.close"]);
}

function closeContentIndex(toggle, restoreFocus = false) {
  toggle.setAttribute("aria-expanded", "false");
  if (restoreFocus) toggle.focus();
}

document.querySelectorAll(".content-index-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".content-index-toggle").forEach((item) => {
      if (item !== toggle) closeContentIndex(item);
    });
    toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
  });
  const body = document.getElementById(toggle.getAttribute("aria-controls") || "");
  body?.addEventListener("click", (event) => {
    if (event.target.closest("a") && window.innerWidth <= 1040) closeContentIndex(toggle);
  });
});

// 点击搜索图标：展开黑色搜索框并展示默认结果。
searchButton.addEventListener("click", () => {
  closeMobileMenu();
  searchShell.classList.add("open");
  searchInput.focus();
  renderSearch(searchInput.value);
});

mobileMenuToggle?.addEventListener("click", () => {
  const expanded = mobileMenuToggle.getAttribute("aria-expanded") === "true";
  if (expanded) closeMobileMenu(true);
  else openMobileMenu();
});

mobileMenuPanel?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMobileMenu();
});

// 搜索输入：即时过滤所有已登记文章、资源、产品和联系方式。
searchInput.addEventListener("input", () => renderSearch(searchInput.value));
searchInput.addEventListener("focus", () => {
  searchShell.classList.add("open");
  renderSearch(searchInput.value);
});

searchPanel.addEventListener("click", (event) => {
  event.stopPropagation();
  const target = event.target.closest("[data-search-filter]");
  if (!target) return;
  event.preventDefault();
  searchFilter = target.dataset.searchFilter || "all";
  renderSearch(searchInput.value);
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSearch();
    searchButton.focus();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (mobileMenuToggle?.getAttribute("aria-expanded") === "true") {
    closeMobileMenu(true);
    return;
  }
  const openIndex = [...document.querySelectorAll(".content-index-toggle")]
    .find((toggle) => toggle.getAttribute("aria-expanded") === "true");
  if (openIndex && window.innerWidth <= 1040) {
    closeContentIndex(openIndex, true);
    return;
  }
  if (searchShell.classList.contains("open") || searchPanel.classList.contains("visible")) {
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
  closeMobileMenu();
  renderResourceHub();
  renderArticleHub();
  renderProductHub();
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1041) {
    closeMobileMenu();
    document.querySelectorAll(".content-index-toggle").forEach((toggle) => closeContentIndex(toggle));
  }
});

// 点击搜索区域外：收起搜索框和结果面板。
document.addEventListener("click", (event) => {
  if (!searchShell.contains(event.target) && !searchPanel.contains(event.target)) {
    closeSearch();
  }
  if (mobileMenuPanel && mobileMenuToggle && !mobileMenuPanel.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
    closeMobileMenu();
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
