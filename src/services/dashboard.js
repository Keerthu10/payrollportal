import api from "./api";

export const getDashboardStats = () => api.post("/ctpl/dashboard-stats");