import axios from 'axios';

// connect to the local development API server
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export default api;
