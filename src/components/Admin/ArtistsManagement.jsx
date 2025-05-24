import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const ArtistsManagement = () => {
  const dispatch = useDispatch();
  const { allArtists } = useSelector((state) => state.admin);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch({
      type: "FETCH_ALL_ARTISTS",
      payload: {
        search: searchTerm,
      },
    });
  }, [dispatch, searchTerm]);

  console.log("allArtists===>", allArtists);

  const filteredArtists =
    allArtists?.filter(
      (artist) =>
        artist.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

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
            className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <BsSearch className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Artists</p>
          <p className="text-2xl font-bold">{allArtists?.length || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Active Artists</p>
          <p className="text-2xl font-bold text-green-600">
            {allArtists?.filter((a) => a.status === "Active").length || 0}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Artist
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Artworks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Verified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Original Commission (%)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredArtists?.map((artist) => (
                <tr key={artist._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {artist.name}
                    </div>
                    <div className="text-sm text-gray-500">{artist.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {artist.totalArtworks || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {artist.totalArtSold || 0}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        artist.verified
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {artist.verified ? "Verified" : "Unverified"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        artist.status === "Active"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {artist.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      defaultValue={`${artist.originalCommission || 30} %`}
                      className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                      onChange={(e) => {
                        const updatedValue = parseInt(e.target.value, 10);
                        if (!isNaN(updatedValue)) {
                          dispatch({
                            type: "UPDATE_ARTIST_COMMISSION",
                            payload: {
                              artistId: artist._id,
                              commission: updatedValue,
                            },
                          });
                        }
                      }}
                    />
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
