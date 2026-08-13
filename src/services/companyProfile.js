import api from "./api";

export const uploadSignature = (formData) =>
  api.post("/ctpl/payroll/stamp/signature/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const uploadSeal = (formData) =>
  api.post("/ctpl/payroll/stamp/seal/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getStampInfo = () => api.get("/ctpl/payroll/stamp/info");

export const getSignaturePreviewUrl = () =>
  `${import.meta.env.VITE_API_URL}/ctpl/payroll/stamp/signature/preview`;

export const getSealPreviewUrl = () =>
  `${import.meta.env.VITE_API_URL}/ctpl/payroll/stamp/seal/preview`;