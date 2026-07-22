import api from "./api";

export const getEmployees = (payload) => {
  return api.post("/ctpl/employee/getall", payload);
};

export const addEmployee = (data) => {
  return api.post("/ctpl/employee/add", data);
};

export const updateEmployee = (id, payload) => {
  return api.post(`/ctpl/employee/update/${id}`, payload);
};

export const resendVerificationEmail = (data) => {
  return api.post("/ctpl/employee/resend-verification", data);
};

export const getEmployeeById = (id) => {
  return api.post(`/ctpl/employee/getbyid/${id}`);
};

export const downloadEmployeeTemplate = () => {
  return api.post(
    "/ctpl/employee/bulk-template",
    {},
    {
      responseType: "blob",
    },
  );
};

export const getNextEmployeeId = () => {
  return api.post("/ctpl/employee/next-employee-id");
};

export const deleteEmployee = (id) => {
  return api.post(`/ctpl/employee/toggle-status/${id}`);
};

export const bulkUploadEmployees = (formData) => {
  return api.post("/ctpl/employee/bulk-upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getEmployeeHistory = (payload) => {
  console.log("Service Payload:", payload);
  return api.post("/ctpl/payroll/employee-history", payload);
};
