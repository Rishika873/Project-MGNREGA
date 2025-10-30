import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserPlus, Mail, Lock, Shield } from "lucide-react";
import logo from "../assets/logo-svg.svg";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [language, setLanguage] = useState("en");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, formData);
      toast.success(
        language === "en" ? "Signup successful!" : "साइन अप सफल हुआ!"
      );
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (language === "en" ? "Signup failed!" : "साइन अप असफल हुआ!")
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50">
      <div className="flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-6 px-8">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
                  <UserPlus className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center">
                {language === "en" ? "Create Account" : "खाता बनाएं"}
              </h2>
              <p className="text-center text-white/90 text-sm mt-1">
                {language === "en"
                  ? "Register to access MGNREGA services"
                  : "मनरेगा सेवाओं तक पहुँचने के लिए रजिस्टर करें"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {language === "en" ? "Full Name" : "पूरा नाम"}
                </label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder={
                      language === "en"
                        ? "Enter your full name"
                        : "अपना पूरा नाम दर्ज करें"
                    }
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              {/* Email */}
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
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {language === "en" ? "Password" : "पासवर्ड"}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder={
                      language === "en"
                        ? "Enter your password"
                        : "अपना पासवर्ड दर्ज करें"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-800 flex items-start gap-2">
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
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold py-3 rounded-lg hover:from-green-700 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {language === "en" ? "Sign Up" : "साइन अप करें"}
              </button>
            </form>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                {language === "en"
                  ? "Already have an account?"
                  : "पहले से खाता है?"}{" "}
                <a
                  href="/login"
                  className="text-green-700 font-semibold hover:underline"
                >
                  {language === "en" ? "Login Here" : "यहां लॉगिन करें"}
                </a>
              </p>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="text-green-700 hover:text-green-800 font-medium text-sm underline"
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

export default Signup;
