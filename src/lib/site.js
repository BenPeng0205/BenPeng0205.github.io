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
        "nav.resources": "资源",
        "nav.articles": "文章",
        "nav.products": "产品",
        "nav.contact": "联系",
        "search.placeholder": "搜索文章、资源、产品",
        "hero.kicker": "AI 自动化架构师 / 2026",
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
        "resource.1.type": "01 · 源代码",
        "resource.1.title": "CODESYS 示例工程",
        "resource.1.copy": "控制逻辑、通信、状态机和工程模板源码。",
        "resource.2.type": "02 · 库文件",
        "resource.2.title": "PLC Library",
        "resource.2.copy": "可复用功能块、通信封装和工程基础库。",
        "resource.3.type": "03 · 标准",
        "resource.3.title": "工程标准",
        "resource.3.copy": "命名、状态机、交付、测试和文档规范。",
        "resource.4.type": "04 · 模板",
        "resource.4.title": "项目脚手架",
        "resource.4.copy": "工程初始化、目录结构、清单和验证流程。",
        "resource.5.type": "05 · 协议",
        "resource.5.title": "MQTT 资料",
        "resource.5.copy": "服务器、客户端、主题设计和排障资料。",
        "resource.6.type": "06 · 脚本",
        "resource.6.title": "自动化脚本",
        "resource.6.copy": "面向工程效率的批处理、检查和生成工具。",
        "resource.7.type": "07 · AI",
        "resource.7.title": "LLM 工作流",
        "resource.7.copy": "提示词、技能、Agent 和自动化协作规则。",
        "resource.8.type": "08 · 资料",
        "resource.8.title": "工程资料库",
        "resource.8.copy": "手册、笔记、复盘和关键技术路线图。",
        "articles.title": "文章",
        "article.1.title": "CODESYS MQTT 系列",
        "article.1.copy": "已发布服务器、客户端、Broker、主题通信和排障教程，先跳转 CSDN 分类页。",
        "products.title": "产品",
        "product.1.copy": "面向 CODESYS / SmartControl 工程的 LLM 同步与协作工具，用于工程镜像、代码上下文、规则和自动化工作流衔接。",
        "contact.title": "联系",
        "contact.heading": "聊聊工程效率。",
        "contact.lead": "文章合作、工具试用、工程咨询、AI 自动化方案，可以通过微信、邮箱、CSDN 或公众号联系。",
        "contact.wechat.label": "微信",
        "contact.official.label": "公众号",
        "contact.email.label": "邮箱",
        "footer.copy": "面向自动化工程师的 AI 自动化架构。",
        "search.empty": "没有匹配结果。可以尝试 PLC、AI、CODESYS、MQTT、资源、产品。"
      },
      en: {
        "nav.resources": "Resources",
        "nav.articles": "Articles",
        "nav.products": "Products",
        "nav.contact": "Contact",
        "search.placeholder": "Search articles, resources, products",
        "hero.kicker": "AI Automation Architect / 2026",
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
        "resource.1.type": "01 · Source",
        "resource.1.title": "CODESYS Examples",
        "resource.1.copy": "Control logic, communication, state machines, and project templates.",
        "resource.2.type": "02 · Library",
        "resource.2.title": "PLC Library",
        "resource.2.copy": "Reusable function blocks, communication wrappers, and base libraries.",
        "resource.3.type": "03 · Standard",
        "resource.3.title": "Engineering Standards",
        "resource.3.copy": "Naming, state machines, delivery, testing, and documentation rules.",
        "resource.4.type": "04 · Template",
        "resource.4.title": "Project Scaffold",
        "resource.4.copy": "Initialization, folder structure, checklists, and validation workflows.",
        "resource.5.type": "05 · Protocol",
        "resource.5.title": "MQTT Resources",
        "resource.5.copy": "Server, client, topic design, and troubleshooting references.",
        "resource.6.type": "06 · Script",
        "resource.6.title": "Automation Scripts",
        "resource.6.copy": "Batch, checking, and generation tools for engineering efficiency.",
        "resource.7.type": "07 · AI",
        "resource.7.title": "LLM Workflows",
        "resource.7.copy": "Prompts, skills, agents, and automation collaboration rules.",
        "resource.8.type": "08 · Reference",
        "resource.8.title": "Engineering Library",
        "resource.8.copy": "Manuals, notes, reviews, and technical roadmaps.",
        "articles.title": "Articles",
        "article.1.title": "CODESYS MQTT Series",
        "article.1.copy": "Published tutorials cover server, client, broker, topic communication, and troubleshooting. Link to the CSDN category first.",
        "products.title": "Products",
        "product.1.copy": "An LLM synchronization and collaboration tool for CODESYS / SmartControl projects, connecting project mirrors, code context, rules, and automation workflows.",
        "contact.title": "Contact",
        "contact.heading": "Talk engineering efficiency.",
        "contact.lead": "For article collaboration, tool trials, engineering consulting, or AI automation solutions, contact me via WeChat, email, CSDN, or the official account.",
        "contact.wechat.label": "WeChat",
        "contact.official.label": "Official Account",
        "contact.email.label": "Email",
        "footer.copy": "AI automation architecture for automation engineers.",
        "search.empty": "No results. Try PLC, AI, CODESYS, MQTT, resources, or product."
      }
    };
// 全站搜索索引：覆盖文章、资源、产品和联系方式；后续接入真实站内内容时优先扩展这里。
    const searchIndex = [
      { title: { zh: "CODESYS MQTT 系列", en: "CODESYS MQTT Series" }, type: { zh: "文章", en: "Article" }, text: { zh: "服务器 客户端 Broker 主题通信 排障 CSDN", en: "server client broker topic troubleshooting CSDN" }, href: "#articles" },
      { title: { zh: "资源库", en: "Resources" }, type: { zh: "资源", en: "Resource" }, text: { zh: "源代码 库文件 标准 模板 MQTT 资料 脚本", en: "source code libraries standards templates MQTT scripts" }, href: "#works" },
      { title: { zh: "codesys-llm-synchronizer", en: "codesys-llm-synchronizer" }, type: { zh: "产品", en: "Product" }, text: { zh: "CODESYS SmartControl LLM 同步 工程镜像 工作流", en: "CODESYS SmartControl LLM sync project mirror workflow" }, href: "#products" },
      { title: { zh: "微信 PeaceAndBless", en: "WeChat PeaceAndBless" }, type: { zh: "联系", en: "Contact" }, text: { zh: "个人微信 二维码", en: "personal WeChat QR" }, href: "#contact" },
      { title: { zh: "邮箱 ben_peng0205@hotmail.com", en: "Email ben_peng0205@hotmail.com" }, type: { zh: "联系", en: "Contact" }, text: { zh: "合作咨询 工具试用", en: "collaboration consulting tool trial" }, href: "#contact" },
      { title: { zh: "微信公众号 ControlRookie", en: "Official Account ControlRookie" }, type: { zh: "联系", en: "Contact" }, text: { zh: "公众号 二维码", en: "official account QR" }, href: "#contact" },
      { title: { zh: "CSDN 技术博客", en: "CSDN Blog" }, type: { zh: "文章", en: "Article" }, text: { zh: "ControlRookie 技术博客 工程复盘", en: "ControlRookie blog engineering review" }, href: "#contact" }
    ];

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
      langToggle.textContent = lang === "zh" ? "EN" : "中";
      if (searchShell.classList.contains("open") || searchPanel.classList.contains("visible") || document.activeElement === searchInput) {
        renderSearch(searchInput.value);
      }
    }

// 搜索结果渲染：基于关键词匹配 searchIndex，生成 ForAI 风格的浮层结果卡片。
    function renderSearch(query) {
      const keyword = query.trim().toLowerCase();
      const matches = keyword
        ? searchIndex.filter(item => `${item.title.zh} ${item.title.en} ${item.type.zh} ${item.type.en} ${item.text.zh} ${item.text.en}`.toLowerCase().includes(keyword))
        : searchIndex.slice(0, 5);

      searchPanel.innerHTML = matches.length
        ? matches.map((item, index) => `<a class="search-result${index === 0 ? " active" : ""}" href="${item.href}"><strong>${item.title[currentLang]}</strong><span>${item.type[currentLang]} / ${item.text[currentLang]}</span></a>`).join("")
        : `<div class="search-empty">${translations[currentLang]["search.empty"]}</div>`;
      searchPanel.classList.add("visible");
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

// 语言按钮：中文与英文一键切换。
    langToggle.addEventListener("click", () => {
      applyLanguage(currentLang === "zh" ? "en" : "zh");
    });

// 点击搜索区域外：收起搜索框和结果面板。
    document.addEventListener("click", (event) => {
      if (!searchShell.contains(event.target) && !searchPanel.contains(event.target)) {
        searchShell.classList.remove("open");
        searchPanel.classList.remove("visible");
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

    applyLanguage("zh");
