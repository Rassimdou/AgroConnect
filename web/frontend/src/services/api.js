import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // Crucial for sending the 'token' cookie
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {

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

export default api;