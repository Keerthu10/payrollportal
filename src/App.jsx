import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/login";
import ForgotPassword from "./sections/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import AdminLayout from "./layouts/AdminLayout";
import RunPayroll from "./pages/RunPayroll";
import Payroll from "./pages/PayRoll";

const App = () => {
  return (
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
        <Route path="/payroll" element={<Payroll />}/>
      </Route>
    </Routes>
  );
};

export default App;
