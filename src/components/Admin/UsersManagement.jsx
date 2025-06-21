import { useEffect, useState } from "react";
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
  Users,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const UsersManagement = () => {
  const dispatch = useDispatch();
  const { totalCount, allUsers, userLoading } = useSelector(
    (state) => state.admin
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    userType: "",
    verified: "",
    status: "",
    joinDateRange: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    dispatch({
      type: "FETCH_ALL_USER_REQUEST",
      payload: {
        search: searchTerm,
        ...filters,
        page: currentPage,
        limit: itemsPerPage,
      },
    });
    dispatch({ type: "FETCH_TOTAL_COUNTS_REQUEST" });
  }, [dispatch, searchTerm, filters, currentPage]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      userType: "",
      verified: "",
      status: "",
      joinDateRange: "",
    });
    setCurrentPage(1);
  };

  const exportUsers = () => {
    dispatch({
      type: "EXPORT_USERS_REQUEST",
      payload: { filters, format: "excel" },
    });
  };

  const filteredUsers =
    allUsers?.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesUserType =
        !filters.userType || user.userType === filters.userType;
      const matchesVerified =
        filters.verified === "" ||
        (filters.verified === "true"
          ? user.verified === "Verified"
          : user.verified !== "Verified");
      const matchesStatus =
        filters.status === "" || user.status === filters.status;

      return (
        matchesSearch && matchesUserType && matchesVerified && matchesStatus
      );
    }) || [];

  // Pagination
  const totalPages = Math.ceil((filteredUsers?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleStatusToggle = (userId, currentStatus) => {
    dispatch({
      type: "UPDATE_USER_STATUS_REQUEST",
      payload: {
        userId,
        status: currentStatus === "Active" ? "Inactive" : "Active",
      },
    });
  };

  const handleUserTypeChange = (userId, newUserType) => {
    dispatch({
      type: "UPDATE_USER_TYPE_REQUEST",
      payload: {
        userId,
        userType: newUserType,
      },
    });
  };

  const viewUserDetails = (userId) => {
    dispatch({
      type: "GET_USER_DETAILS_REQUEST",
      payload: { userId },
    });
  };

  // Statistics
  const totalUsers = allUsers?.length || 0;
  const activeUsers =
    allUsers?.filter((u) => u.status === "Active")?.length || 0;
  const verifiedUsers =
    allUsers?.filter((u) => u.verified === "Verified")?.length || 0;
  const artistUsers =
    allUsers?.filter((u) => u.userType === "ARTIST")?.length || 0;

  if (userLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading users...</p>
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
                Users Management
              </h1>
              <p className="text-gray-300 mt-2 font-light">
                Manage user accounts and permissions
              </p>
            </div>
            {/* <div className="mt-6 lg:mt-0 flex space-x-4">
              <button
                onClick={exportUsers}
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
            </div> */}
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
                  Total Users
                </p>
                <p className="text-2xl font-light text-gray-900 mt-2">
                  {totalUsers}
                </p>
              </div>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Active Users
                </p>
                <p className="text-2xl font-light text-gray-900 mt-2">
                  {activeUsers}
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Verified Users
                </p>
                <p className="text-2xl font-light text-gray-900 mt-2">
                  {verifiedUsers}
                </p>
              </div>
              <UserCheck className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Artists
                </p>
                <p className="text-2xl font-light text-gray-900 mt-2">
                  {artistUsers}
                </p>
              </div>
              <Shield className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  User Type
                </label>
                <select
                  value={filters.userType}
                  onChange={(e) =>
                    handleFilterChange("userType", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white"
                >
                  <option value="">All Types</option>
                  <option value="USER">User</option>
                  <option value="ARTIST">Artist</option>
                  <option value="ADMIN">Admin</option>
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
                  <option value="false">Unverified</option>
                </select>
              </div>
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white text-gray-900"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 font-medium">
              {filteredUsers?.length || 0} of {totalUsers} users
            </div>
          </div>
        </div>

        {/* Users Table */}
        {paginatedUsers?.length === 0 ? (
          <div className="bg-white border border-gray-200 p-16 text-center">
            <User className="h-12 w-12 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-light text-gray-900 mb-3">
              No Users Found
            </h3>
            <p className="text-gray-500 font-light">
              No users match your current filters.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Join Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Verification
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border border-gray-200">
                              {user.avatar?.secure_url ? (
                                <img
                                  src={user.avatar.secure_url}
                                  alt={user.name}
                                  className="h-12 w-12 rounded-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.nextSibling.style.display = "flex";
                                  }}
                                />
                              ) : null}
                              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-lg font-medium text-gray-600">
                                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.userType || "USER"}
                          onChange={(e) =>
                            handleUserTypeChange(user._id, e.target.value)
                          }
                          className={`w-full border border-gray-300 rounded-sm px-3 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 ${
                            user.userType === "ARTIST"
                              ? "bg-purple-50 text-purple-800"
                              : user.userType === "ADMIN"
                              ? "bg-red-50 text-red-800"
                              : "bg-blue-50 text-blue-800"
                          }`}
                        >
                          <option value="USER">User</option>
                          <option value="ARTIST">Artist</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {moment(user.joiningDate || user.createdAt).format(
                            "MMM DD, YYYY"
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {moment(user.joiningDate || user.createdAt).fromNow()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium ${
                            user.verified === "Verified"
                              ? "bg-gray-900 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          {user.verified === "Verified"
                            ? "Verified"
                            : "Unverified"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={user.status === "Active"}
                            onChange={() =>
                              handleStatusToggle(user._id, user.status)
                            }
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                        </label>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => viewUserDetails(user._id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              /* Edit user */
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            title="Edit User"
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

export default UsersManagement;
