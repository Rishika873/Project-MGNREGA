import { useState } from "react";
import { User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const UserDropdown = ({ language, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const menuItems = [
    { label: language === "en" ? "Personal Information" : "व्यक्तिगत जानकारी", onClick: () => navigate("/personal-info") },
    { label: language === "en" ? "Settings" : "सेटिंग्स", onClick: () => console.log("Settings") },
    { label: language === "en" ? "Help" : "सहायता", onClick: () => console.log("Help") },
  ];

  return (
    <div className="relative">
      <div
        onClick={toggleDropdown}
        className="flex items-center gap-3 bg-white text-orange-700 px-4 py-2 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
      >
        <User className="w-5 h-5 text-orange-600" />
        <span className="font-semibold">{language === "en" ? "Username" : "उपयोगकर्ता"}</span>
        <LogOut className="w-4 h-4 text-red-500" />
      </div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-50"
          >
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-orange-50 transition font-medium text-gray-700"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-50 transition font-medium text-red-500"
            >
              {language === "en" ? "Logout" : "लॉगआउट"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
