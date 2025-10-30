import React, { useState, useEffect } from "react";
import { Globe, Menu, X, Info, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  // ✅ Load user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-orange-600 via-orange-400 to-orange-400 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Left - Logo + Title */}
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full shadow-md">
                <Shield className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h1 className="text-white text-xl md:text-2xl font-bold leading-tight">
                  {language === "en" ? "MGNREGA Tracker" : "मनरेगा ट्रैकर"}
                </h1>
                <p className="text-white/80 text-xs hidden sm:block">
                  {language === "en" ? "Rural Employment Guarantee" : "ग्रामीण रोजगार गारंटी"}
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <button className="text-white hover:text-green-100 font-medium transition-colors relative group">
                {language === "en" ? "Home" : "होम"}
              </button>

              <button className="text-white hover:text-green-100 font-medium transition-colors relative group">
                {language === "en" ? "About" : "हमारे बारे में"}
              </button>

              <button className="text-white hover:text-green-100 font-medium transition-colors relative group">
                {language === "en" ? "Services" : "सेवाएं"}
              </button>

              <button className="text-white hover:text-green-100 font-medium transition-colors relative group">
                {language === "en" ? "Contact" : "संपर्क करें"}
              </button>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg px-3 py-2 hover:bg-white hover:text-green-600 transition-all font-medium"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{language === "en" ? "हिन्दी" : "English"}</span>
              </button>

              {/* ✅ If user logged in, show name instead of Login */}
              {user ? (
                <div className="flex items-center space-x-3 bg-white text-green-600 px-4 py-2 rounded-lg shadow-md font-semibold">
                  <span>{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="ml-2 text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    {language === "en" ? "Logout" : "लॉगआउट"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white text-green-600 px-6 py-2.5 rounded-lg hover:bg-green-50 transition-all font-semibold shadow-md hover:shadow-lg"
                >
                  {language === "en" ? "Login / Signup" : "लॉगिन / साइनअप"}
                </button>
              )}

              <Info className="w-6 h-6 text-white cursor-pointer hover:text-green-100 transition-colors" />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden text-white">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-green-200 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              <button className="block w-full text-left px-4 py-3 text-green-700 hover:bg-green-50 rounded-lg transition-colors font-medium">
                {language === "en" ? "Home" : "होम"}
              </button>
              <button className="block w-full text-left px-4 py-3 text-green-700 hover:bg-green-50 rounded-lg transition-colors font-medium">
                {language === "en" ? "About" : "हमारे बारे में"}
              </button>

              <div className="pt-3 pb-2 border-t border-green-100 space-y-3">
                {user ? (
                  <div className="flex flex-col items-center">
                    <span className="text-green-700 font-semibold">{user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 text-sm hover:text-red-600 mt-1"
                    >
                      {language === "en" ? "Logout" : "लॉगआउट"}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-white text-green-600 px-6 py-2.5 rounded-lg hover:bg-green-50 transition-all font-semibold shadow-md hover:shadow-lg"
                  >
                    {language === "en" ? "Login / Signup" : "लॉगिन / साइनअप"}
                  </button>
                )}

                <button
                  onClick={toggleLanguage}
                  className="flex items-center justify-center space-x-2 w-full border-2 border-green-600 text-green-600 rounded-lg px-4 py-3 hover:bg-green-50 transition-colors font-medium"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === "en" ? "हिन्दी" : "English"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
