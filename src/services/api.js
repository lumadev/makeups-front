import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

// add interceptor to check token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message

    const tokenNotProvided = message === "Token não fornecido.";
    const tokenInvalidOrExpired = message === "Token inválido ou expirado.";
    const is401Status = error?.response?.status === 401

    if (
      error.response &&
      (is401Status || tokenNotProvided || tokenInvalidOrExpired)
    ) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);


export { api }