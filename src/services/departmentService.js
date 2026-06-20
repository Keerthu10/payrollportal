import api from "./api";

export const createDepartment = (data) => {
  return api.post("/ctpl/department/create", data);
};

export const getAllDepartments = () => {
  return api.post("/ctpl/department/get-all");
};

export const getDepartmentById = (id) => {
  return api.post(`/ctpl/department/get/${id}`);
};

export const getDepartmentInfo = () => {
  return api.post("/ctpl/department/info");
};

export const updateDepartment = (data) => {
  return api.post("/ctpl/department/update", data);
};

export const deleteDepartment = (id) => {
  return api.post(`/ctpl/department/delete/${id}`);
};
