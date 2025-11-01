import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  IndianRupee,
  Building2,
  Leaf,
  Info,
  Globe,
  BarChart3,
  HeartHandshake,
} from "lucide-react";
import BackgroundImage from "../assets/mgnrega01.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

export default function Home({ stateName, districtName }) {
  const navigate = useNavigate();
  const { state, district } = useSelector((s) => s.location);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    console.log("❌ HOME SENT:", { state, district });
    setLoading(true);

    try {
      const res = await fetch(`${baseURL}/api/geo/reverse?lat=${lat}&lon=${lon}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state, district }),
      });

      console.log("🟢 Response status:", res.status);
      if (!res.ok) throw new Error("Failed to fetch data");

      const json = await res.json();

      if (json.records && json.records.length > 0) {
        const latestRecord = json.records[0];
        setData(latestRecord);
      } else {
        setData(null);
      }
    } catch (err) {
      console.error("❌ Error fetching data:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Home.jsx Redux location:", state, district);
    if (state && district) fetchData();
  }, [state, district]);

  const districtData = data
    ? {
        families: data.Total_No_of_Works_Takenup || 0,
        workdays:
          (data.Average_days_of_employment_provided_per_Household || 0) *
          (data.Total_Households_Worked || 0),
        workers: data.Total_Individuals_Worked || 0,
        avgWage: Number(data.Average_Wage_rate_per_day_per_person || 0).toFixed(
          2
        ),
        month: data.month || "नवीनतम",
        year: data.fin_year || "2025",
      }
    : null;

  return (
    <div>
      {/* 🌾 HERO SECTION */}
      <section
        className="relative w-full h-[85vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center px-6 max-w-3xl">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
          >
            जानिए आपके ज़िले में मनरेगा का प्रदर्शन
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-lg md:text-xl text-gray-200 mb-8"
          >
            सिर्फ अपना राज्य और ज़िला चुनिए, और देखें कितने लोगों को लाभ हुआ।
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-full text-lg shadow-lg transition flex items-center justify-center mx-auto cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            🔍 देखें प्रदर्शन (View Performance)
          </motion.button>
        </div>
      </section>

      {/* CASE 1: Location not detected */}
      {(!state || !district) && (
        <div className="py-20 bg-gray-50 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            📍 अपने ज़िले का मनरेगा प्रदर्शन देखने के लिए
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            कृपया नीचे दिए गए बटन पर क्लिक करके अपना स्थान पता करें।
          </p>
          <button
            onClick={() => {
              const e = new CustomEvent("detect-location");
              window.dispatchEvent(e);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
          >
            🔎 Detect My Location
          </button>
        </div>
      )}

      {/* CASE 2: Location detected but no data */}
      {state && district && !loading && !data && (
        <div className="py-20 bg-gray-50 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ⚠️ डेटा उपलब्ध नहीं — कृपया पुनः प्रयास करें
          </h2>
          <button
            onClick={fetchData}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
          >
            🔄 Fetch Data
          </button>
        </div>
      )}

      {/* CASE 3: Show data */}
      {data && (
        <div className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
              📊 ज़िला मनरेगा प्रदर्शन
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              📅 {districtData.month} • {districtData.year}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Total Families */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-green-500"
              >
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <Users className="text-green-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-700 text-lg mb-1">
                  कुल परिवार
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {districtData.families.toLocaleString("en-IN")}
                </p>
              </motion.div>

              {/* Total Workdays */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-blue-500"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <Building2 className="text-blue-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-700 text-lg mb-1">
                  कुल कार्यदिवस
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {districtData.workdays.toLocaleString("en-IN")}
                </p>
              </motion.div>

              {/* Total Workers */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-purple-500"
              >
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Users className="text-purple-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-700 text-lg mb-1">
                  कुल मजदूर
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {districtData.workers.toLocaleString("en-IN")}
                </p>
              </motion.div>

              {/* Avg Wage */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-yellow-500"
              >
                <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center mb-4">
                  <IndianRupee className="text-yellow-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-700 text-lg mb-1">
                  औसत मजदूरी / दिन
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  ₹{districtData.avgWage}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* 🙋‍♀️ ABOUT SECTION */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            🙋‍♀️ मनरेगा क्या है? (About MGNREGA)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex flex-col items-center">
              <Info className="w-14 h-14 text-green-600 mb-4" />
              <h3 className="font-semibold text-gray-700 text-lg">
                🌾 रोजगार की गारंटी
              </h3>
              <p className="text-gray-600 text-sm">
                MGNREGA ensures livelihood for rural families.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <HeartHandshake className="w-14 h-14 text-yellow-500 mb-4" />
              <h3 className="font-semibold text-gray-700 text-lg">
                👩‍🌾 ग्रामीण विकास
              </h3>
              <p className="text-gray-600 text-sm">
                Supports rural households through guaranteed work.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <BarChart3 className="w-14 h-14 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-700 text-lg">
                📊 प्रदर्शन समझें
              </h3>
              <p className="text-gray-600 text-sm">
                This website helps you see district performance.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Globe className="w-14 h-14 text-green-700 mb-4" />
              <h3 className="font-semibold text-gray-700 text-lg">
                🌍 सबके लिए सुलभ
              </h3>
              <p className="text-gray-600 text-sm">
                Data simplified for everyone to access easily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🦶 FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm mb-2">
            © {new Date().getFullYear()} Our Voice, Our Rights | MGNREGA Insights
          </p>
          <p className="text-xs text-gray-400">
            Built with ❤️ for transparency and empowerment.
          </p>
        </div>
      </footer>
    </div>
  );
}
