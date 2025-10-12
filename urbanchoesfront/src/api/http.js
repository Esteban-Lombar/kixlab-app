import axios from "axios";
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api",
});
http.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("us_token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});
