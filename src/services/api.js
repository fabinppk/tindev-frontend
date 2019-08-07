import axios from "axios";

const dev = process.env.REACT_APP_NODE_ENV || 'development';

console.log(process.env.REACT_APP_NODE_ENV, process.env.NODE_ENV);

const baseURL = dev === 'production'? "https://tindev-backend.herokuapp.com" : "http://localhost:3333";

const api = axios.create({
  baseURL: baseURL
});

export default api;
