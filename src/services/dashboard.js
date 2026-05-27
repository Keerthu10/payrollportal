import api from "./Api";

export const getDashboardStats = () => api.post("/ctpl/dashboard-stats");