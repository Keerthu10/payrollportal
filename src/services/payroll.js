import api from "./api";

export const downloadPayrollTemplate = () =>
  api.post(
    "/ctpl/payroll/template",
    {},
    {
      responseType: "blob",
    },
  );

export const generatePayrollEmails = (data)=>api.post("/ctpl/payroll/submit",data);