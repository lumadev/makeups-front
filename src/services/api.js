import axios from "axios";

const api = axios.create({
  baseURL: "https://makeups-back.onrender.com",
  withCredentials: true
});

export { api }