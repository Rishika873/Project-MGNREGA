import React, { useState } from "react";
import { Info } from "lucide-react";

const InfoDropdown = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Info Icon */}
      <Info
        className="w-6 h-6 text-white cursor-pointer hover:text-green-100 transition-colors"
        onClick={() => setShowInfo(!showInfo)}
      />

      {/* Dropdown Box */}
      {showInfo && (
        <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-xl shadow-lg p-4 z-50 border border-gray-200">
          <h3 className="text-orange-500 font-semibold text-lg mb-2">About MGNREGA</h3>
          <p className="text-sm leading-relaxed">
            MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act) ensures 
            livelihood security by providing at least 100 days of wage employment in 
            a financial year to every rural household whose adult members volunteer 
            to do unskilled manual work.
          </p>

          <button
            className="mt-3 text-sm text-orange-600 hover:underline"
            onClick={() => setShowInfo(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default InfoDropdown;
