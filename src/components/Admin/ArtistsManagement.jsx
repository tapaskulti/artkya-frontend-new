import React, { useState } from 'react';
import { FaSearch, FaTrashAlt, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

const ArtistsManagement = () => {
  const [artists, setArtists] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      status: 'Active',
      joinDate: '2024-01-10',
      totalArtworks: 45,
      totalSales: 23,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@example.com',
      status: 'Active',
      joinDate: '2024-02-15',
      totalArtworks: 32,
      totalSales: 18,
      rating: 4.5
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma@example.com',
      status: 'Disabled',
      joinDate: '2024-01-20',
      totalArtworks: 28,
      totalSales: 15,
      rating: 4.2
    }
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusToggle = artistId => {
    setArtists(artists.map(artist => {
      if (artist.id === artistId) {
        return { ...artist, status: artist.status === 'Active' ? 'Disabled' : 'Active' };
      }
      return artist;
    }));
  };

  const handleDeleteClick = artist => {
    setSelectedArtist(artist);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedArtist) {
      setArtists(artists.filter(artist => artist.id !== selectedArtist.id));
      setShowDeleteModal(false);
      setSelectedArtist(null);
    }
  };

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Artists Management</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Artists</p>
          <p className="text-2xl font-bold">{artists.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Active Artists</p>
          <p className="text-2xl font-bold text-green-600">
            {artists.filter(a => a.status === 'Active').length}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artist
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artworks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
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
              {filteredArtists.map(artist => (
                <tr key={artist.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{artist.name}</div>
                    <div className="text-sm text-gray-500">{artist.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{artist.totalArtworks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{artist.totalSales}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleStatusToggle(artist.id)} className="text-blue-600 hover:text-blue-900">
                      {artist.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={() => handleDeleteClick(artist)} className="text-red-600 hover:text-red-900">
                      <FaTrashAlt className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArtistsManagement;
