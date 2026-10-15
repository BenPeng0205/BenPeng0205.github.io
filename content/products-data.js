// 官网受控发布接口生成的产品目录。
window.CONTROLROOKIE_MANAGED_PRODUCTS = [
  {
    "id": "cr-st-expert",
    "contentId": "cr-st-expert",
    "type": {
      "zh": "产品",
      "en": "Product"
    },
    "title": {
      "zh": "ST Expert",
      "en": "ST Expert"
    },
    "copy": {
      "zh": "一本给 AI 看的企业级 ST 标准化编程规范手册。",
      "en": "Engineering standards for AI-assisted Structured Text programming."
    },
    "href": "products/cr-st-expert/index.html",
    "version": "V1.0",
    "cardPills": {
      "zh": [
        "开源技能",
        "GitHub",
        "完整介绍"
      ],
      "en": [
        "Open-source skill",
        "GitHub",
        "Full introduction"
      ]
    },
    "status": {
      "zh": "开源",
      "en": "Open source"
    },
    "access": {
      "zh": "GitHub",
      "en": "GitHub"
    },
    "pain": {
      "zh": "一本给 AI 看的企业级 ST 标准化编程规范手册。",
      "en": "Engineering standards for AI-assisted Structured Text programming."
    },
    "capabilities": {
      "zh": [],
      "en": []
    },
    "workflow": {
      "zh": [],
      "en": []
    },
    "delivery": {
      "zh": "具体交付范围以产品说明为准。",
      "en": "Delivery scope follows the product specification."
    },
    "cover": "assets/products/cr-st-expert/cover-cr-st-expert.png",
    "cardCoverFocus": "right-detail",
    "aliases": "",
    "keywords": "ST Expert CODESYS ST AI cr-st-expert",
    "publishAt": "2026-10-13T19:08:00+08:00"
  },
  {
    "id": "cr-st-graph",
    "contentId": "cr-st-graph",
    "type": {
      "zh": "产品",
      "en": "Product"
    },
    "title": {
      "zh": "ST Graph",
      "en": "ST Graph"
    },
    "copy": {
      "zh": "一张给 AI 看的 CODESYS 工程代码图谱。",
      "en": "A CODESYS code graph for AI-assisted engineering."
    },
    "href": "products/cr-st-graph/index.html",
    "version": "V1.0",
    "cardPills": {
      "zh": [
        "开源技能",
        "GitHub",
        "完整介绍"
      ],
      "en": [
        "Open-source skill",
        "GitHub",
        "Full introduction"
      ]
    },
    "status": {
      "zh": "开源",
      "en": "Open source"
    },
    "access": {
      "zh": "GitHub",
      "en": "GitHub"
    },
    "pain": {
      "zh": "一张给 AI 看的 CODESYS 工程代码图谱。",
      "en": "A CODESYS code graph for AI-assisted engineering."
    },
    "capabilities": {
      "zh": [],
      "en": []
    },
    "workflow": {
      "zh": [],
      "en": []
    },
    "delivery": {
      "zh": "具体交付范围以产品说明为准。",
      "en": "Delivery scope follows the product specification."
    },
    "cover": "assets/products/cr-st-graph/cover-cr-st-graph.png",
    "cardCoverFocus": "right",
    "aliases": "",
    "keywords": "ST Graph CODESYS ST AI cr-st-graph",
    "publishAt": "2026-10-13T19:08:00+08:00"
  },
  {
    "id": "syncbridge",
    "contentId": "syncbridge",
    "type": {
      "zh": "产品",
      "en": "Product"
    },
    "title": {
      "zh": "SyncBridge",
      "en": "SyncBridge"
    },
    "copy": {
      "zh": "工程可读，差异可见，写回可控。",
      "en": "Readable projects, visible differences, controlled write-back."
    },
    "href": "products/syncbridge/index.html",
    "version": "V1.4.1",
    "cardPills": {
      "zh": [
        "V1.4.1",
        "工程同步",
        "差异审查"
      ],
      "en": [
        "V1.4.1",
        "Project sync",
        "Diff review"
      ]
    },
    "status": {
      "zh": "正式发布",
      "en": "Released"
    },
    "access": {
      "zh": "联系开发者",
      "en": "Contact developer"
    },
    "pain": {
      "zh": "工程可读，差异可见，写回可控。",
      "en": "Readable projects, visible differences, controlled write-back."
    },
    "capabilities": {
      "zh": [],
      "en": []
    },
    "workflow": {
      "zh": [],
      "en": []
    },
    "delivery": {
      "zh": "具体交付范围以产品说明为准。",
      "en": "Delivery scope follows the product specification."
    },
    "cover": "",
    "cardCoverFocus": "center",
    "aliases": "",
    "keywords": "SyncBridge CODESYS ST AI syncbridge",
    "publishAt": "2026-10-04T00:00:00+08:00"
  }
];
if (window.CONTROLROOKIE_SITE_DATA) {
  const managedIds = new Set(window.CONTROLROOKIE_MANAGED_PRODUCTS.map((item) => item.id));
  const existingProducts = window.CONTROLROOKIE_SITE_DATA.products;
  const existingIds = new Set(existingProducts.map((item) => item.id));
  window.CONTROLROOKIE_SITE_DATA.products = [
    ...existingProducts.map((item) => {
      const managed = window.CONTROLROOKIE_MANAGED_PRODUCTS.find((entry) => entry.id === item.id);
      return managed ? {...item, introductionHref: managed.href} : item;
    }),
    ...window.CONTROLROOKIE_MANAGED_PRODUCTS.filter((item) => !existingIds.has(item.id)),
  ];
}
