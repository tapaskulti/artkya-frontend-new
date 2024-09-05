/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom"; // assuming you're using react-router for navigation
import { FaPlus, FaHeart, FaShoppingCart, FaPaintBrush } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const MasonaryGridLayout = ({ artDetails }) => {
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  return (
    <div className="container mx-auto p-4 rounded-lg">
      {/* Grid layout with responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artDetails?.map((singleArt, index) => (
          <div
            key={index}
            className="mb-4 group shadow-lg rounded-lg overflow-hidden relative"
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <a href={`/artDetailPage/${singleArt?._id}`}>
                <img
                  src={singleArt?.thumbnail?.secure_url}
                  alt={singleArt?.title || `Art ${index}`}
                  className="w-full h-auto object-cover transition-transform duration-[2000ms] ease-in-out transform group-hover:scale-125"
                />
              </a>
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-blue-500 transform hover:scale-110 transition-transform duration-300">
                  <FaPlus />
                </button>
                <button
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transform hover:scale-110 transition-transform duration-300"
                  onClick={() => {
                    dispatch({
                      type: "ADD_ART_TO_WISHLIST",
                      payload: {
                        userId: authUser?._id,
                        artId: singleArt?._id,
                      },
                    });
                  }}
                >
                  <FaHeart />
                </button>
                <button
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-green-500 transform hover:scale-110 transition-transform duration-300"
                  onClick={() => {
                    dispatch({
                      type: "ADD_ART_TO_CART",
                      payload: {
                        userId: authUser?._id,
                        artId: singleArt?._id,
                        artPrice: singleArt?.priceDetails?.price,
                        navigate,
                      },
                    });
                  }}
                >
                  <FaShoppingCart />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center space-x-3">
                <h2 className="text-lg font-semibold truncate">
                  {singleArt?.title}
                </h2>
                <p className="text-sm font-semibold text-gray-800">
                  ${singleArt?.priceDetails?.price}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                {`${
                  singleArt?.artist?.firstName
                    ? singleArt?.artist?.firstName
                    : ""
                } ${
                  singleArt?.artist?.lastName ? singleArt?.artist?.lastName : ""
                }`}
              </p>
              <p className="text-sm text-gray-600">
                {singleArt.height} x {singleArt?.width} x {singleArt?.depth} inch
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonaryGridLayout;

export const NoArtFound = () => {
  return (
    <div className=" flex flex-col justify-center items-center px-20 text-5xl font-serif space-x-4 space-y-6 text-blue-gray-600">
      <FaPaintBrush />
      <div>No Art Found</div>
    </div>
  );
};
