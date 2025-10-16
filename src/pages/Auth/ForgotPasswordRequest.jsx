// src/pages/Auth/ForgotPasswordRequest.jsx
import React, { useState } from "react";
import { Mail, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import leftImage from "../../assets/loginImage.png";
import Logo from "../../assets/logo.png";
import { authService } from "../../services/authService";

export default function ForgotPasswordRequest() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setServerMsg("If the email is registered, you’ll receive a verification code.");
      return;
    }
    setLoading(true);
    try {
      // Do NOT reveal existence; always show generic success.
      await authService.requestPasswordReset({ email });
      setServerMsg("If the email is registered, you’ll receive a verification code.");
      // Pass masked state forward; server associates a token with this email
      setTimeout(() => navigate("/auth/verify-otp", { state: { email } }), 800);
    } catch {
      setServerMsg("If the email is registered, you’ll receive a verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src={leftImage} alt="Attenzy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/30 to-transparent" />
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <img src={Logo} alt="Attenzy" className="h-10 w-10 rounded-md shadow" />
          <div>
            <div className="text-white text-xl font-semibold tracking-tight">Attenzy</div>
            <p className="text-white/80 text-xs">HR on Autopilot. Effortless attendance, zero delays.</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
                <p className="text-sm text-gray-600">Enter your email to receive a verification code</p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-indigo-500"
                    placeholder="super.admin@company.com"
                    autoComplete="username"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-medium disabled:opacity-50"
              >
                {loading ? "Sending code..." : "Send verification code"}
              </button>

              {serverMsg && <p className="text-center text-xs text-gray-600">{serverMsg}</p>}

              <p className="text-center text-xs text-gray-500">
                Remembered your password?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
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
