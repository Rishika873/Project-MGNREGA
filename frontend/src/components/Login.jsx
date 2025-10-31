import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lock, Mail, Shield, Eye , EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, setUserFromToken } from "../redux/authSlice";

import { useEffect } from "react";

const Login = () => {
const [formData, setFormData] = useState({ email: "", password: "" });
  const [language, setLanguage] = useState("en");
  const [showPassword, setShowPassword] = useState(false); // new state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${API_URL}/auth/login`, formData);
    const token = res.data.token;

    dispatch(loginSuccess(token)); // ✅ saves token + decoded user

    toast.success("Login successful!");
    setFormData({ email: "", password: "" });

    setTimeout(() => {
      navigate("/");
    }, 1000);
  } catch (error) {
    toast.error(error.response?.data?.message || "Invalid credentials!");
  }
};
useEffect(() => {
  dispatch(setUserFromToken());
}, [dispatch]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-50">
      {/* Login Card */}
      <div className="flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-500 text-white py-6 px-8">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
                  <Lock className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center">
                {language === "en" ? "Secure Login" : "सुरक्षित लॉगिन"}
              </h2>
              <p className="text-center text-white/90 text-sm mt-1">
                {language === "en"
                  ? "Access your MGNREGA services"
                  : "अपनी मनरेगा सेवाओं तक पहुंचें"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {language === "en" ? "Email Address" : "ईमेल पता"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder={
                      language === "en"
                        ? "Enter your email"
                        : "अपना ईमेल दर्ज करें"
                    }
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

    {/* Password Field */}
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    {language === "en" ? "Password" : "पासवर्ड"}
  </label>
  <div className="relative">
    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      type={showPassword ? "text" : "password"} // toggle type
      name="password"
      placeholder={
        language === "en"
          ? "Enter your password"
          : "अपना पासवर्ड दर्ज करें"
      }
      value={formData.password}
      onChange={handleChange}
      className="w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
      required
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
    </button>
  </div>
</div>

              {/* Security Notice */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-xs text-orange-800 flex items-start gap-2">
                  <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    {language === "en"
                      ? "This is a secure government system. Unauthorized access is prohibited and may be subject to criminal prosecution."
                      : "यह एक सुरक्षित सरकारी प्रणाली है। अनधिकृत पहुंच निषिद्ध है और आपराधिक अभियोजन के अधीन हो सकती है।"}
                  </span>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-500 text-white font-semibold py-3 rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {language === "en"
                  ? "Sign In Securely"
                  : "सुरक्षित रूप से साइन इन करें"}
              </button>

              {/* Footer Links */}
              <div className="flex justify-between items-center text-sm pt-2">
                <a
                  href="/forget-password"
                  className="text-orange-700 hover:text-orange-800 hover:underline"
                >
                  {language === "en"
                    ? "Forgot Password?"
                    : "पासवर्ड भूल गए?"}
                </a>
                <a
                  href="#"
                  className="text-orange-700 hover:text-orange-800 hover:underline"
                >
                  {language === "en" ? "Need Help?" : "मदद चाहिए?"}
                </a>
              </div>
            </form>

            {/* Card Footer */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                {language === "en"
                  ? "Protected by government-grade encryption"
                  : "सरकारी-ग्रेड एन्क्रिप्शन द्वारा संरक्षित"}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              {language === "en" ? "Don't have an account?" : "खाता नहीं है?"}{" "}
              <a
                href="/signup"
                className="text-orange-700 font-semibold hover:underline"
              >
                {language === "en" ? "Register Here" : "यहां रजिस्टर करें"}
              </a>
            </p>
          </div>

          {/* Language Toggle */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="text-orange-700 hover:text-orange-800 font-medium text-sm underline"
            >
              {language === "en" ? "हिन्दी में देखें" : "View in English"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
