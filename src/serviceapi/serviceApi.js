import http from "../api";

const getActivityGroup = () => {
  return http.get("/activity-groups?email=as@io.com");
};

const getDetailActivityGroup = (id) => {
  return http.get(`/activity-groups/${id}`);
};

const getAllTodo = () => {
  return http.get("/todo-items");
};

const getdetail = (id) => {
  return http.get(`/todo-items/${id}`);
};

const createActivityGroup = (data) => {
  return http.post("/activity-groups", data);
};

const createToDo = (data) => {
  return http.post("/todo-items", data);
};

const update = (id, data) => {
  return http.put(`/todo-items/${id}`, data);
};

const deleteActivitygroup = (id) => {
  return http.delete(`/activity-groups/${id}`);
};
const deleteActivity = (id) => {
  return http.delete(`/todo-items/${id}`);
};

const removeAll = () => {
  return http.delete(`/activity-groups`);
};

const findByTitle = (title) => {
  return http.get(`/tutorials?title=${title}`);
};

const Service = {
  getActivityGroup,
  getDetailActivityGroup,
  getdetail,
  createActivityGroup,
  update,
  getAllTodo,
  createToDo,
  deleteActivitygroup,
  removeAll,
  deleteActivity,
  findByTitle,
};

export default Service;
