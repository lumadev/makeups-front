import { api } from "./api";

const login = (formData) => {
  return api.post("/auth/login", formData);
};

export { login }