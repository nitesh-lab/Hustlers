import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://hustlers.onrender.com/',
  });