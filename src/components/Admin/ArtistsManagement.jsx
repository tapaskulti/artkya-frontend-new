import { useEffect, useState } from "react";
import { Search, User } from "lucide-react";
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

  const handleStatusToggle = (artistId) => {    
    dispatch({
      type: "VERIFY_ARTIST",
      payload: {
        userId: artistId
      },
    });
  };

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Artists Management
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Artists
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {allArtists?.length || 0}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active Artists
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {allArtists?.filter((a) => a.status === "Active").length || 0}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Verified Artists
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {allArtists?.filter((a) => a.verified).length || 0}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Artist
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total Artworks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Sold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Permission Req
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Original Commission (%)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredArtists?.map((artist) => (
                  <tr
                    key={artist._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
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
                        <User className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {artist.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {artist.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {artist.totalArtworks || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {artist.totalArtSold || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          artist.verified
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {artist.verified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"                          
                          checked={artist?.isArtApprovalReq === false}
                          onChange={() =>
                            handleStatusToggle(artist?._id)
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        defaultValue={artist.originalCommission || 20}
                        className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        onChange={(e) => {
                          console.log("commisiion change=>", e.target.value);
                          console.log("artist detail=>", artist);
                          const updatedValue = parseInt(e.target.value, 10);
                          if (!isNaN(updatedValue)) {
                            dispatch({
                              type: "UPDATE_ARTIST_COMMISSION",
                              payload: {
                                body: {
                                  userId: artist._id,
                                  originalPercent: updatedValue,
                                },
                              },
                            })
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
    </div>
  );
};

export default ArtistsManagement;
