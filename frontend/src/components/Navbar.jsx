import React, { useState } from "react";
import { Globe, Menu, X, Info } from "lucide-react";
import logo from "../assets/logo-svg.svg";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <>
      {/* ✅ Navbar Section */}
      <nav className="bg-gradient-to-r from-orange-500 to-yellow-400 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left - Logo + Title */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="MGNREGA Logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-white text-2xl font-bold">
              {language === "en" ? "MGNREGA Tracker" : "मनरेगा ट्रैकर"}
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-white font-medium">
            <button className="hover:text-gray-100 transition">Home</button>
            <button className="hover:text-gray-100 transition">About</button>
            <button className="hover:text-gray-100 transition">Contact</button>

         {/* ✅ Login / Signup Button opens Auth Modal */}
<button
  onClick={() => setShowAuthModal(true)}
  className="bg-white text-orange-600 px-4 py-2 rounded-md font-semibold hover:bg-orange-100 transition"
>
  {language === "en" ? "Login / Signup" : "लॉगिन / साइनअप"}
</button>


            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 border border-white rounded-md px-2 py-1 hover:bg-white hover:text-orange-600 transition"
            >
              <Globe className="w-4 h-4" />
              <span>{language === "en" ? "हिन्दी" : "English"}</span>
            </button>

            <Info className="w-5 h-5 cursor-pointer hover:text-gray-200" title="About MGNREGA" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden text-white">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white text-orange-600 px-4 py-3 space-y-3 font-medium shadow-md">
            <button className="block w-full text-left">Home</button>
            <button className="block w-full text-left">About</button>
            <button className="block w-full text-left">Contact</button>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 border border-orange-500 rounded-md px-3 py-2 w-full justify-center hover:bg-orange-50"
            >
              <Globe className="w-4 h-4" />
              <span>{language === "en" ? "हिन्दी" : "English"}</span>
            </button>
          </div>
        )}
      </nav>

      {/* ✅ Auth Modal (outside navbar) */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;
