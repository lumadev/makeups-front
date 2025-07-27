import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

// add interceptor to check token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.data.message === "Token não fornecido.")
    ) {
      window.location.href = "/login"; // redireciona para login
    }
    return Promise.reject(error);
  }
);


export { api }