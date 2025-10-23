// Navigation route mappings
export const DASHBOARD_ROUTES = {
  DASHBOARD: '/dashboard',
  BLOG: '/dashboard/content/blog',
  PROMOTION: '/dashboard/content/promotion',
  PRODUCT: '/dashboard/content/product',
} as const;

// Menu key to route mapping
export const MENU_KEY_TO_ROUTE: Record<string, string> = {
  '1': DASHBOARD_ROUTES.DASHBOARD,
  '2-1': DASHBOARD_ROUTES.BLOG,
  '2-2': DASHBOARD_ROUTES.PROMOTION,
  '2-3': DASHBOARD_ROUTES.PRODUCT,
};

// Get route from menu key
export const getRouteFromMenuKey = (key: string): string | undefined => {
  return MENU_KEY_TO_ROUTE[key];
};

// Get menu key from pathname
export const getMenuKeyFromPathname = (pathname: string): string[] => {
  if (pathname === DASHBOARD_ROUTES.DASHBOARD) return ['1'];
  if (pathname.includes(DASHBOARD_ROUTES.BLOG)) return ['2-1'];
  if (pathname.includes(DASHBOARD_ROUTES.PROMOTION)) return ['2-2'];
  if (pathname.includes(DASHBOARD_ROUTES.PRODUCT)) return ['2-3'];
  return ['1'];
};
