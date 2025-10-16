// src/pages/Auth/ResetPassword.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock, Building, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import leftImage from "../../assets/loginImage.png";
import Logo from "../../assets/logo.png";
import { authService } from "../../services/authService";

const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

export default function ResetPassword() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || "";
  const [pwd, setPwd] = useState("");
  const [cpwd, setCPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const valid = strongRegex.test(pwd);
  const match = pwd && cpwd && pwd === cpwd;

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!valid) {
      setMsg("Password does not meet security requirements.");
      return;
    }
    if (!match) {
      setMsg("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword({ email, newPassword: pwd });
      // Optional notify email is sent server-side
      navigate("/auth/login", {
        replace: true,
        state: { toast: "Password reset successfully. Please log in again." },
      });
    } catch {
      setMsg("Unable to reset password. Request a new code and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src={leftImage}
          alt="Attenzy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/30 to-transparent" />
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <img
            src={Logo}
            alt="Attenzy"
            className="h-10 w-10 rounded-md shadow"
          />
          <div>
            <div className="text-white text-xl font-semibold tracking-tight">
              Attenzy
            </div>
            <p className="text-white/80 text-xs">
              HR on Autopilot. Effortless attendance, zero delays.
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-6 sm:p-8">
          <div className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Reset Password
                </h1>
                <p className="text-sm text-gray-600">
                  Create a strong new password
                </p>
              </div>
            </div>

            <form className="space-y-5" onSubmit={submit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    className="w-full rounded-lg border border-gray-300 pr-10 pl-3 py-2.5 focus:ring-2 focus:ring-indigo-500"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPwd ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <ul className="mt-2 text-xs text-gray-600 space-y-1">
                  <li
                    className={`flex items-center gap-1 ${
                      pwd.length >= 8 ? "text-green-600" : ""
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> 8+ characters
                  </li>
                  <li
                    className={`flex items-center gap-1 ${
                      /[A-Z]/.test(pwd) ? "text-green-600" : ""
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> 1 uppercase, 1
                    lowercase
                  </li>
                  <li
                    className={`flex items-center gap-1 ${
                      /\d/.test(pwd) ? "text-green-600" : ""
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> 1 number
                  </li>
                  <li
                    className={`flex items-center gap-1 ${
                      /[^\w\s]/.test(pwd) ? "text-green-600" : ""
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> 1 special character
                  </li>
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm new password
                </label>
                <div className="relative">
                  <input
                    type={showCPwd ? "text" : "password"}
                    className="w-full rounded-lg border border-gray-300 pr-10 pl-3 py-2.5 focus:ring-2 focus:ring-indigo-500"
                    value={cpwd}
                    onChange={(e) => setCPwd(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCPwd((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showCPwd ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-medium disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update password"}
              </button>

              {msg && <p className="text-center text-xs text-red-600">{msg}</p>}

              <p className="text-center text-xs text-gray-500">
                Changed your mind?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/auth/login")}
                  className="text-indigo-600 hover:text-indigo-500 underline underline-offset-2"
                >
                  Back to Sign in
                </button>
              </p>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            HR on Autopilot. Effortless attendance, zero delays.
          </p>
        </div>
      </div>
    </div>
  );
}
