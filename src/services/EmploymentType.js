import api from "./api";

export const createEmploymentType = (data) => {
  return api.post("/ctpl/job-type/create", data);
};

export const getAllEmploymentTypes = () => {
  return api.post("/ctpl/job-type/get-all", {});
};

export const getEmploymentTypeById = (jobTypeId) => {
  return api.post("/ctpl/job-type/get", { jobTypeId });
};

export const getEmploymentTypeInfo = (data) => {
  return api.post("/ctpl/job-type/info", data);
};

export const updateEmploymentType = (data) => {
  return api.post("/ctpl/job-type/update", data);
};

export const deleteEmploymentType = (jobTypeId) => {
  return api.post("/ctpl/job-type/delete", { jobTypeId });
};
