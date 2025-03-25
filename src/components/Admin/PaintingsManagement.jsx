import React, { useState } from 'react';
import { BsEye, BsSearch, BsTrash2, BsX } from 'react-icons/bs';

function PaintingsManagement() {
  const [paintings, setPaintings] = useState([
    {
      id: 1,
      title: 'Sunset by the Lake',
      artist: 'Sarah Johnson',
      price: 1200,
      status: 'Available',
      category: 'Landscape',
      uploadDate: '2024-03-01',
      views: 1543,
      likes: 89,
      thumbnail: 'https://images.unsplash.com/photo-1507166763745-bfe008fbb831?w=400&q=80'
    },
    {
      id: 2,
      title: 'Abstract Thoughts',
      artist: 'Michael Chen',
      price: 2500,
      status: 'Sold',
      category: 'Abstract',
      uploadDate: '2024-02-28',
      views: 2102,
      likes: 167,
      thumbnail: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&q=80'
    },
    {
      id: 3,
      title: 'City Lights',
      artist: 'Emma Davis',
      price: 1800,
      status: 'Hidden',
      category: 'Urban',
      uploadDate: '2024-03-05',
      views: 876,
      likes: 45,
      thumbnail: 'https://images.unsplash.com/photo-1514866747592-c2d279258a78?w=400&q=80'
    }
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (paintingId, newStatus) => {
    setPaintings(paintings.map(painting => {
      if (painting.id === paintingId) {
        return { ...painting, status: newStatus };
      }
      return painting;
    }));
  };

  const handleDeleteClick = (painting) => {
    setSelectedPainting(painting);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedPainting) {
      setPaintings(paintings.filter(painting => painting.id !== selectedPainting.id));
      setShowDeleteModal(false);
      setSelectedPainting(null);
    }
  };

  const filteredPaintings = paintings.filter(painting =>
    painting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    painting.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = paintings
    .filter(p => p.status === 'Sold')
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Paintings Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search paintings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <BsSearch className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Paintings</p>
          <p className="text-2xl font-bold">{paintings.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Paintings Sold</p>
          <p className="text-2xl font-bold text-green-600">
            {paintings.filter(p => p.status === 'Sold').length}
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
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
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
                        <div className="text-sm font-medium text-gray-900">{painting.title}</div>
                        <div className="text-sm text-gray-500">Uploaded on {painting.uploadDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{painting.artist}</div>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {painting.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${painting.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-500">
                        <BsEye className="w-4 h-4 mr-1" />
                        <span className="text-sm">{painting.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center text-red-500">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        <span className="text-sm">{painting.likes}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={painting.status}
                      onChange={(e) => handleStatusChange(painting.id, e.target.value)}
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