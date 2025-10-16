import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPasswordRequest from "./pages/Auth/ForgotPasswordRequest";
import VerifyOtp from "./pages/Auth/VerifyOtp";
import ResetPassword from "./pages/Auth/ResetPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route
          path="/auth/forgot-password"
          element={<ForgotPasswordRequest />}
        />
        <Route path="/auth/verify-otp" element={<VerifyOtp />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
