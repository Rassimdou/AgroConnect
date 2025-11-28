// Route configuration for AgroConnect DZ
export const ROUTES = {
  HOME: 'home',
  USER_SELECTION: 'user-selection',
  BUYER_DASHBOARD: 'buyer-dashboard',
  BUYER_MARKETPLACE: 'buyer-marketplace',
  BUYER_PRODUCT_DETAIL: 'buyer-product-detail',
  BUYER_CART: 'buyer-cart',
  BUYER_ORDERS: 'buyer-orders',
  BUYER_PROFILE: 'buyer-profile',
  FARMER_SIGNIN: 'farmer-signin',
  FARMER_SIGNUP: 'farmer-signup',
  FARMER_DASHBOARD: 'farmer-dashboard',
  FARMER_MARKETPLACE: 'farmer-marketplace',
  FARMER_ADD_PRODUCT: 'farmer-add-product',
  FARMER_MY_PRODUCTS: 'farmer-my-products',
  FARMER_ORDERS: 'farmer-orders',
  FARMER_PROFILE: 'farmer-profile',
  TRANSPORTER_SIGNUP: 'transporter-signup',
  TRANSPORTER_AVAILABLE_JOBS: 'transporter-available-jobs',
  TRANSPORTER_MY_DELIVERIES: 'transporter-my-deliveries',
  TRANSPORTER_PROFILE: 'transporter-profile'
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
  [ROUTES.BUYER_PROFILE]: () => import('./components/buyer/Profile'),
  [ROUTES.FARMER_SIGNIN]: () => import('./components/farmer/FarmerSignin'),
  [ROUTES.FARMER_SIGNUP]: () => import('./components/farmer/FarmerSignup'),
  [ROUTES.FARMER_DASHBOARD]: () => import('./components/farmer/Dashboard'),
  [ROUTES.FARMER_MARKETPLACE]: () => import('./components/farmer/Marketplace'),
  [ROUTES.FARMER_ADD_PRODUCT]: () => import('./components/farmer/AddProduct'),
  [ROUTES.FARMER_MY_PRODUCTS]: () => import('./components/farmer/MyProducts'),
  [ROUTES.FARMER_ORDERS]: () => import('./components/farmer/Orders'),
  [ROUTES.FARMER_PROFILE]: () => import('./components/farmer/Profile'),
  [ROUTES.TRANSPORTER_SIGNUP]: () => import('./components/transporter/TransporterSignup'),
  [ROUTES.TRANSPORTER_AVAILABLE_JOBS]: () => import('./components/transporter/AvailableJobs'),
  [ROUTES.TRANSPORTER_MY_DELIVERIES]: () => import('./components/transporter/MyDeliveries'),
  [ROUTES.TRANSPORTER_PROFILE]: () => import('./components/transporter/Profile')
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
  producer: ROUTES.FARMER_SIGNIN,
  buyer: ROUTES.BUYER_DASHBOARD,
  transporter: ROUTES.TRANSPORTER_DASHBOARD
};