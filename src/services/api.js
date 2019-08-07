import axios from "axios";

const dev = process.env.REACT_APP_NODE_ENV || 'development';

const baseURL = dev === 'production'? "https://tindev-backend.herokuapp.com" : "http://localhost:3333";

console.log(baseURL)

const api = axios.create({
  baseURL: baseURL
});

export default api;
