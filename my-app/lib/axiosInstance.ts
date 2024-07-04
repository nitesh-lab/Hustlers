import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://hustler-backend.onrender.com/",
  });