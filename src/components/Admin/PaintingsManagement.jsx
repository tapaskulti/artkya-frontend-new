import { useState, useEffect } from "react";
import { BsSearch, BsTrash2, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

function PaintingsManagement() {
  const dispatch = useDispatch();
  const { allPaintings } = useSelector((state) => state.admin);

  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_PAINTINGS" });
  }, [dispatch]);

  const handleStatusChange = (paintingId, newStatus) => {
    // Handle status change directly on allPaintings or dispatch an action
    // You can dispatch an action here to update the status in the store
  };

  const toggleApproval = (paintingId) => {
    // Toggle approval directly on allPaintings or dispatch an action
    // You can dispatch an action here to update the approval status in the store
  };

  const handleDeleteClick = (painting) => {
    setSelectedPainting(painting);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedPainting) {
      // Delete the painting directly from the Redux store (dispatch an action)
      setShowDeleteModal(false);
      setSelectedPainting(null);
    }
  };

  const filteredPaintings = allPaintings.filter(
    (painting) =>
      painting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      painting.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = allPaintings
    .filter((p) => p.status === "Sold")
    .reduce((sum, p) => sum + p.price + p.commission, 0);

  return (
    <div className="space-y-6 bg-white min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Paintings Management
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search paintings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <BsSearch className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Paintings</p>
          <p className="text-2xl font-bold">{allPaintings.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Paintings Sold</p>
          <p className="text-2xl font-bold text-green-600">
            {allPaintings.filter((p) => p.status === "Sold").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-blue-600">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Painting
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artist & Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPaintings.map((painting) => (
                <tr key={painting.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={painting.thumbnail}
                        alt={painting.title}
                        className="h-16 w-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {painting.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          Uploaded on {painting.uploadDate}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {painting.artist}
                    </div>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {painting.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${(painting.price + painting.commission).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={painting.approved}
                      onChange={() => toggleApproval(painting.id)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={painting.status}
                      onChange={(e) =>
                        handleStatusChange(painting.id, e.target.value)
                      }
                      className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="Available">Available</option>
                      <option value="Sold">Sold</option>
                      <option value="Hidden">Hidden</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleDeleteClick(painting)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <BsTrash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Confirm Delete</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <BsX className="w-5 h-5" />
              </button>
            </div>
            <p className="mb-4">
              Are you sure you want to delete painting "{selectedPainting?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
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
