import { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  X,
  Eye,
  Edit,
  Filter,
  Download,
  Palette,
  DollarSign,
  TrendingUp
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

function PaintingsManagement() {
  const dispatch = useDispatch();
  const { allPaintings, paintingLoading } = useSelector((state) => state.admin);

  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    approved: "",
    priceRange: "",
    artist: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_PAINTINGS" });
  }, [dispatch]);

  const handleStatusChange = (paintingId, newStatus) => {
    dispatch({
      type: "UPDATE_PAINTING_STATUS",
      payload: { artId: paintingId, status: newStatus }
    });
  };

  const toggleApproval = (artId) => {
    dispatch({
      type: "APPROVE_ARTWORK",
      payload: { artId }
    });
  };

  const handleDeleteClick = (painting) => {
    setSelectedPainting(painting);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedPainting) {
      dispatch({
        type: "DELETE_PAINTING",
        payload: { artId: selectedPainting.id }
      });
      setShowDeleteModal(false);
      setSelectedPainting(null);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      category: "",
      approved: "",
      priceRange: "",
      artist: ""
    });
    setCurrentPage(1);
  };

  const exportPaintings = () => {
    dispatch({
      type: "EXPORT_PAINTINGS",
      payload: { filters, format: "excel" }
    });
  };

  // Filter and search logic
  const filteredPaintings = allPaintings?.filter((painting) => {
    const matchesSearch =
      painting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      painting.artist.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !filters.status || painting.status === filters.status;
    const matchesCategory =
      !filters.category || painting.category === filters.category;
    const matchesApproved =
      filters.approved === "" ||
      (filters.approved === "true" ? painting.approved : !painting.approved);
    const matchesArtist =
      !filters.artist ||
      painting.artist.toLowerCase().includes(filters.artist.toLowerCase());

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesApproved &&
      matchesArtist
    );
  });

  // Pagination
  const totalPages = Math.ceil((filteredPaintings?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPaintings = filteredPaintings?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Statistics
  const totalPaintings = allPaintings?.length || 0;
  const approvedPaintings =
    allPaintings?.filter((p) => p.approved)?.length || 0;
  const soldPaintings =
    allPaintings?.filter((p) => p.status === "Sold")?.length || 0;
  const totalRevenue =
    allPaintings
      ?.filter((p) => p.status === "Sold")
      ?.reduce((sum, p) => sum + (p.price || 0) + (p.commission || 0), 0) || 0;

  if (paintingLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading paintings...</p>
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
                Paintings Management
              </h1>
              <p className="text-gray-300 mt-2 font-light">
                Manage artwork catalog and approvals
              </p>
            </div>
            <div className="mt-6 lg:mt-0 flex space-x-4">
              <button
                onClick={exportPaintings}
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
                  Total Paintings
                </p>
                <p className="text-2xl font-light text-gray-900 mt-2">
                  {totalPaintings}
                </p>
              </div>
              <Palette className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Approved
                </p>
                <p className="text-2xl font-light text-gray-900 mt-2">
                  {approvedPaintings}
                </p>
              </div>
              <Eye className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Sold
                </p>
                <p className="text-2xl font-light text-gray-900 mt-2">
                  {soldPaintings}
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Total Revenue
                </p>
                <p className="text-2xl font-light text-gray-900 mt-2">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-5 w-5 text-gray-400" />
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
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="">All Categories</option>
                  <option value="Paintings">Paintings</option>
                  <option value="Sculptures">Sculptures</option>
                  <option value="Digital Art">Digital Art</option>
                  <option value="Photography">Photography</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Approval
                </label>
                <select
                  value={filters.approved}
                  onChange={(e) =>
                    handleFilterChange("approved", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="">All</option>
                  <option value="true">Approved</option>
                  <option value="false">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Artist
                </label>
                <input
                  type="text"
                  placeholder="Artist name..."
                  value={filters.artist}
                  onChange={(e) => handleFilterChange("artist", e.target.value)}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
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
                  placeholder="Search paintings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 font-medium">
              {filteredPaintings?.length || 0} of {totalPaintings} paintings
            </div>
          </div>
        </div>

        {/* Paintings Grid */}
        {paginatedPaintings?.length === 0 ? (
          <div className="bg-white border border-gray-200 p-16 text-center">
            <Palette className="h-12 w-12 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-light text-gray-900 mb-3">
              No Paintings Found
            </h3>
            <p className="text-gray-500 font-light">
              No paintings match your current filters.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Painting
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Artist & Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Price Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Approval
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedPaintings.map((painting) => (
                    <tr
                      key={painting?.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              src={painting.thumbnail}
                              alt={painting.title}
                              className="h-16 w-16 object-cover border border-gray-200"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {painting?.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              Uploaded on {painting?.uploadDate}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {painting?.artist}
                          </div>
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-sm mt-1">
                            {painting?.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">
                            ${(painting?.price || 0).toLocaleString()}
                          </div>
                          {painting?.commission && (
                            <div className="text-xs text-gray-500">
                              Commission: $
                              {painting.commission.toLocaleString()}
                            </div>
                          )}
                          <div className="text-xs font-medium text-gray-700">
                            Total: $
                            {(
                              (painting?.price || 0) +
                              (painting?.commission || 0)
                            ).toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={painting.status}
                          onChange={(e) =>
                            handleStatusChange(painting.id, e.target.value)
                          }
                          className="text-sm border border-gray-300 rounded-sm px-3 py-1 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                        >
                          <option value="Available">Available</option>
                          <option value="Sold">Sold</option>
                          <option value="Hidden">Hidden</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleApproval(painting.id)}
                          className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium transition-colors duration-200 ${
                            painting?.approved
                              ? "bg-gray-900 text-white hover:bg-gray-800"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {painting?.approved ? "Approved" : "Pending"}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              /* View painting details */
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              /* Edit painting */
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(painting)}
                            className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-sm max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Confirm Delete
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-6 text-gray-600">
              {`Are you sure you want to delete painting 
              ${selectedPainting?.title}? This action cannot be undone.`}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-sm hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaintingsManagement;
