import React from "react";
import HeroSection from "./HeroSection";
import SummaryCard from "./SummaryCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Summary Section */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          District Performance Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard title="Households Worked" value="12,54,302" icon="🏠" />
          <SummaryCard title="Total Person-Days" value="4.8 Cr" icon="👷‍♂️" />
          <SummaryCard title="Average Wage Paid" value="₹245/day" icon="💰" />
          <SummaryCard title="Women Workers" value="58%" icon="👩‍🌾" />
        </div>
      </section>

      {/* Chart Section */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Monthly Performance
        </h2>

        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          📊 Chart will appear here (e.g., Bar/Line chart)
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-4 mt-10">
        <p>Data Source: data.gov.in | © 2025 Our Voice, Our Rights</p>
      </footer>
    </div>
  );
}
