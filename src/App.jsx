import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import AdminLayout from "./layouts/AdminLayout";
import GlobalLoader from "./ui/GlobalLoader";
import { useLoader } from "./context/LoaderContext";

// Lazy-loaded routes for performance & modular bundle splitting
const LoginPage = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./sections/ForgotPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const RunPayroll = lazy(() => import("./pages/RunPayroll"));
const Payroll = lazy(() => import("./pages/Payroll"));
const Employees = lazy(() => import("./pages/Employees"));
const Masters = lazy(() => import("./pages/Masters"));
const Payslips = lazy(() => import("./pages/Payslips"));

const App = () => {
  const { loading } = useLoader();

  return (
    <>
      <GlobalLoader open={loading} />
      <Suspense fallback={<GlobalLoader open={true} />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/run-payroll" element={<RunPayroll />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/masters" element={<Masters />} />
            <Route path="/payslips" element={<Payslips />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
