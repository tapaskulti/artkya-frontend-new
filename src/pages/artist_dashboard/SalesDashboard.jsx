import React, { useState } from "react";

const SalesDashboard = () => {
  const [activeTab, setActiveTab] = useState("activeSales");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex py-3 mx-2">
        <button
          className={`${
            activeTab === "activeSales"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          } px-4 py-2 mr-2 rounded-md`}
          onClick={() => handleTabChange("activeSales")}
        >
          ACTIVE SALES (0)
        </button>
        <button
          className={`${
            activeTab === "allSales"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          } px-4 py-2 rounded-md`}
          onClick={() => handleTabChange("allSales")}
        >
          ALL
        </button>
      </div>
      <table className="min-w-full mt-4">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-200 text-gray-600 font-semibold text-sm uppercase border-b border-gray-300">
              Artwork
            </th>
            <th className="px-6 py-3 bg-gray-200 text-gray-600 font-semibold text-sm uppercase border-b border-gray-300">
              Order Date
            </th>
            <th className="px-6 py-3 bg-gray-200 text-gray-600 font-semibold text-sm uppercase border-b border-gray-300">
              Order ID
            </th>
            <th className="px-6 py-3 bg-gray-200 text-gray-600 font-semibold text-sm uppercase border-b border-gray-300">
              Price
            </th>
            <th className="px-6 py-3 bg-gray-200 text-gray-600 font-semibold text-sm uppercase border-b border-gray-300">
              Payout Amount
            </th>
            <th className="px-6 py-3 bg-gray-200 text-gray-600 font-semibold text-sm uppercase border-b border-gray-300">
              Status
            </th>
            <th className="px-6 py-3 bg-gray-200 text-gray-600 font-semibold text-sm uppercase border-b border-gray-300">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          <p>You currently do not have any active sales.</p>
        </tbody>
      </table>
    </div>
  );
};
export default SalesDashboard;
