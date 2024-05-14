import axios from 'axios';

export const baseInstance = axios.create({
  // baseURL: 'http://localhost:4040/api',
  baseURL: 'https://api.irynaprudko.com.ua/api',
});
