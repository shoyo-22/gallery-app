import axios from 'axios';

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export default api;
