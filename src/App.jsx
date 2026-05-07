import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}