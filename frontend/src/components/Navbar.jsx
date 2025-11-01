import {
  Globe,
  Menu,
  X,
  Info,
  Shield,
  User,
  LogOut,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import InfoDropdown from "./InfoDropdown";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUserFromToken } from "../redux/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { setLocation as setGlobalLocation } from "../redux/locationSlice";
const baseURL = import.meta.env.VITE_API_URL;



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [location, setLocation] = useState({ state: "", district: "" });
  const [isDetecting, setIsDetecting] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleLanguage = () => setLanguage(language === "en" ? "hi" : "en");
  const handleLogout = () => dispatch(logout());

  // 🧭 Detect location only when user clicks
const detectLocation = async () => {
  try {
    if (!("geolocation" in navigator)) {
      alert("❌ Geolocation not supported in your browser.");
      return;
    }

    setIsDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords; // ✅ Correct names

        console.log("Detected location:", latitude, longitude);

        // ✅ Use correct variables here
        const res = await fetch(
          `${baseURL}/api/geo/reverse?lat=${latitude}&lon=${longitude}`
        );

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();

      let state = data?.address?.state || "";
let district =
  data?.address?.district ||
  data?.address?.city ||
  data?.address?.county ||
  data?.address?.state_district ||
  "";

// ✅ Normalize values
state = state.replace(/state|union territory|ut|province/gi, "").trim();

district = district
  .replace(/district|city|division|mandal|tehsil|block/gi, "")
  .trim();



        const newLocation = { state, district };
        setLocation(newLocation);

        // 💾 Save to Redux + localStorage
        dispatch(setGlobalLocation(newLocation));
        localStorage.setItem("userLocation", JSON.stringify(newLocation));

        setIsDetecting(false);
      },
      (error) => {
        console.error("Location error:", error);
        alert("⚠️ Please enable location access and try again.");
        setIsDetecting(false);
      }
    );
  } catch (error) {
    console.error("Error detecting location:", error);
    setIsDetecting(false);
  }
};

useEffect(() => {
  const handleDetectRequest = () => {
    detectLocation(); // ✅ call your existing function
  };

  window.addEventListener("detect-location", handleDetectRequest);

  return () =>
    window.removeEventListener("detect-location", handleDetectRequest);
}, []);


useEffect(() => {
  if (token) dispatch(setUserFromToken());

  // 💾 Load saved location if available
  const savedLocation = localStorage.getItem("userLocation");
  if (savedLocation) {
    setLocation(JSON.parse(savedLocation));
  }
}, [token, dispatch]);


  useEffect(() => {
    if (token) dispatch(setUserFromToken());
  }, [token, dispatch]);

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
          {/* 📍 Location Display or Button */}
          {location.state ? (
            <div className="flex items-center gap-2 text-white bg-white/20 px-3 py-2 rounded-lg border border-white/30 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-sm font-medium">
                {location.district}, {location.state}
              </span>
            </div>
          ) : (
            <button
              onClick={detectLocation}
              disabled={isDetecting}
              className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg border border-white/30 text-white hover:bg-white/30 transition backdrop-blur-sm"
            >
              <MapPin className="w-4 h-4" />
              {isDetecting
                ? "Detecting..."
                : language === "en"
                ? "Detect My Location"
                : "मेरा स्थान पता करें"}
            </button>
          )}

          {["Home", "About", "Contact"].map((item, i) => (
            <button
              key={i}
              onClick={() =>
                navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`)
              }
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
  <div className="relative">
    {/* Profile button */}
    <div
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="flex items-center gap-3 bg-white text-orange-700 px-4 py-2 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
    >
      <User className="w-5 h-5 text-orange-600" />
      <span className="font-semibold">{user.name}</span>
    </div>

    {/* Dropdown menu */}
    <AnimatePresence>
      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-50"
        >
          <button
            onClick={() => {
              navigate("/personal-info")
              console.log("Personal Info");
              setIsDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-orange-50 transition font-medium text-gray-700"
          >
            {language === "en" ? "Personal Information" : "व्यक्तिगत जानकारी"}
          </button>
          <button
            onClick={() => {
              navigate("/settings")
              console.log("Settings");
              setIsDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-orange-50 transition font-medium text-gray-700"
          >
            {language === "en" ? "Settings" : "सेटिंग्स"}
          </button>
          <button
            onClick={() => {
              navigate("/help")
              console.log("Help");
              setIsDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-orange-50 transition font-medium text-gray-700"
          >
            {language === "en" ? "Help" : "सहायता"}
          </button>
          <button
            onClick={() => {
              handleLogout();
              setIsDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-red-50 transition font-medium text-red-500"
          >
            {language === "en" ? "Logout" : "लॉगआउट"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
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
    </nav>
  );
};

export default Navbar;
