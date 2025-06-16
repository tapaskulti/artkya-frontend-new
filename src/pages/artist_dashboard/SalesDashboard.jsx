/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { DollarSign, Package, Search, Filter, Calendar } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-3 bg-gray-100 rounded-full">
        <Icon className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  </div>
);

// Main Sales Dashboard Component
const SalesDashboard = ({ artistArtworks = [] }) => {
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filteredArtworks, setFilteredArtworks] = useState([]);

  // Mock data - replace with actual data from Redux store
  const mockArtworks = [
    {
      id: 1,
      title: "Sunset Dreams",
      uploadDate: "2024-01-15",
      price: 1200,
      sold: true,
      soldDate: "2024-01-20",
      soldPrice: 1200,
      views: 45,
    },
    {
      id: 2,
      title: "Urban Landscape",
      uploadDate: "2024-01-10",
      price: 800,
      sold: false,
      soldDate: null,
      soldPrice: 0,
      views: 32,
    },
    {
      id: 3,
      title: "Abstract Forms",
      uploadDate: "2024-01-05",
      price: 600,
      sold: true,
      soldDate: "2024-01-18",
      soldPrice: 600,
      views: 78,
    },
    {
      id: 4,
      title: "Mountain Vista",
      uploadDate: "2023-12-20",
      price: 1500,
      sold: true,
      soldDate: "2024-01-12",
      soldPrice: 1500,
      views: 23,
    },
  ];

  // Use mock data if artistArtworks is empty
  const artworks = artistArtworks.length > 0 ? artistArtworks : mockArtworks;

  // Calculate statistics
  const totalArtworks = artworks.length;
  const soldArtworks = artworks.filter((art) => art.sold);
  const totalRevenue = soldArtworks.reduce(
    (sum, art) => sum + (art.soldPrice || 0),
    0
  );
  const artworksSold = soldArtworks.length;

  // Filter artworks based on search and date filters
  useEffect(() => {
    let filtered = artworks;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((artwork) =>
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(
            (artwork) => new Date(artwork.uploadDate) >= filterDate
          );
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(
            (artwork) => new Date(artwork.uploadDate) >= filterDate
          );
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(
            (artwork) => new Date(artwork.uploadDate) >= filterDate
          );
          break;
        case "custom":
          if (dateRange.start && dateRange.end) {
            filtered = filtered.filter((artwork) => {
              const artworkDate = new Date(artwork.uploadDate);
              return (
                artworkDate >= new Date(dateRange.start) &&
                artworkDate <= new Date(dateRange.end)
              );
            });
          }
          break;
      }
    }

    setFilteredArtworks(filtered);
  }, [searchTerm, dateFilter, dateRange, artworks]);

  // Fetch artworks on component mount
  useEffect(() => {
    if (authUser?._id && dispatch) {
      // Dispatch action to fetch artist's artworks
      dispatch({
        type: "GET_ARTIST_ARTWORKS",
        payload: {
          artistId: authUser._id,
        },
      });
    }
  }, [authUser, dispatch]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Sales Dashboard</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Artworks"
            value={totalArtworks}
            icon={Package}
          />
          <StatsCard
            title="Artworks Sold"
            value={artworksSold}
            icon={Package}
          />
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            icon={DollarSign}
          />
          <StatsCard
            title="Success Rate"
            value={`${
              totalArtworks > 0
                ? Math.round((artworksSold / totalArtworks) * 100)
                : 0
            }%`}
            icon={Package}
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search artworks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Filter
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Custom Date Range */}
            {dateFilter === "custom" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) =>
                      setDateRange((prev) => ({
                        ...prev,
                        start: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) =>
                      setDateRange((prev) => ({ ...prev, end: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Artworks Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">
              Your Artworks ({filteredArtworks.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold">Artwork</th>
                  <th className="text-left p-4 font-semibold">Upload Date</th>
                  <th className="text-left p-4 font-semibold">Price</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Sold Date</th>
                  <th className="text-left p-4 font-semibold">Revenue</th>
                  <th className="text-left p-4 font-semibold">Views</th>
                </tr>
              </thead>
              <tbody>
                {filteredArtworks.map((artwork) => (
                  <tr key={artwork.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded"></div>
                        <div>
                          <p className="font-semibold">{artwork.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      {formatDate(artwork.uploadDate)}
                    </td>
                    <td className="p-4 font-semibold">
                      {formatCurrency(artwork.price)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          artwork.sold
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {artwork.sold ? "Sold" : "Available"}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {artwork.soldDate ? formatDate(artwork.soldDate) : "-"}
                    </td>
                    <td className="p-4 font-semibold text-green-600">
                      {artwork.sold ? formatCurrency(artwork.soldPrice) : "-"}
                    </td>
                    <td className="p-4 text-gray-600">{artwork.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredArtworks.length === 0 && (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No artworks found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
