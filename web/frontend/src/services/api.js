import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true, // keep true so cookies sent even via proxy
});
// This interceptor automatically handles unauthorized errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Just remove the user from app state — no redirect, no reload
      // Optional: emit an event or call a logout function
      console.warn("401 Unauthorized — session expired.");
    }
    return Promise.reject(error);
  }
);

// Authentication API functions
export const authAPI = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register/user', {
        fullname: userData.fullName,
        email: userData.email,
        password: userData.password,
        phone_number: userData.phone
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Register a new producer
  registerProducer: async (producerData) => {
    try {
      const response = await api.post('/auth/register/producer', {
        fullname: producerData.fullName,
        email: producerData.email,
        password: producerData.password,
        phone_number: producerData.phone,
        location: producerData.location,
        domain: producerData.domain
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Verify OTP
  verifyOTP: async (otpData) => {
    try {
      const response = await api.post('/auth/verify/otp', {
        user_id: otpData.userId,
        user_fullname: otpData.fullName,
        user_role: otpData.role,
        otp: otpData.otp
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Login (to be implemented when backend provides endpoint)
  login: async (credentials) => {
    // Placeholder for login endpoint when available
    throw new Error('Login endpoint not yet implemented');
  }
};

// Product API functions
export const productAPI = {
  // Get all products for marketplace (public)
  getAllProducts: async () => {
    try {
      const response = await api.get('/market/all-products');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get products for current producer (authenticated)
  getProducerProducts: async () => {
    try {
      const response = await api.get('/market/Getproduct');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get product by ID
  getProductById: async (productId) => {
    try {
      const response = await api.get(`/market/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new product
  createProduct: async (productData) => {
    try {
      const response = await api.post('/market/createProduct', productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update product
  updateProduct: async (productId, productData) => {
    try {
      const response = await api.put(`/market/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    try {
      const response = await api.delete(`/market/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// User API functions
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile/user');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile/user', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user orders
  getOrders: async () => {
    try {
      const response = await api.get('/orders/user');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Farmer API functions
export const farmerAPI = {
  // Get farmer profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile/producer');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update farmer profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile/producer', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get farmer orders (if endpoint exists)
  getOrders: async () => {
    try {
      const response = await api.get('/orders/producer');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Chat API functions (for Socket.IO integration)
export const chatAPI = {
  // Initialize Socket.IO connection
  initializeSocket: (userId, userType) => {
    // This will be implemented when integrating Socket.IO on frontend
    return null;
  },

  // Join conversation
  joinConversation: (socket, targetId, targetType) => {
    if (socket) {
      socket.emit('join_conversation', { targetId, targetType });
    }
  },

  // Send message
  sendMessage: (socket, content) => {
    if (socket) {
      socket.emit('sendMessage', { content });
    }
  }
};

export default api;