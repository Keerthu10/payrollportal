import api from "./api";

export const loginUser = (data) => api.post("/ctpl/auth/login", data);

export const forgotPassword = (data) => api.post("/ctpl/auth/forgot-password", data);

export const verifyOtp = (data) => api.post("/ctpl/auth/verify-otp", data);

export const resetPassword = (data) =>
  api.post("/ctpl/auth/reset-password", data);
