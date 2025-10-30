import React from "react";

export default function HeroSection() {
  return (
    <div className="bg-green-700 text-white py-16 px-6 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        Our Voice, Our Rights
      </h1>
      <p className="text-lg mb-8">
        Understand your district’s MGNREGA performance in simple language.
      </p>

      <div className="flex justify-center gap-4 flex-wrap">
        <select className="px-4 py-2 rounded-lg text-gray-800">
          <option>Select State</option>
          <option>Bihar</option>
          <option>Madhya Pradesh</option>
          <option>Uttar Pradesh</option>
        </select>

        <select className="px-4 py-2 rounded-lg text-gray-800">
          <option>Select District</option>
          <option>Patna</option>
          <option>Gaya</option>
          <option>Darbhanga</option>
        </select>

        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-2 rounded-lg font-semibold">
          View Report
        </button>
      </div>
    </div>
  );
}
