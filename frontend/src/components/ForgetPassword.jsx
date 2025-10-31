import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Shield } from "lucide-react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call backend API for password reset
      await axios.post(`${API_URL}/auth/forget-password`, { email });
      toast.success(
        language === "en"
          ? "Password reset link sent! Check your email."
          : "पासवर्ड रीसेट लिंक भेजा गया! अपना ईमेल देखें।"
      );
      setEmail("");
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2s
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (language === "en"
            ? "Failed to send reset link!"
            : "रीसेट लिंक भेजने में विफल!")
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-50 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-500 text-white py-6 px-8">
            <div className="flex items-center justify-center mb-2">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
                <Mail className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">
              {language === "en" ? "Forgot Password" : "पासवर्ड भूल गए"}
            </h2>
            <p className="text-center text-white/90 text-sm mt-1">
              {language === "en"
                ? "Enter your email to reset password"
                : "पासवर्ड रीसेट करने के लिए अपना ईमेल दर्ज करें"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === "en" ? "Email Address" : "ईमेल पता"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder={
                    language === "en"
                      ? "Enter your email"
                      : "अपना ईमेल दर्ज करें"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-xs text-orange-800 flex items-start gap-2">
                <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  {language === "en"
                    ? "Your information is protected under government security standards."
                    : "आपकी जानकारी सरकारी सुरक्षा मानकों के तहत संरक्षित है।"}
                </span>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-500 text-white font-semibold py-3 rounded-lg hover:from-orange-700 hover:to-orange-500 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {language === "en" ? "Send Reset Link" : "रीसेट लिंक भेजें"}
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-center text-sm">
            <p>
              {language === "en"
                ? "Remembered your password?"
                : "पासवर्ड याद आ गया?"}{" "}
              <a
                href="/login"
                className="text-orange-700 font-semibold hover:underline"
              >
                {language === "en" ? "Login Here" : "यहां लॉगिन करें"}
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

export default ForgetPassword;
