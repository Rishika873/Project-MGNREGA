import { useState,  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage as setGlobalLanguage } from "../redux/languageSlice";
import { Globe, Bell, Moon, Shield, Database, Trash2, Lock,Eye,Download,LogOut } from "lucide-react";
import { logout } from "../redux/authSlice"; // use the correct path
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.current);
  const [selectedLanguage, setSelectedLanguage] = useState(language || "en");
  const [notifications, setNotifications] = useState(true);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // new state
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

const handleChangePassword = () => {
  setShowChangePasswordPopup(true);
};

const cancelChangePassword = () => {
  setShowChangePasswordPopup(false);
  setOldPassword("");
  setNewPassword("");
  setConfirmPassword("");
};

const submitChangePassword = () => {
  if (newPassword !== confirmPassword) {
    alert("New password and confirm password do not match!");
    return;
  }
  // Dispatch your password change action here or call API
  console.log("Password changed:", { oldPassword, newPassword });
  cancelChangePassword();
};



  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    dispatch(setGlobalLanguage(lang));
    // Note: localStorage usage removed as per Claude.ai artifact restrictions
    // You can implement this when deploying to your own environment
  };

const handleLogout = () => {
  setShowLogoutPopup(true); // show confirmation popup
};

const confirmLogout = () => {
  dispatch(logout()); // clear auth state
  setShowLogoutPopup(false);
  navigate("/login"); // redirect to login page
};

const cancelLogout = () => {
  setShowLogoutPopup(false);
};

  const translations = {
    en: {
      title: "Settings",
      language: "Language",
      notifications: "Notifications",
      enabled: "Enabled",
      disabled: "Disabled",
      darkMode: "Dark Mode",
      privacy: "Privacy & Security",
      dataSharing: "Data Sharing",
      dataDesc: "Share usage data to improve services",
      profileVisibility: "Profile Visibility",
      public: "Public",
      private: "Private",
      friendsOnly: "Friends Only",
      storage: "Storage & Data",
      clearCache: "Clear Cache",
      cacheDesc: "Free up space by clearing cached data",
      downloadData: "Download My Data",
      downloadDesc: "Download a copy of your information",
      account: "Account Management",
      changePassword: "Change Password",
      passwordDesc: "Update your account password",
      deleteAccount: "Delete Account",
      deleteDesc: "Permanently delete your account and data",
      logout: "Logout",
      logoutDesc: "Sign out of your account"
    },
    hi: {
      title: "सेटिंग्स",
      language: "भाषा",
      notifications: "सूचनाएँ",
      enabled: "सक्रिय",
      disabled: "निष्क्रिय",
      darkMode: "डार्क मोड",
      privacy: "गोपनीयता और सुरक्षा",
      dataSharing: "डेटा साझाकरण",
      dataDesc: "सेवाओं को बेहतर बनाने के लिए उपयोग डेटा साझा करें",
      profileVisibility: "प्रोफ़ाइल दृश्यता",
      public: "सार्वजनिक",
      private: "निजी",
      friendsOnly: "केवल मित्र",
      storage: "स्टोरेज और डेटा",
      clearCache: "कैश साफ़ करें",
      cacheDesc: "कैश किए गए डेटा को साफ़ करके स्थान खाली करें",
      downloadData: "मेरा डेटा डाउनलोड करें",
      downloadDesc: "अपनी जानकारी की एक प्रति डाउनलोड करें",
      account: "खाता प्रबंधन",
      changePassword: "पासवर्ड बदलें",
      passwordDesc: "अपना खाता पासवर्ड अपडेट करें",
      deleteAccount: "खाता हटाएं",
      deleteDesc: "अपना खाता और डेटा स्थायी रूप से हटाएं",
      logout: "लॉगआउट",
      logoutDesc: "अपने खाते से साइन आउट करें"
    }
  };

  const t = translations[selectedLanguage] || translations.en;

  const SettingSection = ({ title, children }) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );

  const ToggleSetting = ({ icon: Icon, label, description, value, onChange }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-start gap-3 flex-1">
        <div className="p-2 bg-orange-100 rounded-lg text-orange-600 mt-0.5">
          <Icon size={20} />
        </div>
        <div>
          <p className="font-medium text-gray-800">{label}</p>
          {description && (
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
          value ? "bg-orange-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            value ? "translate-x-8" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  const ActionButton = ({ icon: Icon, label, description, onClick, variant = "default" }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-4 rounded-lg transition-colors text-left ${
        variant === "danger"
          ? "bg-red-50 hover:bg-red-100"
          : "bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <div className={`p-2 rounded-lg mt-0.5 ${
        variant === "danger"
          ? "bg-red-100 text-red-600"
          : "bg-orange-100 text-orange-600"
      }`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <p className={`font-medium ${
          variant === "danger" ? "text-red-700" : "text-gray-800"
        }`}>
          {label}
        </p>
        {description && (
          <p className="text-sm text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-500 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">{t.title}</h2>
          <p className="text-orange-100 text-sm mt-1">
            {selectedLanguage === "en" 
              ? "Customize your experience" 
              : "अपने अनुभव को अनुकूलित करें"}
          </p>
        </div>

        <div className="p-8">
          {/* Language Selection */}
          <SettingSection title={<><Globe className="inline" size={20} /> {t.language}</>}>
            <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  selectedLanguage === "en"
                    ? "bg-orange-600 text-white shadow-md"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300"
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange("hi")}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  selectedLanguage === "hi"
                    ? "bg-orange-600 text-white shadow-md"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300"
                }`}
              >
                हिन्दी
              </button>
            </div>
          </SettingSection>
          {showLogoutPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white rounded-xl shadow-lg w-96 p-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Are you sure you want to logout?
      </h3>
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={cancelLogout}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={confirmLogout}
          className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

{showChangePasswordPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white rounded-xl shadow-lg w-96 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
      <div className="space-y-3">
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={cancelChangePassword}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={submitChangePassword}
          className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}


          {/* Notifications & Appearance */}
          <SettingSection title={<><Bell className="inline" size={20} /> {t.notifications}</>}>
            <ToggleSetting
              icon={Bell}
              label={t.notifications}
              description={selectedLanguage === "en" 
                ? "Receive updates and alerts" 
                : "अपडेट और अलर्ट प्राप्त करें"}
              value={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            {/* <ToggleSetting
              icon={Moon}
              label={t.darkMode}
              description={selectedLanguage === "en" 
                ? "Switch to dark theme" 
                : "डार्क थीम पर स्विच करें"}
              value={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            /> */}
          </SettingSection>

          {/* Privacy & Security */}
          {/* <SettingSection title={<><Shield className="inline" size={20} /> {t.privacy}</>}>
            <ToggleSetting
              icon={Database}
              label={t.dataSharing}
              description={t.dataDesc}
              value={dataSharing}
              onChange={() => setDataSharing(!dataSharing)}
            />
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600 mt-0.5">
                  <Eye size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{t.profileVisibility}</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {selectedLanguage === "en" 
                      ? "Control who can see your profile" 
                      : "नियंत्रित करें कि आपकी प्रोफ़ाइल कौन देख सकता है"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 ml-11">
                {[
                  { value: "public", label: t.public },
                  { value: "friends", label: t.friendsOnly },
                  { value: "private", label: t.private }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setProfileVisibility(option.value)}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition ${
                      profileVisibility === option.value
                        ? "bg-orange-600 text-white"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </SettingSection> */}

          {/* Storage & Data */}
          {/* <SettingSection title={<><Database className="inline" size={20} /> {t.storage}</>}>
            <ActionButton
              icon={Trash2}
              label={t.clearCache}
              description={t.cacheDesc}
              onClick={() => console.log("Clear cache")}
            />
            <ActionButton
              icon={Download}
              label={t.downloadData}
              description={t.downloadDesc}
              onClick={() => console.log("Download data")}
            />
          </SettingSection> */}

          {/* Account Management */}
          <SettingSection title={<><Lock className="inline" size={20} /> {t.account}</>}>
          <ActionButton
  icon={Lock}
  label={t.changePassword}
  description={t.passwordDesc}
  onClick={handleChangePassword} // updated
/>

            <ActionButton
              icon={LogOut}
              label={t.logout}
              description={t.logoutDesc}
              onClick={handleLogout}
            />
            <ActionButton
              icon={Trash2}
              label={t.deleteAccount}
              description={t.deleteDesc}
              onClick={() => console.log("Delete account")}
              variant="danger"
            />
          </SettingSection>
        </div>
      </div>
    </div>
  );
};

export default Settings;