import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import ForgotPassword from "./sections/ForgotPassword";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
  );
}
