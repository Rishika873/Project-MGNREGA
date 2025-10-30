import React, { useEffect, useState } from "react";
import { Globe, Menu, X, Info, Shield, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InfoDropdown from "./InfoDropdown";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUserFromToken } from "../redux/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) dispatch(setUserFromToken());
  }, [token, dispatch]);

  const toggleLanguage = () => setLanguage(language === "en" ? "hi" : "en");
  const handleLogout = () => dispatch(logout());

  return (
    <nav className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 shadow-md sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        {/* 🟠 Left: Logo and title */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="bg-white/20 backdrop-blur-md p-2 rounded-full shadow-inner border border-white/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-white text-xl md:text-2xl font-bold tracking-wide">
              {language === "en" ? "MGNREGA Tracker" : "मनरेगा ट्रैकर"}
            </h1>
            <p className="text-white/80 text-xs md:text-sm">
              {language === "en"
                ? "Rural Employment Guarantee"
                : "ग्रामीण रोजगार गारंटी"}
            </p>
          </div>
        </div>

        {/* 🟢 Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {["Home", "About", "Services", "Contact"].map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`)}
              className="text-white font-medium relative group transition-all"
            >
              {language === "en"
                ? item
                : ["होम", "हमारे बारे में", "सेवाएं", "संपर्क करें"][i]}
              <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-white transition-all"></span>
            </button>
          ))}

          <InfoDropdown />

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-white border border-white/30 hover:bg-white/20 transition backdrop-blur-sm"
          >
            <Globe className="w-4 h-4" />
            <span>{language === "en" ? "हिन्दी" : "English"}</span>
          </button>

          {user ? (
            <div className="flex items-center gap-3 bg-white text-orange-700 px-4 py-2 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
              <User className="w-5 h-5 text-orange-600" />
              <span className="font-semibold">{user.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
                className="ml-2 text-sm flex items-center gap-1 text-red-500 hover:text-red-600 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                {language === "en" ? "Logout" : "लॉगआउट"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-orange-600 px-6 py-2 rounded-xl font-semibold shadow hover:bg-orange-50 transition cursor-pointer"
            >
              {language === "en" ? "Login / Signup" : "लॉगिन / साइनअप"}
            </button>
          )}
        </div>

        {/* 📱 Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition cursor-pointer"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 📱 Mobile Menu (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white text-gray-800 rounded-b-2xl shadow-md px-6 py-4 space-y-3"
          >
            {["Home", "About", "Services", "Contact"].map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`);
                  setIsOpen(false);
                }}
                className="block w-full text-left text-gray-700 font-medium hover:text-orange-600 transition cursor-pointer"
              >
                {language === "en"
                  ? item
                  : ["होम", "हमारे बारे में", "सेवाएं", "संपर्क करें"][i]}
              </button>
            ))}

            <InfoDropdown />
            <hr className="border-gray-200" />

            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-600 font-semibold cursor-pointer"
                >
                  {language === "en" ? "Logout" : "लॉगआउट"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition cursor-pointer"
              >
                {language === "en" ? "Login / Signup" : "लॉगिन / साइनअप"}
              </button>
            )}

            <button
              onClick={toggleLanguage}
              className="mt-3 flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              <Globe className="w-4 h-4" />
              {language === "en" ? "हिन्दी में देखें" : "View in English"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
