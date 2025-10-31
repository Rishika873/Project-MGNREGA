import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Loader2, Search, TrendingUp, Users, Briefcase, Award, Calendar, MapPin, ArrowUpRight, ArrowDownRight, IndianRupee, Hammer, UserCheck, Clock, Activity, Building2, Download, RefreshCw, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [stateName, setStateName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    console.log("✅ DASHBOARD SENDING:", {
  state: stateName,
  district: districtName
});

    if (!stateName || !districtName) {
      setError("Please enter both State and District name.");
      return;
    }

    setError("");
    setLoading(true);
    setData([]);

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

  const materialCost = data && data.length > 0 
    ? parseFloat(data[0]?.Material_and_skilled_Wages || 0)
    : 0;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  const calculateTrend = (dataArray, key) => {
    if (!dataArray || dataArray.length < 2) return null;
    const current = parseFloat(dataArray[0]?.[key]) || 0;
    const previous = parseFloat(dataArray[1]?.[key]) || 0;
    if (previous === 0) return null;
    const change = ((current - previous) / previous) * 100;
    return { change: change.toFixed(1), isPositive: change >= 0 };
  };

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
  const totalWorksStarted = data[0]?.Total_No_of_Works_Takenup || 0;
  
  const getTotalExpenditure = () => {
    if (!data || data.length === 0) return 0;
    const latest = data[0];
    if (latest.Total_Expenditure) return parseFloat(latest.Total_Expenditure);
    const wages = parseFloat(latest.Exp_on_Wages || 0);
    const materials = parseFloat(latest.Exp_on_Materials || 0);
    const admin = parseFloat(latest.Adm_Exp || 0);
    return wages + materials + admin;
  };

  const totalExpenditure = getTotalExpenditure();

  const MetricCard = ({ icon: Icon, title, titleHi, value, suffix = "", trend, color, gradient }) => (
    <div className={`group relative bg-white rounded-2xl shadow-lg p-6 border-l-4 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${color}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 rounded-full -mr-16 -mt-16" style={{background: gradient}}></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="p-3 rounded-xl shadow-md flex items-center justify-center" style={{ background: gradient }}>
  <Icon className="text-white" size={24} />
</div>

          {trend && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
              trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {trend.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {Math.abs(trend.change)}%
            </div>
          )}
        </div>
        <div className="space-y-1 mb-3">
          <p className="text-gray-700 text-sm font-semibold">{titleHi}</p>
          <p className="text-gray-500 text-xs">{title}</p>
        </div>
        <p className="text-3xl font-bold text-gray-900 flex items-baseline gap-1">
          {value}
          {suffix && <span className="text-base text-gray-500 font-normal">{suffix}</span>}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
         
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-600 to-orange-600 bg-clip-text text-transparent mb-3">
            MGNREGA Dashboard
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-medium">मनरेगा प्रदर्शन विश्लेषण | Real-time Performance Analytics</p>
        </div>

        {/* Enhanced Search Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10 border border-gray-100 backdrop-orange-sm">
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <MapPin size={18} className="text-orange-600" />
                राज्य | State Name
              </label>
              <input
                type="text"
                placeholder="e.g., Maharashtra, Madhya Pradesh"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all text-gray-800 font-medium placeholder:text-gray-400"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <MapPin size={18} className="text-orange-600" />
                जिला | District Name
              </label>
              <input
                type="text"
                placeholder="e.g., Pune, Indore"
                value={districtName}
                onChange={(e) => setDistrictName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all text-gray-800 font-medium placeholder:text-gray-400"
              />
            </div>
            <div className="w-full md:w-auto">
              <button
                onClick={fetchData}
                disabled={loading}
                className="bg-gradient-to-r from-orange-600 via-orange-600 to-orange-600 text-white px-10 py-4 rounded-xl hover:shadow-2xl transition-all flex items-center gap-3 font-bold shadow-xl disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto justify-center group"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={22} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search size={22} className="group-hover:scale-110 transition-transform" />
                    Analyze Data
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-3xl shadow-2xl p-16 text-center border border-gray-100">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <Loader2 className="animate-spin text-orange-600" size={40} />
            </div>
            <p className="text-gray-700 text-2xl font-bold mb-2">Fetching MGNREGA Data</p>
            <p className="text-gray-500 text-base">Please wait while we retrieve the latest information...</p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <div>
                <p className="font-bold text-red-800 text-lg">Error</p>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Data Display Section */}
        {data && data.length > 0 && (
          <div className="space-y-8">
            {/* Enhanced Location Header */}
            <div className="bg-gradient-to-r from-green-600 via-green-600 to-green-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
              <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-orange-100 text-sm font-semibold mb-2 flex items-center gap-2">
                    <MapPin size={16} />
                    Performance Report For
                  </p>
                  <h2 className="text-4xl md:text-4xl font-bold mb-1">{districtName}, {stateName}</h2>
                  <p className="text-orange-100 text-sm mt-3 flex items-center gap-2">
                    <Calendar size={16} />
                    Latest Data • Updated Today
                  </p>
                </div>
                
              </div>
            </div>
            
            {/* Metrics Sections */}
            <div className="space-y-8">
              {/* Employment Generation */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-orange-100 rounded-xl">
                    <Users className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">रोजगार सृजन</h3>
                    <p className="text-gray-500 text-sm">Employment Generation</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricCard
                    icon={Users}
                    titleHi="काम करने वाले परिवार"
                    title="Total Families"
                    value={(data[0]?.Total_No_of_Works_Takenup || 0).toLocaleString()}
                    trend={calculateTrend(data, 'Total_No_of_Works_Takenup')}
                    color="border-orange-500"
                    gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
                  />
                  <MetricCard
                    icon={UserCheck}
                    titleHi="कुल मजदूर"
                    title="Total Workers"
                    value={(data[0]?.Total_Individuals_Worked || 0).toLocaleString()}
                    trend={calculateTrend(data, 'Total_Individuals_Worked')}
                    color="border-cyan-500"
                    gradient="linear-gradient(135deg, #06b6d4, #0891b2)"
                  />
                  <MetricCard
                    icon={TrendingUp}
                    titleHi="कुल काम के दिन"
                    title="Total Work Days"
                    value={totalWorkDays.toLocaleString('en-IN')}
                    trend={calculateTrend(data, 'persondays_generated_lakh')}
                    color="border-green-500"
                    gradient="linear-gradient(135deg, #10b981, #059669)"
                  />
                  <MetricCard
                    icon={Award}
                    titleHi="100 दिन पूरे किए"
                    title="100 Days Completed"
                    value={(data[0]?.Total_No_of_HHs_completed_100_Days_of_Wage_Employment || 0).toLocaleString()}
                    suffix="families"
                    color="border-emerald-500"
                    gradient="linear-gradient(135deg, #34d399, #10b981)"
                  />
                </div>
              </div>

              {/* Financial Performance */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <IndianRupee className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">वित्तीय प्रदर्शन</h3>
                    <p className="text-gray-500 text-sm">Financial Performance</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricCard
                    icon={IndianRupee}
                    titleHi="औसत मजदूरी"
                    title="Average Wage/Day"
                    value={`₹${Number(data[0]?.Average_Wage_rate_per_day_per_person || 0).toFixed(2)}`}

                    color="border-yellow-500"
                    gradient="linear-gradient(135deg, #fbbf24, #f59e0b)"
                  />
                  <MetricCard
                    icon={IndianRupee}
                    titleHi="कुल खर्च"
                    title="Total Expenditure"
                    value={`₹${totalExpenditure.toLocaleString('en-IN')}`}
                    suffix="Cr"
                    color="border-orange-500"
                    gradient="linear-gradient(135deg, #fb923c, #f97316)"
                  />
                  <MetricCard
                    icon={Users}
                    titleHi="मजदूरी भुगतान"
                    title="Wages Paid"
                    value={`₹${data[0]?.Wages?.toLocaleString("en-IN") || "N/A"}`}
                    suffix="Cr"
                    color="border-red-500"
                    gradient="linear-gradient(135deg, #f87171, #ef4444)"
                  />
                  <MetricCard
                    icon={Hammer}
                    titleHi="सामग्री खर्च"
                    title="Material Cost"
                    value={`₹${materialCost.toLocaleString('en-IN')}`}
                    suffix="Cr"
                    color="border-pink-500"
                    gradient="linear-gradient(135deg, #f472b6, #ec4899)"
                  />
                </div>
              </div>

              {/* Work Progress */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-orange-100 rounded-xl">
                    <Briefcase className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">कार्य प्रगति</h3>
                    <p className="text-gray-500 text-sm">Work Progress</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricCard
                    icon={Briefcase}
                    titleHi="शुरू किए गए कार्य"
                    title="Total Works Started"
                    value={totalWorksStarted.toLocaleString()}
                    color="border-orange-500"
                    gradient="linear-gradient(135deg, #818cf8, #6366f1)"
                  />
                  <MetricCard
                    icon={Award}
                    titleHi="पूरे हुए कार्य"
                    title="Works Completed"
                    value={(data[0]?.Number_of_Completed_Works || 0).toLocaleString()}
                    trend={calculateTrend(data, 'Number_of_Completed_Works')}
                    color="border-green-500"
                    gradient="linear-gradient(135deg, #4ade80, #22c55e)"
                  />
                  <MetricCard
                    icon={Activity}
                    titleHi="चल रहे कार्य"
                    title="Ongoing Works"
                    value={(data[0]?.Number_of_Ongoing_Works || 0).toLocaleString()}
                    color="border-amber-500"
                    gradient="linear-gradient(135deg, #fbbf24, #f59e0b)"
                  />
                  <MetricCard
                    icon={Building2}
                    titleHi="निष्क्रिय ग्राम पंचायत"
                    title="Inactive GPs"
                    value={(data[0]?.Number_of_GPs_with_NIL_exp || 0).toLocaleString()}
                    color="border-slate-500"
                    gradient="linear-gradient(135deg, #94a3b8, #64748b)"
                  />
                </div>
              </div>

              {/* Social Inclusion */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-orange-100 rounded-xl">
                    <Users className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">सामाजिक समावेश</h3>
                    <p className="text-gray-500 text-sm">Social Inclusion</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricCard
                    icon={Users}
                    titleHi="महिला भागीदारी"
                    title="Women Participation"
                    value={womenParticipation || "N/A"}
                    suffix="%"
                    color="border-orange-500"
                    gradient="linear-gradient(135deg, #a78bfa, #8b5cf6)"
                  />
                  <MetricCard
                    icon={Users}
                    titleHi="अनुसूचित जाति"
                    title="SC Workers"
                    value={(data[0]?.SC_persondays || 0).toLocaleString()}
                    color="border-violet-500"
                    gradient="linear-gradient(135deg, #c084fc, #a855f7)"
                  />
                  <MetricCard
                    icon={Users}
                    titleHi="अनुसूचित जनजाति"
                    title="ST Workers"
                    value={(data[0]?.ST_persondays || 0).toLocaleString()}
                    color="border-fuchsia-500"
                    gradient="linear-gradient(135deg, #e879f9, #d946ef)"
                  />
                  <MetricCard
                    icon={UserCheck}
                    titleHi="दिव्यांग मजदूर"
                    title="Disabled Workers"
                    value={(data[0]?.Differently_abled_persons_worked || 0).toLocaleString()}
                    color="border-rose-500"
                    gradient="linear-gradient(135deg, #fb7185, #f43f5e)"
                  />
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