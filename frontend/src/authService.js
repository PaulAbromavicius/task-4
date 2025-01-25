import api from './axiosConfig';

// User Registration
export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

// User Login
export const login = async (userData) => {
    const response = await api.post('/auth/login', userData);
    // Save token to localStorage after successful login
    localStorage.setItem('token', response.data.token);
    return response.data;
};

// User Logout
export const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
};
