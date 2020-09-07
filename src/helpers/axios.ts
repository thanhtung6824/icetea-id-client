import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
});

instance.interceptors.request.use(config => {
    if (config.url !== config.baseURL + '/oauth/me') {
        config.headers.authorization = localStorage.getItem('credentials');
    }
    return config;
});

export default instance;
