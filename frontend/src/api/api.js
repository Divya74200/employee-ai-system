import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-ai-system-r7sb.onrender.com/api",
});

export default API;