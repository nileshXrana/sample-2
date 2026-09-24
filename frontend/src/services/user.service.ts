import axios from 'axios';

axios.defaults.withCredentials = true;

export const getUser = async () => {
    try {
        const response = await axios.get('http://localhost:8000/auth/user');
        return response.data;
    } catch (error) {
        throw error;
    }
};

