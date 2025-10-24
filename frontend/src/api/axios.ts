import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Nest backend
  withCredentials: true, // send cookies (access & refresh tokens)
});

export default api;
