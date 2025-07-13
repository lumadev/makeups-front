import { api } from "./api";

const listMakeups = () => {
  return api.get('/makeups');
};

const saveMakeup = (data) => {
  return api.post('/makeups', data);
};

const editMakeup = (id, data) => {
  return api.put(`/makeups/${id}`, data);
};

export { listMakeups, saveMakeup, editMakeup }