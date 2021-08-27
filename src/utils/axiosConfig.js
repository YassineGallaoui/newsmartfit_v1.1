import axios from 'axios';

const env = process.env.NODE_ENV; // current environment
const port = process.env.PORT || 5000; // current environment

export const axios = axios.create({
  baseURL:
    env === 'production'
      ? 'https://newsmartfitv1.herokuapp.com:'+port // production
      : 'http://localhost:'+port, // development
});