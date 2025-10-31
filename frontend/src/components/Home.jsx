import React, { useState , useEffect } from "react";
import { motion } from "framer-motion";
import {Users,IndianRupee,Building2,Leaf,Info,Globe,BarChart3,HeartHandshake,} from "lucide-react";
import {LineChart,Line,BarChart,Bar,PieChart,Pie,Cell,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer} from "recharts";
import BackgroundImage from "../assets/mgnrega01.jpg"
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import axios from "axios";


export default function Home({stateName, districtName }) {

  const navigate = useNavigate();
  const { state, district } = useSelector((s) => s.location);
  const [data, setData] = useState(null);
  const API_KEY = import.meta.env.DATA_API_KEY;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [workdaysTrend, setWorkdaysTrend] = useState([]);


   
const fetchData = async () => {
 console.log("❌ HOME SENT:", {
  state,
  district
});

  
  setLoading(true);   // ✅ Start loading

  try {
    const res = await fetch("http://localhost:5000/api/mgnrega/performance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state, district }),
    });

    console.log("🟢 Response status:", res.status);

    if (!res.ok) throw new Error("Failed to fetch data");

    const json = await res.json();
if (json.records && json.records.length > 0) {

  // ✅ Month normalization map
const monthMap = {
  "Apr": "April",
  "April": "April",
  "May": "May",
  "Jun": "June",
  "June": "June",
  "Jul": "July",
  "July": "July",
  "Aug": "August",
  "August": "August",
  "Sep": "September",
  "Sept": "September",
  "September": "September",
  "Oct": "October",
  "October": "October",
  "Nov": "November",
  "November": "November",
  "Dec": "December",
  "December": "December",
  "Jan": "January",
  "January": "January",
  "Feb": "February",
  "February": "February",
  "Mar": "March",
  "March": "March",
};


  // ✅ Build Workdays Trend Chart Data (All months)
  let workdaysTrendData = json.records.map((item) => {
    const avgDays = Number(item.Average_days_of_employment_provided_per_Household) || 0;
    const households = Number(item.Total_Households_Worked) || 0;

    const fullMonth = monthMap[item.month] || item.month;

    return {
      month: fullMonth,
      workdays: Number(avgDays * households) || 0
    };
  });

  // ✅ Correct financial year sorting
  const monthOrder = [
  "April","May","June","July","August","September","October",
  "November","December","January","February","March"
];

workdaysTrendData.sort((a, b) => 
  monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
);


  // ✅ Save sorted trend
  setWorkdaysTrend(workdaysTrendData);
  console.log("✅ CLEAN trend chart data:", workdaysTrendData);

  // ✅ Pick latest record using mapped month
  const latestRecord = json.records.sort((a, b) => {
    const monthA = monthMap[a.month] || a.month;
    const monthB = monthMap[b.month] || b.month;
    return monthOrder.indexOf(monthB) - monthOrder.indexOf(monthA);
  })[0];

  setData(latestRecord);
}


else {
  setData(null);
}

  } catch (err) {
    console.error("❌ Error fetching data:", err);
    setData(null);
  } finally {
    setLoading(false);   // ✅ Always stop loading, even on error
  }
};


useEffect(() => {
  console.log("Home.jsx Redux location:", state, district);
  if (state && district) {
    fetchData();
  }
}, [state, district]);


const districtData = data
  ? {
      families: data.Total_No_of_Works_Takenup || 0, // ✅ same as Dashboard
      workdays:
        (data.Average_days_of_employment_provided_per_Household || 0) *
        (data.Total_Households_Worked || 0),           // ✅ same as Dashboard
      workers: data.Total_Individuals_Worked || 0,     // ✅ same as Dashboard
      avgWage: Number(data.Average_Wage_rate_per_day_per_person || 0).toFixed(2),

      month: data.month || "नवीनतम",
      year: data.fin_year || "2025"
    }
  : null;




  const workData = [
    { month: "जन", work: 120 },
    { month: "फर", work: 180 },
    { month: "मार्च", work: 240 },
    { month: "अप्रै", work: 200 },
    { month: "मई", work: 270 },
    { month: "जून", work: 320 },
  ];

  const wageData = [
    { month: "जन", wages: 15 },
    { month: "फर", wages: 22 },
    { month: "मार्च", wages: 30 },
    { month: "अप्रै", wages: 28 },
    { month: "मई", wages: 34 },
    { month: "जून", wages: 40 },
  ];

  const genderData = [
    { name: "महिला (Women)", value: 48 },
    { name: "पुरुष (Men)", value: 52 },
  ];

  const COLORS = ["#facc15", "#22c55e"];

  return (
    <div>
      {/* 🌾 HERO SECTION */}
      <section
        className="relative w-full h-[85vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            `url(${BackgroundImage})`,
        }}
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
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-full text-lg shadow-lg transition flex items-center justify-center mx-auto 
            cursor-pointer" onClick={() => navigate('/dashboard')}
          >
            🔍 देखें प्रदर्शन (View Performance)
          </motion.button>
        </div>
      </section>


     {/* ✅ CASE 1: User has NOT detected location */}
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

{/* ✅ CASE 2: Location detected but NO data loaded yet */}
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

{/* ✅ CASE 3: Data is available → show district performance */}
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

        {/* ✅ Total Families */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-green-500"
        >
          <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
            <Users className="text-green-600" size={32} />
          </div>
          <h3 className="font-semibold text-gray-700 text-lg mb-1">कुल परिवार</h3>
          <p className="text-3xl font-bold text-gray-900">
            {districtData.families.toLocaleString("en-IN")}
          </p>
        </motion.div>

        {/* ✅ Total Workdays */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-blue-500"
        >
          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
            <Building2 className="text-blue-600" size={32} />
          </div>
          <h3 className="font-semibold text-gray-700 text-lg mb-1">कुल कार्यदिवस</h3>
          <p className="text-3xl font-bold text-gray-900">
            {districtData.workdays.toLocaleString("en-IN")}
          </p>
        </motion.div>

        {/* ✅ Total Workers */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-purple-500"
        >
          <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
            <Users className="text-purple-600" size={32} />
          </div>
          <h3 className="font-semibold text-gray-700 text-lg mb-1">कुल मजदूर</h3>
          <p className="text-3xl font-bold text-gray-900">
            {districtData.workers.toLocaleString("en-IN")}
          </p>
        </motion.div>

        {/* ✅ Avg Wage */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-yellow-500"
        >
          <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center mb-4">
            <IndianRupee className="text-yellow-600" size={32} />
          </div>
          <h3 className="font-semibold text-gray-700 text-lg mb-1">औसत मजदूरी / दिन</h3>
          <p className="text-3xl font-bold text-gray-900">
            ₹{districtData.avgWage}
          </p>
        </motion.div>

      </div>
    </div>
  </div>
)}




      {/* 📉 CHARTS / VISUAL INSIGHTS SECTION */}
      {data && (
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
      📈 दृश्य अंतर्दृष्टि (Visual Insights)
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* Line Chart */}
  <div className="bg-gray-50 rounded-2xl p-6 shadow-md w-full h-[320px]">
  <h3 className="text-lg font-semibold text-gray-700 mb-4">
    🧱 कार्य पूर्ण प्रति माह
  </h3>

<ResponsiveContainer width="100%" height={250}>

  <LineChart data={workdaysTrend}>
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="workdays" stroke="#22c55e" strokeWidth={3} />
  </LineChart>
</ResponsiveContainer>

</div>


      {/* Bar Chart */}
      <div className="bg-gray-50 rounded-2xl p-6 shadow-md w-full h-[320px]">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          💰 मजदूरी भुगतान प्रति माह
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={wageData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="wages" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-gray-50 rounded-2xl p-6 shadow-md w-full h-[320px]">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          👩‍🌾 महिला बनाम पुरुष
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={genderData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {genderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  </div>
</section>


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
