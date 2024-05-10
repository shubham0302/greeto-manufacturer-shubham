import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://b248-2401-4900-1f3e-8fff-00-222-d61d.ngrok-free.app",
  // baseURL: "http://localhost:5010",
  baseURL: "https://backend.greetogifts.com",
  timeout: 60 * 1000,
  maxRedirects: 0,
  withCredentials: true,
});

export default axiosInstance;
