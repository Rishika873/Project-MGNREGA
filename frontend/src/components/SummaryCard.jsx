import React from "react";

export default function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-green-700 mt-2">{value}</p>
    </div>
  );
}
