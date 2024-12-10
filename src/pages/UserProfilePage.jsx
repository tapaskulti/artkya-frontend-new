import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ImageCard } from "../components/ImageCard";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);
  const { authUser } = useSelector((state) => state.auth);
  const { wishlistDetails } = useSelector((state) => state.wishlist);
  const formData = new FormData();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: "GET_WISHLIST_BY_ID",
      payload: authUser?._id,
    });
  }, [authUser]);

  const handleFileUploadChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    formData.append("avatar", file);

    dispatch({
      type: "UPLOAD_USER_AVATAR",
      payload: {
        userId: authUser?._id,
        body: formData,
      },
    });
  };

  return (
    <div className="static h-full">
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <div className="w-full md:w-1/5 bg-gray-200 px-4 py-8 flex flex-col items-center justify-start">
          <div
            className="relative w-56 h-56 rounded-full overflow-hidden bg-white shadow-lg mb-6"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <img src={authUser?.avatar?.secure_url} alt="Profile Picture" />
            {isHovering && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
                <label
                  htmlFor="profileUpload"
                  className="text-white cursor-pointer bg-white rounded-full p-4"
                >
                  <FaPencilAlt className="w-6 h-6 text-black" />
                </label>
                <input
                  id="profileUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUploadChange}
                  className="hidden"
                />
              </div>
            )}
          </div>
          <h2 className="text-xl font-semibold mt-2">
            {`${authUser?.firstName} 
            ${authUser?.lastName}`}
          </h2>
          {/* <p className="text-gray-600">@johndoe</p> */}
        </div>
        <div className="py-12 px-10 space-y-10">
          <div className="space-y-6">
            <div className="text-3xl text-black font-light uppercase">
              Favorites
            </div>
            <div className="flex gap-2">
              {wishlistDetails?.arts?.slice(0, 4)?.map((singleWishlist) => {
                return (
                  <div>
                    <ImageCard
                      image={singleWishlist?.thumbnail?.secure_url}
                      price={singleWishlist?.priceDetails?.price}
                      name={singleWishlist?.name}
                      depth={singleWishlist?.depth}
                      width={singleWishlist?.width}
                      height={singleWishlist?.height}
                    />
                  </div>
                );
              })}
            </div>
            <button
              className="bg-red-800 text-white px-8 py-4 text-xl font-semibold"
              onClick={() => {
                navigate(`/favoutires`);
              }}
            >
              View All Favourites
            </button>
          </div>
          <div className="space-y-6">
            <div className="text-3xl text-black font-light uppercase">
              Collections
            </div>
            <div className="flex space-x-3">
              {wishlistDetails?.arts?.slice(0, 4)?.map((singleWishlist) => {
                console.log("singleWishlist=>", singleWishlist);
                return (
                  <div>
                    <ImageCard
                      image={singleWishlist?.thumbnail?.secure_url}
                      price={singleWishlist?.priceDetails?.price}
                      name={singleWishlist?.name}
                      depth={singleWishlist?.depth}
                      width={singleWishlist?.width}
                      height={singleWishlist?.height}
                    />
                  </div>
                );
              })}
            </div>
            <button
              className="bg-red-800 text-white px-8 py-4 text-xl font-semibold"
              onClick={() => {
                navigate(`/favoutires`);
              }}
            >
              View All Collections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
