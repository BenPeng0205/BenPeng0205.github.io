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
    "aliases": "",
    "keywords": "ST Graph CODESYS ST AI cr-st-graph",
    "publishAt": "2026-10-13T19:08:00+08:00"
  }
];
if (window.CONTROLROOKIE_SITE_DATA) {
  const managedIds = new Set(window.CONTROLROOKIE_MANAGED_PRODUCTS.map((item) => item.id));
  window.CONTROLROOKIE_SITE_DATA.products = [
    ...window.CONTROLROOKIE_SITE_DATA.products.filter((item) => !managedIds.has(item.id)),
    ...window.CONTROLROOKIE_MANAGED_PRODUCTS,
  ];
}
