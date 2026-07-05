import api from "./api";

export const createDesignation = (data) => {
  return api.post("/ctpl/designation/create", data);
};

export const getAllDesignation = () => {
  return api.post("/ctpl/designation/get-all",{});
};

export const getDesignationById = (designationId) => {
  return api.post("/ctpl/designation/get", designationId);
};

export const getDesignationInfo = () => {
  return api.post("/ctpl/designation/info");
};

export const updateDesignation = (data) => {
  return api.post("/ctpl/designation/update", data);
};

export const deleteDesignation = (designationId) => {
  return api.post("/ctpl/designation/delete", { designationId });
};
