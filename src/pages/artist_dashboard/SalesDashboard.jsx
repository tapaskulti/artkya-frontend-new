import React, { useState, useEffect } from "react";
import axios from "axios";

const SalesDashboard = () => {
  const [activeTab, setActiveTab] = useState("activeSales");
  const [salesRecords, setSalesRecords] = useState([]);
  const [allSalesData, setAllSalesData] = useState([]);

  useEffect(() => {
    // Dummy sales data
    const dummyData = [
      {
        artwork: "Artwork 1",
        orderDate: "2024-04-01",
        orderId: "12345",
        price: "$100",
        payoutAmount: "$80",
        status: "Completed",
        details: "Link to details"
      },
      {
        artwork: "Artwork 2",
        orderDate: "2024-04-02",
        orderId: "54321",
        price: "$150",
        payoutAmount: "$120",
        status: "Pending",
        details: "Link to details"
      },
      {
        artwork: "Artwork 3",
        orderDate: "2024-04-03",
        orderId: "67890",
        price: "$80",
        payoutAmount: "$60",
        status: "Completed",
        details: "Link to details"
      }
    ];

    setAllSalesData(dummyData);
    setSalesRecords(dummyData.filter(sale => sale.status === "Pending"));
    
    // Uncomment this block and replace with actual API endpoint
    /*
    axios.get("api/sales")
      .then(response => {
        setAllSalesData(response.data);
        setSalesRecords(response.data.filter(sale => sale.status === "Pending"));
      })
      .catch(error => {
        console.error("Error fetching sales data:", error);
      });
    */
  }, []);

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
          ACTIVE SALES ({salesRecords.length})
        </button>
        <button
          className={`${
            activeTab === "allSales"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          } px-4 py-2 rounded-md`}
          onClick={() => handleTabChange("allSales")}
        >
          ALL SALES ({allSalesData.length})
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-500 text-white">
            <tr className="font-bold ">
              <th className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-white">
                Artwork
              </th>
              <th className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-white">
                Order Date
              </th>
              <th className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-white">
                Order ID
              </th>
              <th className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-white">
                Price
              </th>
              <th className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-white">
                Payout Amount
              </th>
              <th className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-white">
                Status
              </th>
              <th className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-white">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(activeTab === "activeSales" ? salesRecords : allSalesData).map(
              (sale, index) => (
                <tr
                  key={sale.orderId}
                  className={`hover:bg-sky-50 ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                >
                  <td className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.artwork}</td>
                  <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.orderDate}</td>
                  <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.orderId}</td>
                  <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.price}</td>
                  <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.payoutAmount}</td>
                  <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.status}</td>
                  <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.details}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesDashboard;
