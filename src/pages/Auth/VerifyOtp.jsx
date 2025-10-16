// src/pages/Auth/VerifyOtp.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Timer, Building } from "lucide-react";
import leftImage from "../../assets/loginImage.png";
import Logo from "../../assets/logo.png";
import { authService } from "../../services/authService";

const OTP_LENGTH = 6;
const EXPIRY_SECONDS = 300;  // 5 minutes
const RESEND_COOLDOWN = 45;  // seconds
const MAX_ATTEMPTS = 5;

export default function VerifyOtp() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || ""; // keep state minimal
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [attempts, setAttempts] = useState(0);
  const [expiresIn, setExpiresIn] = useState(EXPIRY_SECONDS);
  const [resendIn, setResendIn] = useState(0);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const inputsRef = useRef([]);

  useEffect(() => {
    const t = setInterval(() => setExpiresIn((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!email) {
      // If navigation state missing, send back to request
      navigate("/auth/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  const code = useMemo(() => digits.join(""), [digits]);

  const onChangeDigit = (idx) => (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 1);
    setDigits((arr) => {
      const next = [...arr];
      next[idx] = v;
      return next;
    });
    if (v && idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const onKeyDown = (idx) => (e) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const verify = async (e) => {
    e.preventDefault();
    setMsg("");
    if (expiresIn <= 0) {
      setMsg("Invalid or expired OTP.");
      return;
    }
    if (code.length !== OTP_LENGTH) {
      setMsg("Enter the full verification code.");
      return;
    }
    if (attempts >= MAX_ATTEMPTS) {
      setMsg("Too many attempts. Please request a new code.");
      return;
    }
    setLoading(true);
    try {
      const ok = await authService.verifyOtp({ email, code });
      if (ok) {
        navigate("/auth/reset-password", { state: { email }, replace: true });
      } else {
        setAttempts((n) => n + 1);
        setMsg("Invalid or expired OTP.");
      }
    } catch {
      setAttempts((n) => n + 1);
      setMsg("Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (resendIn > 0) return;
    setMsg("");
    try {
      await authService.requestPasswordReset({ email, force: true });
      setResendIn(RESEND_COOLDOWN);
      setExpiresIn(EXPIRY_SECONDS);
      setDigits(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    } catch {
      setMsg("Unable to resend now. Try again later.");
    }
  };

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  const mmss = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sc = String(s % 60).padStart(2, "0");
    return `${m}:${sc}`;
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
                <h1 className="text-2xl font-bold text-gray-900">Verify OTP</h1>
                <p className="text-sm text-gray-600">Enter the 6‑digit code sent to your email</p>
              </div>
            </div>

            <form className="space-y-5" onSubmit={verify}>
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="w-12 h-12 text-center text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    value={digits[i]}
                    onChange={onChangeDigit(i)}
                    onKeyDown={onKeyDown(i)}
                    maxLength={1}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Timer className="h-4 w-4" />
                  Expires in {mmss(expiresIn)}
                </div>
                <button
                  type="button"
                  onClick={resend}
                  disabled={resendIn > 0}
                  className={`underline underline-offset-2 ${resendIn > 0 ? "text-gray-400 cursor-not-allowed" : "text-indigo-600 hover:text-indigo-500"}`}
                >
                  {resendIn > 0 ? `Resend in ${mmss(resendIn)}` : "Resend code"}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-medium disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              {msg && <p className="text-center text-xs text-red-600">{msg}</p>}

              <p className="text-center text-xs text-gray-500">
                Wrong email?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/auth/forgot-password")}
                  className="text-indigo-600 hover:text-indigo-500 underline underline-offset-2"
                >
                  Change it
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
