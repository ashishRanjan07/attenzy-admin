import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Building,
  User,
  Smartphone,
} from "lucide-react";
import leftImage from "../../assets/loginImage.png";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("hrms_saved_email");
    const savedRememberMe = localStorage.getItem("hrms_remember_me");
    if (savedEmail && savedRememberMe === "true") {
      setFormData((p) => ({ ...p, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!isLogin) {
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!formData.company) newErrors.company = "Company name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      const userData = {
        id: 1,
        email: formData.email,
        firstName: isLogin ? "John" : formData.firstName,
        lastName: isLogin ? "Doe" : formData.lastName,
        company: isLogin ? "Tech Corp" : formData.company,
        role: "admin",
        avatar: null,
      };
      localStorage.setItem("hrms_token", "fake-jwt-token");
      localStorage.setItem("hrms_user", JSON.stringify(userData));
      if (rememberMe) {
        localStorage.setItem("hrms_saved_email", formData.email);
        localStorage.setItem("hrms_remember_me", "true");
      } else {
        localStorage.removeItem("hrms_saved_email");
        localStorage.removeItem("hrms_remember_me");
      }
      onLogin(userData);
    } catch {
      setErrors({ submit: "Authentication failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left: full-height image with overlay */}
      <div className="relative hidden lg:block">
        <img
          src={leftImage}
          alt="Attenzy hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/30 to-transparent" />
        {/* Brand badge over image */}
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
        {/* Bottom feature highlights */}
        <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4 text-white">
          <div className="rounded-lg bg-white/10 backdrop-blur px-4 py-3">
            <p className="text-sm">Employee Management</p>
          </div>
          <div className="rounded-lg bg-white/10 backdrop-blur px-4 py-3">
            <p className="text-sm">Attendance Tracking</p>
          </div>
          <div className="rounded-lg bg-white/10 backdrop-blur px-4 py-3">
            <p className="text-sm">Payroll Processing</p>
          </div>
        </div>
      </div>

      {/* Right: form column */}
      <div className="relative flex items-center justify-center bg-gray-50">
        {/* floating logo for small screens */}
        <div className="absolute top-6 left-6 lg:hidden flex items-center gap-2">
          <img src={Logo} alt="Attenzy" className="h-8 w-8" />
          <span className="text-gray-900 font-semibold">Attenzy</span>
        </div>

        <div className="w-full max-w-md p-6 sm:p-8">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isLogin ? "Welcome back" : "Create your account"}
                </h1>
                <p className="text-sm text-gray-600">
                  {isLogin
                    ? "Sign in to Attenzy"
                    : "Join Attenzy to streamline HR"}
                </p>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {errors.submit}
                </div>
              )}

              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                            errors.firstName
                              ? "border-red-300"
                              : "border-gray-300"
                          } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                          placeholder="John"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                            errors.lastName
                              ? "border-red-300"
                              : "border-gray-300"
                          } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                          placeholder="Doe"
                        />
                      </div>
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Company Name
                    </label>
                    <div className="relative">
                      <Building className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                          errors.company ? "border-red-300" : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        placeholder="Your Company"
                      />
                    </div>
                    {errors.company && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.company}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <Smartphone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                          errors.phone ? "border-red-300" : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder="you@company.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-2.5 rounded-lg border ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                        errors.confirmPassword
                          ? "border-red-300"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/auth/forgot-password")}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-medium shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-b-transparent" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  <>{isLogin ? "Sign in" : "Create account"}</>
                )}
              </button>

              <p className="text-center text-xs text-gray-500">
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/auth/register")}
                  className="text-indigo-600 hover:text-indigo-500 underline underline-offset-2"
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>

          {/* Footer copy */}
          <p className="mt-6 text-center text-xs text-gray-500">
            HR on Autopilot. Effortless attendance, zero delays.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
