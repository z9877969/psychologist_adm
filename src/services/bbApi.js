import axios from 'axios';

export const bbInstance = axios.create({
  // baseURL: 'http://localhost:4040/api',
  baseURL: 'https://api.brushbuddy.com.ua/api',
});
