import http from "../api";

const getAll = () => {
  return http.get("/todo-items");
};

const get = (id) => {
  return http.get(`/todo-items/${id}`);
};

const create = (data) => {
  return http.post("/todo-items", data);
};

const update = (id, data) => {
  return http.put(`/todo-items/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/todo-items/${id}`);
};

const removeAll = () => {
  return http.delete(`/todo-items`);
};

const findByTitle = (title) => {
  return http.get(`/tutorials?title=${title}`);
};

const Service = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default Service;
