import axios from "axios";

const dev = process.env.NODE_ENV !== 'production';

const baseURL = dev === 'production'? "https://tindev-backend.herokuapp.com" : "http://localhost:3333";

const api = axios.create({
  baseURL: baseURL
});

export default api;
