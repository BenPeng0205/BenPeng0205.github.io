// 官网受控发布接口生成的产品目录。
window.CONTROLROOKIE_MANAGED_PRODUCTS = [];
if (window.CONTROLROOKIE_SITE_DATA) {
  const managedIds = new Set(window.CONTROLROOKIE_MANAGED_PRODUCTS.map((item) => item.id));
  window.CONTROLROOKIE_SITE_DATA.products = [
    ...window.CONTROLROOKIE_SITE_DATA.products.filter((item) => !managedIds.has(item.id)),
    ...window.CONTROLROOKIE_MANAGED_PRODUCTS,
  ];
}
