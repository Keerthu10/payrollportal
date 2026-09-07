import api from "./api";

export const downloadPayrollTemplate = () =>
  api.post(
    "/ctpl/payroll/template",
    {},
    {
      responseType: "blob",
      params: { includeUnverified: true },
    },
  );

export const generatePayrollEmails = (data) =>
  api.post("/ctpl/payroll/submit", data);

export const getEmployeeHistory = (data) =>
  api.post("/ctpl/payroll/employee-history", data);

export const downloadPayslip = (employeePayrollId) =>
  api.get(`/ctpl/payroll/payslip/download/${employeePayrollId}`, {
    responseType: "blob",
  });

export const viewPayslip = (id) =>
  api.get(`/ctpl/payroll/payslip/view/${id}`, {
    responseType: "blob",
  });

export const exportPayslipReport = (data) =>
  api.post("/ctpl/payroll/export", data, {
    responseType: "blob",
  });

export const bulkDownloadPayslips = (data) =>
  api.post("/ctpl/payroll/payslip/bulk-download", data, {
    responseType: "blob",
  });

export const getPayslipDetail = (id) => {
  return api.post(`/ctpl/payroll/payslip/${id}/detail`);
};

export const editPayslip = (id, payload) => {
  return api.post(`/ctpl/payroll/payslip/${id}/edit`, payload);
};
