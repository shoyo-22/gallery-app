import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.unsplash.com',
});

export const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

export default api;
