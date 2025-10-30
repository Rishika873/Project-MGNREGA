import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Loader2, Search, TrendingUp, Users, Briefcase, Award, Calendar, MapPin, ArrowUpRight, ArrowDownRight, IndianRupee, Hammer, UserCheck, Clock, Activity, Building2 } from "lucide-react";

const Dashboard = () => {
  const [stateName, setStateName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

const fetchData = async () => {
  if (!stateName || !districtName) {
    setError("Please enter both State and District name.");
    return;
  }

  setError("");
  setLoading(true);
  setData(null);

  try {
   const res = await fetch("http://localhost:5000/api/mgnrega/performance", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    state: stateName,
    district: districtName,
  }),
});


    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const json = await res.json();
    setData(json.records || []);
  } catch (err) {
    console.error(err);
    setError("Error fetching data. Please try again later.");
  } finally {
    setLoading(false);
  }
};

const materialCost = parseFloat(data[0]?.Material_and_skilled_Wages || 0);


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  // Calculate trend
  const calculateTrend = (dataArray, key) => {
    if (!dataArray || dataArray.length < 2) return null;
    const current = parseFloat(dataArray[0]?.[key]) || 0;
    const previous = parseFloat(dataArray[1]?.[key]) || 0;
    if (previous === 0) return null;
    const change = ((current - previous) / previous) * 100;
    return { change: change.toFixed(1), isPositive: change >= 0 };
  };

  // after getWorkStatusData()
const totalWorkDays =
  (data[0]?.Average_days_of_employment_provided_per_Household || 0) *
  (data[0]?.Total_Households_Worked || 0);



const getWomenParticipation = () => {
  if (!data || data.length === 0) return 0;
  const latest = data[0];

  const womenPersondays = parseFloat(latest.Women_Persondays || 0);
  const totalPersondays = parseFloat(latest.Persondays_of_Central_Liability_so_far || 0);

  if (totalPersondays === 0) return 0;

  const participation = (womenPersondays / totalPersondays) * 100;
  return participation.toFixed(2);
};

const womenParticipation = getWomenParticipation();

const getTotalWorksStarted = () => {
  if (!data || data.length === 0) return 0;
  const latest = data[0];
  return parseFloat(latest.Total_No_of_Works_Takenup || 0);
};

const totalWorksStarted = getTotalWorksStarted();

const getTotalExpenditure = () => {
  if (!data || data.length === 0) return 0;
  const latest = data[0];
  
  // Check for direct field
  if (latest.Total_Expenditure) return parseFloat(latest.Total_Expenditure);

  // Or calculate if only components are given
  const wages = parseFloat(latest.Exp_on_Wages || 0);
  const materials = parseFloat(latest.Exp_on_Materials || 0);
  const admin = parseFloat(latest.Adm_Exp || 0);

  return wages + materials + admin;
};

const totalExpenditure = getTotalExpenditure();

// Format as Indian Rupees (₹)
const formattedExpenditure = totalExpenditure.toLocaleString("en-IN", {
  style: "currency",
  currency: "INR",
});

console.log("Total Expenditure:", formattedExpenditure);







  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Briefcase className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            MGNREGA Performance Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Real-time district performance analytics and insights</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-blue-600" />
                State Name
              </label>
              <input
                type="text"
                placeholder="e.g., Maharashtra"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-indigo-600" />
                District Name
              </label>
              <input
                type="text"
                placeholder="e.g., Pune"
                value={districtName}
                onChange={(e) => setDistrictName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="md:mt-7">
              <button
                onClick={fetchData}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto justify-center"
              >
                <Search size={20} /> 
                {loading ? "Searching..." : "Analyze"}
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
            <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
            <p className="text-gray-600 text-lg font-medium">Fetching MGNREGA performance data...</p>
            <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 p-5 rounded-2xl text-center mb-6 shadow-lg">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Data Display Section */}
        {data && data.length > 0 && (
          <div className="space-y-6">
            {/* Location Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Performance Report For</p>
                  <h2 className="text-3xl font-bold">{districtName}, {stateName}</h2>
                  <p className="text-blue-100 text-sm mt-2 flex items-center gap-2">
                    <Calendar size={16} />
                    Latest Data Available
                  </p>
                </div>
                <div className="hidden md:block">
                  <Award size={64} className="text-blue-300 opacity-50" />
                </div>
              </div>
            </div>
            
            {/* Key Metrics - Expanded */}
            <div className="space-y-4">
              {/* Section 1: Employment Generation */}
              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Users className="text-blue-600" size={20} />
                  रोजगार सृजन | Employment Generation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-blue-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-blue-100 p-2.5 rounded-xl">
                        <Users className="text-blue-600" size={20} />
                      </div>
                      {calculateTrend(data, 'Total_No_of_Works_Takenup') && (
                        <div className={`flex items-center gap-1 text-xs font-semibold ${
                          calculateTrend(data, 'Total_No_of_Works_Takenup').isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {calculateTrend(data, 'Total_No_of_Works_Takenup').isPositive ? (
                            <ArrowUpRight size={14} />
                          ) : (
                            <ArrowDownRight size={14} />
                          )}
                          {Math.abs(calculateTrend(data, 'Total_No_of_Works_Takenup').change)}%
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">काम करने वाले परिवार</p>
                    <p className="text-gray-500 text-xs mb-2">Total Families</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {(data[0]?.Total_No_of_Works_Takenup || 0).toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-cyan-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-cyan-100 p-2.5 rounded-xl">
                        <UserCheck className="text-cyan-600" size={20} />
                      </div>
                      {calculateTrend(data, 'Total_Individuals_Worked') && (
                        <div className={`flex items-center gap-1 text-xs font-semibold ${
                          calculateTrend(data, 'Total_Individuals_Worked').isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {calculateTrend(data, 'Total_Individuals_Worked').isPositive ? (
                            <ArrowUpRight size={14} />
                          ) : (
                            <ArrowDownRight size={14} />
                          )}
                          {Math.abs(calculateTrend(data, 'Total_Individuals_Worked').change)}%
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">कुल मजदूर</p>
                    <p className="text-gray-500 text-xs mb-2">Total Workers</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {(data[0]?.Total_Individuals_Worked || 0).toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-green-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-green-100 p-2.5 rounded-xl">
                        <TrendingUp className="text-green-600" size={20} />
                      </div>
                      {calculateTrend(data, 'persondays_generated_lakh') && (
                        <div className={`flex items-center gap-1 text-xs font-semibold ${
                          calculateTrend(data, 'persondays_generated_lakh').isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {calculateTrend(data, 'persondays_generated_lakh').isPositive ? (
                            <ArrowUpRight size={14} />
                          ) : (
                            <ArrowDownRight size={14} />
                          )}
                          {Math.abs(calculateTrend(data, 'persondays_generated_lakh').change)}%
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">कुल काम के दिन</p>
                    <p className="text-gray-500 text-xs mb-2">Total Work Days</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {totalWorkDays.toLocaleString('en-IN')} <span className="text-sm text-gray-500"></span>
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-emerald-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-emerald-100 p-2.5 rounded-xl">
                        <Award className="text-emerald-600" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">100 दिन पूरे किए</p>
                    <p className="text-gray-500 text-xs mb-2">100 Days Completed</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {(data[0]?.Total_No_of_HHs_completed_100_Days_of_Wage_Employment || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">families</p>
                  </div>
                </div>
              </div>
               {/* Section 2: Financial Performance */}
              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <IndianRupee className="text-green-600" size={20} />
                  वित्तीय प्रदर्शन | Financial Performance
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-yellow-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-yellow-100 p-2.5 rounded-xl">
                        <IndianRupee className="text-yellow-600" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">औसत मजदूरी</p>
                    <p className="text-gray-500 text-xs mb-2">Average Wage/Day</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ₹{((data[0]?.Average_Wage_rate_per_day_per_person || 0) / 1).toFixed(2)}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-orange-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-orange-100 p-2.5 rounded-xl">
                        <IndianRupee className="text-orange-600" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">कुल खर्च</p>
                    <p className="text-gray-500 text-xs mb-2">Total Expenditure</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ₹{totalExpenditure.toLocaleString('en-IN')} <span className="text-sm text-gray-500">Cr</span>
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-red-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-red-100 p-2.5 rounded-xl">
                        <Users className="text-red-600" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">मजदूरी भुगतान</p>
                    <p className="text-gray-500 text-xs mb-2">Wages Paid</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ₹{data[0]?.Wages?.toLocaleString("en-IN") || "N/A"}<span className="text-sm text-gray-500">Cr</span>
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-pink-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-pink-100 p-2.5 rounded-xl">
                        <Hammer className="text-pink-600" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">सामग्री खर्च</p>
                    <p className="text-gray-500 text-xs mb-2">Material Cost</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ₹{((data[0]?.materialCost  || 0) / 1).toFixed(2)} <span className="text-sm text-gray-500">Cr</span>
                    </p>
                  </div>
                </div>
              </div>
               {/* Section 3: Work Progress */}
              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Briefcase className="text-orange-600" size={20} />
                  कार्य प्रगति | Work Progress
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-indigo-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-indigo-100 p-2.5 rounded-xl">
                        <Briefcase className="text-indigo-600" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">शुरू किए गए कार्य</p>
                    <p className="text-gray-500 text-xs mb-2">Total Works Started</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {(totalWorksStarted  || 0).toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-green-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-green-100 p-2.5 rounded-xl">
                        <Award className="text-green-600" size={20} />
                      </div>
                      {calculateTrend(data, 'Number_of_Completed_Works') && (
                        <div className={`flex items-center gap-1 text-xs font-semibold ${
                          calculateTrend(data, 'Number_of_Completed_Works').isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {calculateTrend(data, 'Number_of_Completed_Works').isPositive ? (
                            <ArrowUpRight size={14} />
                          ) : (
                            <ArrowDownRight size={14} />
                          )}
                          {Math.abs(calculateTrend(data, 'Number_of_Completed_Works').change)}%
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">पूरे हुए कार्य</p>
                    <p className="text-gray-500 text-xs mb-2">Works Completed</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {(data[0]?.Number_of_Completed_Works || 0).toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-amber-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-amber-100 p-2.5 rounded-xl">
                        <Activity className="text-amber-600" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">चल रहे कार्य</p>
                    <p className="text-gray-500 text-xs mb-2">Ongoing Works</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {(data[0]?.Number_of_Ongoing_Works || 0).toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-slate-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-slate-100 p-2.5 rounded-xl">
                        <Building2 className="text-slate-600" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">निष्क्रिय ग्राम पंचायत</p>
                    <p className="text-gray-500 text-xs mb-2">Inactive GPs</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {(data[0]?.Number_of_GPs_with_NIL_exp || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              {/* Section 4: Social Inclusion */}
              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Users className="text-purple-600" size={20} />
                  सामाजिक समावेश | Social Inclusion
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-purple-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-purple-100 p-2.5 rounded-xl">
                        <Users className="text-purple-600" size={20} />
                      </div>
                

                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">महिला भागीदारी</p>
                    <p className="text-gray-500 text-xs mb-2">Women Participation</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {womenParticipation || "N/A"}<span className="text-lg text-gray-500">%</span>
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-violet-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-violet-100 p-2.5 rounded-xl">
                        <Users className="text-violet-600" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">अनुसूचित जाति</p>
                    <p className="text-gray-500 text-xs mb-2">SC Workers</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {(data[0]?.SC_persondays || 0).toLocaleString()} <span className="text-sm text-gray-500"></span>
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-fuchsia-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-fuchsia-100 p-2.5 rounded-xl">
                        <Users className="text-fuchsia-600" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">अनुसूचित जनजाति</p>
                    <p className="text-gray-500 text-xs mb-2">ST Workers</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {(data[0]?.ST_persondays || 0).toLocaleString()}  <span className="text-sm text-gray-500"></span>
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4 border-rose-500 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-rose-100 p-2.5 rounded-xl">
                        <UserCheck className="text-rose-600" size={20} />
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs font-medium mb-1">दिव्यांग मजदूर</p>
                    <p className="text-gray-500 text-xs mb-2">Disabled Workers</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {(data[0]?.Differently_abled_persons_worked || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

           </div>
           </div>
   
        )}
        </div>
        </div>
   
  );
};

export default Dashboard;