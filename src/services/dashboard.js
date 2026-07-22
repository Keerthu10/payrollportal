import api from "./api";

export const getDashboardStats = (month, year) =>
  api.post("/ctpl/dashboard-stats", { month, year });

export const getDashboardEmployeeStats = (month, year) => {
  return api.post("/ctpl/dashboard-employee-stats", { month, year });
};
