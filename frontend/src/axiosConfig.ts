import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', // URL base do seu servidor Django
});

export default axiosInstance;
