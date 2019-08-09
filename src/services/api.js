import axios from 'axios';
import domain from '../utils/settings';

const api = axios.create({
    baseURL: domain
});

export default api;
