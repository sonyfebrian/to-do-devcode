import http from "../api";

const getActivityGroup = () => {
  return http.get("/activity-groups?email=as@io.com");
};

const getDetailActivityGroup = (id) => {
  return http.get(`/activity-groups/${id}`);
};

const getdetail = (id) => {
  return http.get(`/todo-items/${id}`);
};

const createActivityGroup = (data) => {
  return http.post("/activity-groups", data);
};

const update = (id, data) => {
  return http.put(`/todo-items/${id}`, data);
};

const deleteActivitygroup = (id) => {
  return http.delete(`/activity-groups/${id}`);
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
  deleteActivitygroup,
  removeAll,
  findByTitle,
};

export default Service;
