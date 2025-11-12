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
        name: "Косметический",
        scrollKey: "scrollToCosmetic",
        href: scrollFunctions.scrollToCosmetic,
        route: "/#cosmetic",
      },
      {
        name: "Капитальный",
        scrollKey: "scrollToCapital",
        href: scrollFunctions.scrollToCapital,
        route: "/#capital",
      },
      {
        name: "Дизайнерский",
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
