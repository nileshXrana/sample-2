import axios from 'axios';
import { loginFormData, signupFormData } from '@/features/user/user.type';

axios.defaults.withCredentials = true;

export const login = async (user: loginFormData) => {
    try {
        const response = await axios.post('http://localhost:8000/auth/login', {
            email: user.email,
            password: user.password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (user: signupFormData) => {
    try {
        const response = await axios.post('http://localhost:8000/auth/register', {
            email: user.email,
            name: user.name,
            password: user.password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post('http://localhost:8000/auth/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
};

