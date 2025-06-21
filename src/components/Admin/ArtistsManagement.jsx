/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import {
  Search,
  User,
  Filter,
  Download,
  Eye,
  Edit,
  Shield,
  UserCheck,
  TrendingUp,
  Palette,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

const ArtistsManagement = () => {
  const dispatch = useDispatch();
  const { allArtists, artistLoading, artistAnalytics } = useSelector(
    (state) => state.admin
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    verified: "",
    artApprovalReq: "",
    commissionRange: "",
    artworksRange: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Debounced commission update
  const debouncedCommissionUpdate = useCallback(
    debounce((artistId, commission) => {
      dispatch({
        type: "UPDATE_ARTIST_COMMISSION_REQUEST",
        payload: {
          userId: artistId,
          originalPercent: commission,
        },
      });
    }, 2000),
    [dispatch]
  );

  useEffect(() => {
    dispatch({
      type: "FETCH_ALL_ARTISTS_REQUEST",
      payload: {
        search: searchTerm,
        ...filters,
        page: currentPage,
        limit: itemsPerPage,
      },
    });
  }, [dispatch, searchTerm, filters, currentPage]);

  useEffect(() => {
    // Fetch artist analytics
    dispatch({
      type: "GET_ARTIST_ANALYTICS_REQUEST",
      payload: {},
    });
  }, [dispatch]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      verified: "",
      artApprovalReq: "",
      commissionRange: "",
      artworksRange: "",
    });
    setCurrentPage(1);
  };

  const exportArtists = () => {
    dispatch({
      type: "EXPORT_ARTISTS_REQUEST",
      payload: { filters, format: "excel" },
    });
  };

  const filteredArtists =
    allArtists?.filter((artist) => {
      const matchesSearch =
        artist.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = !filters.status || artist.status === filters.status;
      const matchesVerified =
        filters.verified === "" ||
        (filters.verified === "true" ? artist.verified : !artist.verified);
      const matchesApprovalReq =
        filters.artApprovalReq === "" ||
        (filters.artApprovalReq === "true"
          ? artist.isArtApprovalReq
          : !artist.isArtApprovalReq);

      return (
        matchesSearch && matchesStatus && matchesVerified && matchesApprovalReq
      );
    }) || [];

  // Pagination
  const totalPages = Math.ceil((filteredArtists?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArtists = filteredArtists?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleVerificationToggle = (artistId) => {
    dispatch({
      type: "VERIFY_ARTIST_REQUEST",
      payload: {
        userId: artistId,
      },
    });
  };

  const handleArtApprovalToggle = (artistId, currentApprovalReq) => {
    dispatch({
      type: "TOGGLE_ART_APPROVAL_PERMISSION_REQUEST",
      payload: {
        userId: artistId,
        isArtApprovalReq: !currentApprovalReq,
      },
    });
  };

  const handleStatusChange = (artistId, newStatus) => {
    dispatch({
      type: "UPDATE_ARTIST_STATUS_REQUEST",
      payload: {
        userId: artistId,
        status: newStatus,
      },
    });
  };

  const handleCommissionChange = (artistId, newCommission) => {
    const commission = parseInt(newCommission, 10);
    if (!isNaN(commission) && commission >= 0 && commission <= 100) {
      debouncedCommissionUpdate(artistId, commission);
    }
  };

  const viewArtistDetails = (artistId) => {
    dispatch({
      type: "GET_ARTIST_DETAILS_REQUEST",
      payload: { artistId },
    });
  };

  // Statistics
  const totalArtists = allArtists?.length || 0;
  const activeArtists =
    allArtists?.filter((a) => a.status === "Active")?.length || 0;
  const verifiedArtists = allArtists?.filter((a) => a.verified)?.length || 0;
  const avgCommission =
    allArtists?.length > 0
      ? (
          allArtists.reduce((sum, a) => sum + (a.originalCommission || 20), 0) /
          allArtists.length
        ).toFixed(1)
      : 0;

  if (artistLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading artists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-light text-white tracking-tight">
                Artists Management
              </h1>
              <p className="text-gray-300 mt-2 font-light">
                Manage artist profiles and permissions
              </p>
            </div>
            <div className="mt-6 lg:mt-0 flex space-x-4">
              <button
                onClick={exportArtists}
                className="inline-flex items-center px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-sm hover:bg-gray-100 transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-white text-sm font-medium rounded-sm hover:bg-gray-800 transition-colors duration-200"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Total Artists
                </p>
                <p className="text-2xl font-light text-gray-900 mt-2">
                  {totalArtists}
                </p>
              </div>
              <User className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Active Artists
                </p>
                <p className="text-2xl font-light text-gray-900 mt-2">
                  {activeArtists}
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Verified Artists
                </p>
                <p className="text-2xl font-light text-gray-900 mt-2">
                  {verifiedArtists}
                </p>
              </div>
              <UserCheck className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Avg Commission
                </p>
                <p className="text-2xl font-light text-gray-900 mt-2">
                  {avgCommission}%
                </p>
              </div>
              <Palette className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Verified
                </label>
                <select
                  value={filters.verified}
                  onChange={(e) =>
                    handleFilterChange("verified", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white"
                >
                  <option value="">All</option>
                  <option value="true">Verified</option>
                  <option value="false">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Art Approval
                </label>
                <select
                  value={filters.artApprovalReq}
                  onChange={(e) =>
                    handleFilterChange("artApprovalReq", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white"
                >
                  <option value="">All</option>
                  <option value="true">Required</option>
                  <option value="false">Not Required</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Commission Range
                </label>
                <select
                  value={filters.commissionRange}
                  onChange={(e) =>
                    handleFilterChange("commissionRange", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white"
                >
                  <option value="">All Ranges</option>
                  <option value="0-10">0-10%</option>
                  <option value="11-20">11-20%</option>
                  <option value="21-30">21-30%</option>
                  <option value="31-50">31-50%</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search artists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white text-gray-900"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 font-medium">
              {filteredArtists?.length || 0} of {totalArtists} artists
            </div>
          </div>
        </div>

        {/* Artists Table */}
        {paginatedArtists?.length === 0 ? (
          <div className="bg-white border border-gray-200 p-16 text-center">
            <User className="h-12 w-12 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-light text-gray-900 mb-3">
              No Artists Found
            </h3>
            <p className="text-gray-500 font-light">
              No artists match your current filters.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Artist
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Artworks
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Sales
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Verification
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Art Approval Required
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Commission %
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedArtists.map((artist) => (
                    <tr
                      key={artist._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border border-gray-200">
                              {artist.profileImage || artist.image ? (
                                <img
                                  src={artist.profileImage || artist.image}
                                  alt={artist.name}
                                  className="h-12 w-12 rounded-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.nextSibling.style.display = "flex";
                                  }}
                                />
                              ) : null}
                              <User className="h-6 w-6 text-gray-400" />
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {artist.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {artist.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {artist.totalArtworks || 0} total
                        </div>
                        <div className="text-xs text-gray-500">
                          {artist.approvedArtworks || 0} approved
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {artist.totalArtSold || 0} sold
                        </div>
                        <div className="text-xs text-gray-500">
                          ${(artist.totalRevenue || 0).toLocaleString()} revenue
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={artist.status || "Active"}
                          onChange={(e) =>
                            handleStatusChange(artist._id, e.target.value)
                          }
                          className={`w-full border border-gray-300 rounded-sm px-3 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 ${
                            artist.status === "Active"
                              ? "bg-green-50 text-green-800"
                              : artist.status === "Inactive"
                              ? "bg-red-50 text-red-800"
                              : "bg-yellow-50 text-yellow-800"
                          }`}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Suspended">Suspended</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleVerificationToggle(artist._id)}
                          className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium transition-colors duration-200 ${
                            artist.verified
                              ? "bg-gray-900 text-white hover:bg-gray-800"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          {artist.verified ? "Verified" : "Verify"}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={artist?.isArtApprovalReq === true}
                            onChange={() =>
                              handleArtApprovalToggle(
                                artist._id,
                                artist.isArtApprovalReq
                              )
                            }
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                        </label>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            defaultValue={artist.originalCommission || 20}
                            className="w-20 px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white text-gray-900 text-sm"
                            onChange={(e) => {
                              const updatedValue = parseInt(e.target.value, 10);
                              handleCommissionChange(artist._id, updatedValue);
                            }}
                          />
                          <span className="text-xs text-gray-500">%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => viewArtistDetails(artist._id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              /* Edit artist */
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            title="Edit Artist"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors duration-200 ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors duration-200 ${
                      page === currentPage
                        ? "bg-gray-900 text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors duration-200 ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistsManagement;
