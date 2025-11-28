// Route configuration for AgroConnect DZ
export const ROUTES = {
  HOME: 'home',
  USER_SELECTION: 'user-selection',
  BUYER_DASHBOARD: 'buyer-dashboard',
  BUYER_MARKETPLACE: 'buyer-marketplace',
  BUYER_PRODUCT_DETAIL: 'buyer-product-detail',
  BUYER_CART: 'buyer-cart',
  BUYER_ORDERS: 'buyer-orders',
  BUYER_PROFILE: 'buyer-profile'
};

// Route components mapping
export const ROUTE_COMPONENTS = {
  [ROUTES.HOME]: null, // Handled specially in App.jsx
  [ROUTES.USER_SELECTION]: null, // Handled specially in App.jsx
  [ROUTES.BUYER_DASHBOARD]: () => import('./components/buyer/Dashboard'),
  [ROUTES.BUYER_MARKETPLACE]: () => import('./components/buyer/Marketplace'),
  [ROUTES.BUYER_PRODUCT_DETAIL]: () => import('./components/buyer/ProductDetail'),
  [ROUTES.BUYER_CART]: () => import('./components/buyer/Cart'),
  [ROUTES.BUYER_ORDERS]: () => import('./components/buyer/MyOrders'),
  [ROUTES.BUYER_PROFILE]: () => import('./components/buyer/Profile')
};

// Navigation helpers
export const navigateTo = (route, params = {}) => {
  return {
    route,
    params
  };
};

// User type to route mapping
export const USER_TYPE_ROUTES = {
  producer: ROUTES.BUYER_DASHBOARD, // For now, all types go to buyer dashboard
  buyer: ROUTES.BUYER_DASHBOARD,
  transporter: ROUTES.BUYER_DASHBOARD
};