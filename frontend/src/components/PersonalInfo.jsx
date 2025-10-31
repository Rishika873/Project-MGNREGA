import { useSelector } from "react-redux";
import { useState } from "react";
import { User, Calendar, Phone, MapPin, Home, Mail, Edit2, Save, X } from "lucide-react";

const PersonalInfo = () => {
  const { user } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    contact: user?.contact || "",
    alternateContact: user?.alternateContact || "",
    email: user?.email || "",
    address: user?.address || "",
    village: user?.village || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved data:", formData);
    setIsEditing(false);
    // TODO: Call backend API to save changes
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.name || "",
      gender: user?.gender || "",
      dob: user?.dob || "",
      contact: user?.contact || "",
      alternateContact: user?.alternateContact || "",
      email: user?.email || "",
      address: user?.address || "",
      village: user?.village || "",
    });
    setIsEditing(false);
  };

  const InfoField = ({ icon: Icon, label, name, type = "text", options = null }) => (
    <div className="group">
      <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
        <div className="mt-1 p-2 rounded-full bg-orange-100 text-orange-600">
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {label}
          </label>
          {isEditing ? (
            options ? (
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              >
                <option value="">Select {label}</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            )
          ) : (
            <p className="text-base text-gray-900 font-medium truncate">
              {formData[name] || <span className="text-gray-400 italic">Not provided</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-500 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <User size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                <p className="text-orange-100 text-sm mt-0.5">
                  {isEditing ? "Edit your details below" : "View and manage your profile"}
                </p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium shadow-md"
              >
                <Edit2 size={18} />
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid gap-4">
            <InfoField icon={User} label="Full Name" name="fullName" />
            <InfoField 
              icon={User} 
              label="Gender" 
              name="gender" 
              options={["Male", "Female", "Other"]} 
            />
            <InfoField icon={Calendar} label="Date of Birth" name="dob" type="date" />
            <InfoField icon={Phone} label="Contact Number" name="contact" type="tel" />
            {/* <InfoField icon={Phone} label="Alternate Phone" name="alternateContact" type="tel" /> */}
            <InfoField icon={Mail} label="Email" name="email" type="email" />
            <InfoField icon={MapPin} label="Address" name="address" />
            {/* <InfoField icon={Home} label="Village" name="village" /> */}
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium shadow-md"
              >
                <Save size={20} />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <X size={20} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
