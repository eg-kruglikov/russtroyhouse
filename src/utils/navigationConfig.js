export const NAV_GOALS_MAP = {
  Главная: "nav_hero_click",
  "Калькулятор ремонта": "nav_calculator_click",
  Ремонты: "nav_repairs_click",
  Косметический: "nav_cosmetic_click",
  Капитальный: "nav_capital_click",
  Дизайнерский: "nav_designer_click",
  "Чистовая/черновая отделка": "nav_whitebox_click",
  Вайтбокс: "nav_whitebox_click", // для обратной совместимости
  "Наши последние работы": "nav_portfolio_click",
  Отзывы: "nav_reviews_click",
  "Больше наших работ": "nav_more_works_click",
  "Дизайн проекты": "nav_design_click",
  "← На главную": "nav_back_to_home_click",
  Старт: "nav_hero_click",
  "Цены и услуги": "nav_services_click",
  "Почему мы?": "nav_about_click",
};

export const createMenuItems = (scrollFunctions = {}) => [
  {
    name: "Главная",
    scrollKey: "scrollToHero",
    href: scrollFunctions.scrollToHero,
    route: "/",
    type: "link",
  },
  {
    name: "Калькулятор ремонта",
    scrollKey: "scrollToCalculator",
    href: scrollFunctions.scrollToCalculator,
    route: "/#calculator",
    type: "link",
  },
  {
    name: "Ремонты",
    type: "submenu",
    scrollKey: "scrollToNashiUslugi",
    href: scrollFunctions.scrollToNashiUslugi,
    route: "/#nashi-uslugi",
    submenu: [
      {
        name: "Косметический ремонт",
        scrollKey: "scrollToCosmetic",
        href: scrollFunctions.scrollToCosmetic,
        route: "/#cosmetic",
      },
      {
        name: "Капитальный ремонт",
        scrollKey: "scrollToCapital",
        href: scrollFunctions.scrollToCapital,
        route: "/#capital",
      },
      {
        name: "Дизайнерский ремонт",
        scrollKey: "scrollToDesigner",
        href: scrollFunctions.scrollToDesigner,
        route: "/#designer",
      },
      {
        name: "Чистовая/черновая отделка",
        scrollKey: "scrollToWhitebox",
        href: scrollFunctions.scrollToWhitebox,
        route: "/#whitebox",
      },
    ],
  },
  {
    name: "Наши последние работы",
    scrollKey: "scrollToportfolio",
    href: scrollFunctions.scrollToportfolio,
    route: "/#portfolio",
    type: "link",
  },
  {
    name: "Отзывы",
    scrollKey: "scrollToReviews",
    href: scrollFunctions.scrollToReviews,
    route: "/#reviews",
    type: "link",
  },
  {
    name: "Дизайн проекты",
    scrollKey: "scrollToDesignProjects",
    href: scrollFunctions.scrollToDesignProjects,
    route: "/#design-projects",
    type: "link",
  },
];

// Маппинг путей к названиям пунктов меню для скрытия
const REPAIR_PATH_TO_NAME_MAP = {
  "/repair/cosmetic": "Косметический ремонт",
  "/repair/capital": "Капитальный ремонт",
  "/repair/designer": "Дизайнерский ремонт",
  "/repair/whitebox": "Чистовая/черновая отделка",
};

// Маппинг названий пунктов ремонта на пути страниц
const REPAIR_NAME_TO_PATH_MAP = {
  "Косметический ремонт": "/repair/cosmetic",
  "Капитальный ремонт": "/repair/capital",
  "Дизайнерский ремонт": "/repair/designer",
  "Чистовая/черновая отделка": "/repair/whitebox",
};

/**
 * Фильтрует пункты меню, скрывая соответствующий пункт ремонта, если мы находимся на его странице
 * @param {Array} items - массив пунктов меню
 * @param {string} currentPath - текущий путь (location.pathname)
 * @returns {Array} - отфильтрованный массив пунктов меню
 */
export const filterMenuItemsByCurrentRepair = (items, currentPath) => {
  const currentRepairType = REPAIR_PATH_TO_NAME_MAP[currentPath];

  if (!currentRepairType) {
    return items;
  }

  return items.map((item) => {
    if (item.type === "submenu" && item.submenu) {
      return {
        ...item,
        submenu: item.submenu.filter(
          (subItem) => subItem.name !== currentRepairType
        ),
      };
    }
    return item;
  });
};

/**
 * Создает меню для страниц ремонта с нужным порядком пунктов
 * @param {string} currentPath - текущий путь (location.pathname)
 * @returns {Array} - массив пунктов меню в нужном порядке
 */
export const createRepairPageMenuItems = (currentPath) => {
  const currentRepairType = REPAIR_PATH_TO_NAME_MAP[currentPath];

  // Получаем все пункты ремонта и фильтруем текущий
  const repairItems =
    createMenuItems({}).find((item) => item.type === "submenu")?.submenu || [];
  const filteredRepairItems = currentRepairType
    ? repairItems.filter((item) => item.name !== currentRepairType)
    : repairItems;

  // Преобразуем пункты ремонта: меняем route на прямые ссылки на страницы
  const repairItemsWithRoutes = filteredRepairItems.map((item) => {
    const { scrollKey, ...itemWithoutScrollKey } = item;
    return {
      ...itemWithoutScrollKey,
      route: REPAIR_NAME_TO_PATH_MAP[item.name] || item.route,
    };
  });

  return [
    {
      name: "Старт",
      scrollKey: "scrollToHero",
      route: "/#hero",
      type: "link",
    },
    {
      name: "Калькулятор ремонта",
      scrollKey: "scrollToCalculator",
      route: "/#calculator",
      type: "link",
    },
    {
      name: "Цены и услуги",
      scrollKey: "scrollToServices",
      route: "/#nashi-uslugi",
      type: "link",
    },
    {
      name: "Почему мы?",
      scrollKey: "scrollToAbout",
      route: "/#about",
      type: "link",
    },
    {
      name: "Наши последние работы",
      scrollKey: "scrollToportfolio",
      route: "/#portfolio",
      type: "link",
    },
    {
      name: "Отзывы",
      scrollKey: "scrollToReviews",
      route: "/#reviews",
      type: "link",
    },
    {
      name: "separator",
      type: "separator",
    },
    {
      name: "← На главную",
      route: "/",
      type: "link",
    },
    ...repairItemsWithRoutes,
  ];
};
