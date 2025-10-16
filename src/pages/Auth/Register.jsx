import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Smartphone,
  Lock,
  Image as ImageIcon,
  Building,
  Shield,
  KeyRound,
  Globe,
  Bell,
  Moon,
  Sun,
  Cpu,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Check,
  Zap,
  Server,
  Database,
  Settings,
  Users,
  Calendar,
  CreditCard,
  FileText,
  AlertCircle,
  Sparkles
} from "lucide-react";
import leftImage from "../../assets/loginImage.png";
import Logo from "../../assets/logo.png";

const PERMISSIONS = [
  { key: "manage_organizations", label: "Manage Organizations", icon: Building },
  { key: "manage_users", label: "Manage Users", icon: Users },
  { key: "manage_departments", label: "Manage Departments", icon: Users },
  { key: "manage_roles", label: "Manage Roles", icon: Shield },
  { key: "manage_payroll", label: "Manage Payroll", icon: CreditCard },
  { key: "manage_attendance", label: "Manage Attendance", icon: Calendar },
  { key: "manage_leave", label: "Manage Leave", icon: FileText },
  { key: "manage_assets", label: "Manage Assets", icon: Database },
  { key: "manage_announcement", label: "Manage Announcements", icon: Bell },
  { key: "view_reports", label: "View Reports", icon: FileText },
  { key: "manage_settings", label: "Manage Settings", icon: Settings },
  { key: "create_backup", label: "Create Backup", icon: Database },
  { key: "restore_backup", label: "Restore Backup", icon: Server },
];

export default function RegisterSuperAdmin() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    contact_number: "",
    profile_picture: "",
    role: "superAdmin",
    access_level: "system",
    permissions: PERMISSIONS.reduce((acc, p) => ({ ...acc, [p.key]: true }), {}),
    linked_organizations: [],
    status: "active",
    account_verified: true,
    email_verified: true,
    two_factor_enabled: false,
    two_factor_method: "authenticator",
    security_questions: [{ question: "", answer: "" }],
    language: "en",
    theme: "dark",
    timezone: "Asia/Kolkata",
    email_alerts: true,
    sms_alerts: false,
    push_notifications: true,
    created_by: "system",
  });

  const set = (k) => (e) => {
    const v = e?.target?.type === "checkbox" ? e.target.checked : e?.target?.value ?? e;
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  const setPermission = (k) => (e) => {
    const v = e.target.checked;
    setForm((p) => ({ ...p, permissions: { ...p.permissions, [k]: v } }));
  };

  const validate = () => {
    const e = {};
    if (!form.first_name) e.first_name = "First name is required";
    if (!form.last_name) e.last_name = "Last name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Use at least 8 characters";
    if (!form.confirm_password) e.confirm_password = "Confirm your password";
    else if (form.password !== form.confirm_password) e.confirm_password = "Passwords do not match";
    if (!form.contact_number) e.contact_number = "Contact number is required";
    if (form.two_factor_enabled && !["sms", "email", "authenticator"].includes(form.two_factor_method)) {
      e.two_factor_method = "Select a 2FA method";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate("/auth/login", { replace: true });
    } catch (err) {
      setErrors((p) => ({ ...p, submit: "Registration failed. Please try again." }));
    } finally {
      setLoading(false);
    }
  };

  const SectionHeader = ({ icon: Icon, title, subtitle, isActive, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
        isActive 
          ? "bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 shadow-sm" 
          : "bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          isActive ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
      {isActive ? <ChevronUp className="h-5 w-5 text-indigo-600" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
    </button>
  );

  const FeaturePill = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Left Section - Fixed */}
        <div className="hidden lg:block relative overflow-hidden">
          <div className="fixed top-0 left-0 w-1/2 h-full">
            <img
              src={leftImage}
              alt="Attenzy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/80 to-slate-900/90" />
            
            {/* Logo */}
            <div className="absolute top-8 left-8 flex items-center gap-3 z-10">
              <div className="h-12 w-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center shadow-2xl">
                <img src={Logo} alt="Attenzy" className="h-8 w-8" />
              </div>
              <div>
                <div className="text-white text-xl font-bold tracking-tight">Attenzy</div>
                <p className="text-white/80 text-xs">HR on Autopilot. Effortless attendance, zero delays.</p>
              </div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center px-12">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full">
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                    <span className="text-white text-sm font-medium">Super Admin Setup</span>
                  </div>
                  <h1 className="text-4xl font-bold text-white leading-tight">
                    Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Attenzy</span>
                  </h1>
                  <p className="text-xl text-white/80 leading-relaxed">
                    Configure your system administrator with full access and control over the HRMS platform.
                  </p>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-3">
                  <FeaturePill icon={Zap} text="Full System Access" />
                  <FeaturePill icon={Shield} text="Advanced Security" />
                  <FeaturePill icon={Settings} text="Complete Control" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-white/70 text-sm">System Access</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-white/70 text-sm">Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">∞</div>
                    <div className="text-white/70 text-sm">Permissions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Scrollable */}
        <div className="flex flex-col h-screen">
          <div className="flex-1 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-6">
              <div className="w-full max-w-4xl">
                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                  <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg">
                    {["Basic", "Security", "Permissions", "Preferences"].map((step, index) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          activeSection === step.toLowerCase() 
                            ? "bg-indigo-600 text-white" 
                            : "bg-gray-200 text-gray-600"
                        }`}>
                          {index + 1}
                        </div>
                        <span className={`ml-2 text-sm font-medium ${
                          activeSection === step.toLowerCase() ? "text-indigo-600" : "text-gray-500"
                        }`}>
                          {step}
                        </span>
                        {index < 3 && <div className="w-6 h-0.5 bg-gray-300 mx-3" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-8">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 backdrop-blur-lg rounded-2xl">
                        <Shield className="h-8 w-8" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold">Super Admin Registration</h1>
                        <p className="text-indigo-100 mt-2">Full system-level access configuration</p>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form className="p-8 space-y-8" onSubmit={handleSubmit} noValidate>
                    {errors.submit && (
                      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <span className="text-red-700 text-sm">{errors.submit}</span>
                      </div>
                    )}

                    {/* Basic Information */}
                    <div>
                      <SectionHeader
                        icon={User}
                        title="Basic Information"
                        subtitle="Personal details and contact information"
                        isActive={activeSection === "basic"}
                        onClick={() => setActiveSection("basic")}
                      />
                      {activeSection === "basic" && (
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                              <input
                                className={`w-full rounded-xl border-2 bg-white px-4 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                  errors.first_name ? "border-red-300" : "border-gray-200 hover:border-gray-300"
                                }`}
                                value={form.first_name}
                                onChange={set("first_name")}
                                placeholder="Jane"
                              />
                              {errors.first_name && <p className="mt-2 text-sm text-red-600">{errors.first_name}</p>}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                              <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                  className={`w-full rounded-xl border-2 bg-white pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                    errors.email ? "border-red-300" : "border-gray-200 hover:border-gray-300"
                                  }`}
                                  value={form.email}
                                  onChange={set("email")}
                                  type="email"
                                  placeholder="super.admin@attenzy.com"
                                />
                              </div>
                              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                              <input
                                className={`w-full rounded-xl border-2 bg-white px-4 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                  errors.last_name ? "border-red-300" : "border-gray-200 hover:border-gray-300"
                                }`}
                                value={form.last_name}
                                onChange={set("last_name")}
                                placeholder="Doe"
                              />
                              {errors.last_name && <p className="mt-2 text-sm text-red-600">{errors.last_name}</p>}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                              <div className="relative">
                                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                  className={`w-full rounded-xl border-2 bg-white pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                    errors.contact_number ? "border-red-300" : "border-gray-200 hover:border-gray-300"
                                  }`}
                                  value={form.contact_number}
                                  onChange={set("contact_number")}
                                  placeholder="+91 98xxxxxx00"
                                />
                              </div>
                              {errors.contact_number && <p className="mt-2 text-sm text-red-600">{errors.contact_number}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Security */}
                    <div>
                      <SectionHeader
                        icon={Lock}
                        title="Security & Credentials"
                        subtitle="Password and authentication settings"
                        isActive={activeSection === "security"}
                        onClick={() => setActiveSection("security")}
                      />
                      {activeSection === "security" && (
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                              <div className="relative">
                                <input
                                  type={showPwd ? "text" : "password"}
                                  className={`w-full rounded-xl border-2 bg-white pr-12 pl-4 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                    errors.password ? "border-red-300" : "border-gray-200 hover:border-gray-300"
                                  }`}
                                  value={form.password}
                                  onChange={set("password")}
                                  placeholder="••••••••"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPwd((s) => !s)}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showPwd ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                              </div>
                              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                              <div className="relative">
                                <input
                                  type={showCPwd ? "text" : "password"}
                                  className={`w-full rounded-xl border-2 bg-white pr-12 pl-4 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                    errors.confirm_password ? "border-red-300" : "border-gray-200 hover:border-gray-300"
                                  }`}
                                  value={form.confirm_password}
                                  onChange={set("confirm_password")}
                                  placeholder="••••••••"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowCPwd((s) => !s)}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showCPwd ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                              </div>
                              {errors.confirm_password && <p className="mt-2 text-sm text-red-600">{errors.confirm_password}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Permissions */}
                    <div>
                      <SectionHeader
                        icon={KeyRound}
                        title="System Permissions"
                        subtitle="Manage access controls and privileges"
                        isActive={activeSection === "permissions"}
                        onClick={() => setActiveSection("permissions")}
                      />
                      {activeSection === "permissions" && (
                        <div className="mt-6 p-6 bg-gray-50 rounded-2xl">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {PERMISSIONS.map((p) => (
                              <label
                                key={p.key}
                                className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-gray-200 hover:border-indigo-300 cursor-pointer transition-all"
                              >
                                <div className="flex items-center justify-center">
                                  <input
                                    type="checkbox"
                                    checked={form.permissions[p.key]}
                                    onChange={setPermission(p.key)}
                                    className="h-5 w-5 text-indigo-600 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                  />
                                </div>
                                <p.icon className="h-5 w-5 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">{p.label}</span>
                                {form.permissions[p.key] && <Check className="h-4 w-4 text-green-500 ml-auto" />}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Preferences */}
                    <div>
                      <SectionHeader
                        icon={Cpu}
                        title="Preferences & Settings"
                        subtitle="Customize your experience"
                        isActive={activeSection === "preferences"}
                        onClick={() => setActiveSection("preferences")}
                      />
                      {activeSection === "preferences" && (
                        <div className="mt-6 p-6 bg-gray-50 rounded-2xl space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                              <select
                                value={form.language}
                                onChange={set("language")}
                                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              >
                                <option value="en">English</option>
                                <option value="hi">Hindi</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                              <div className="flex gap-4">
                                <button
                                  type="button"
                                  onClick={() => set("theme")({ target: { value: "dark" } })}
                                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                                    form.theme === "dark" 
                                      ? "border-indigo-500 bg-indigo-50 text-indigo-700" 
                                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                  }`}
                                >
                                  <Moon className="h-4 w-4" />
                                  Dark
                                </button>
                                <button
                                  type="button"
                                  onClick={() => set("theme")({ target: { value: "light" } })}
                                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                                    form.theme === "light" 
                                      ? "border-indigo-500 bg-indigo-50 text-indigo-700" 
                                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                  }`}
                                >
                                  <Sun className="h-4 w-4" />
                                  Light
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                              <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                  className="w-full rounded-xl border-2 border-gray-200 bg-white pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                  value={form.timezone}
                                  onChange={set("timezone")}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Advanced Settings */}
                    <div className="border-t pt-6">
                      <button
                        type="button"
                        onClick={() => setIsAdvancedOpen((o) => !o)}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-500 font-medium"
                      >
                        {isAdvancedOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        Advanced Settings
                      </button>
                      {isAdvancedOpen && (
                        <div className="mt-4 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                              <select
                                value={form.status}
                                onChange={set("status")}
                                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              >
                                <option value="active">Active</option>
                                <option value="suspended">Suspended</option>
                                <option value="deactivated">Deactivated</option>
                              </select>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={form.account_verified}
                                onChange={set("account_verified")}
                                className="h-5 w-5 text-indigo-600 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-indigo-500"
                              />
                              <label className="text-sm font-medium text-gray-700">Account Verified</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={form.email_verified}
                                onChange={set("email_verified")}
                                className="h-5 w-5 text-indigo-600 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-indigo-500"
                              />
                              <label className="text-sm font-medium text-gray-700">Email Verified</label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-6 border-t">
                      <button
                        type="button"
                        onClick={() => navigate("/auth/login")}
                        className="px-8 py-3.5 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Creating Super Admin...
                          </>
                        ) : (
                          <>
                            <Shield className="h-5 w-5" />
                            Create Super Admin Account
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                <p className="text-center text-sm text-gray-500 pb-6">
                  By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}