import React, { useState } from "react";
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
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BackgroundImage from "../assets/mgnrega01.jpg"
import { useNavigate } from "react-router-dom";


export default function Home() {

  const navigate = useNavigate();
  const [districtData, setDistrictData] = useState({
    households: "1,23,000",
    wages: "₹45 करोड़",
    works: "2,345",
    women: "48%",
    month: "अक्टूबर",
    year: "2025",
  });

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

      {/* 📊 DISTRICT PERFORMANCE SECTION */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
            📊 ज़िला प्रदर्शन (District Performance)
          </h2>

          <p className="text-gray-600 mb-8 text-lg">
            माह: <span className="font-semibold">{districtData.month}</span> | वर्ष:{" "}
            <span className="font-semibold">{districtData.year}</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center"
            >
              <Users className="text-green-600 w-12 h-12 mb-4" />
              <h3 className="font-semibold text-gray-800 text-lg mb-2">
                👨‍👩‍👧 कुल परिवार (Total Households)
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {districtData.households}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center"
            >
              <IndianRupee className="text-yellow-600 w-12 h-12 mb-4" />
              <h3 className="font-semibold text-gray-800 text-lg mb-2">
                💰 मजदूरी दी गई (Wages Paid)
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {districtData.wages}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center"
            >
              <Building2 className="text-blue-600 w-12 h-12 mb-4" />
              <h3 className="font-semibold text-gray-800 text-lg mb-2">
                🧱 पूर्ण कार्य (Work Completed)
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {districtData.works}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center"
            >
              <Leaf className="text-green-700 w-12 h-12 mb-4" />
              <h3 className="font-semibold text-gray-800 text-lg mb-2">
                🌾 महिला भागीदारी (Women Participation)
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {districtData.women}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 📉 CHARTS / VISUAL INSIGHTS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            📈 दृश्य अंतर्दृष्टि (Visual Insights)
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Line Chart */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                🧱 कार्य पूर्ण प्रति माह (Work Completed per Month)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={workData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="work" stroke="#22c55e" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                💰 मजदूरी भुगतान प्रति माह (Wages Paid across Months)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={wageData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="wages" fill="#facc15" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                👩‍🌾 महिला बनाम पुरुष (Women vs Men Participation)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
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
