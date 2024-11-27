import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ImageCard } from "../components/ImageCard";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);
  const { authUser } = useSelector((state) => state.auth);
  const { wishlistDetails } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch({
      type: "GET_WISHLIST_BY_ID",
      payload: authUser?._id,
    });
  }, [authUser]);

  const handleEditClick = () => {
    // Placeholder function for editing the profile picture
    console.log("Edit profile picture");
  };

  const handleFileUploadChange = (event) => {
    // const file = event.target.files[0];
    // console.log(file);
    // formData.append("avatar", file);
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
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="Profile Picture"
            />
            {isHovering && (
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
                onClick={handleFileUploadChange}
              >
                <div className="bg-white rounded-full p-4">
                  <FaPencilAlt className="text-black text-4xl" />
                </div>
              </div>
            )}
          </div>
          <h2 className="text-xl font-semibold mt-2">John Doe</h2>
          <p className="text-gray-600">@johndoe</p>
        </div>
        <div className="py-12 px-10 space-y-10">
          <div className="space-y-6">
            <div className="text-3xl text-black font-light uppercase">
              Favorites
            </div>
            <div className="flex gap-2">
              {wishlistDetails?.arts.slice(0, 4)?.map((singleWishlist) => {
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
            <button className="bg-red-800 text-white px-8 py-4 text-xl font-semibold">
              View All Favourites
            </button>
          </div>
          <div className="space-y-6">
            <div className="text-3xl text-black font-light uppercase">
              Collections
            </div>
            <div className="flex space-x-3">
              {wishlistDetails?.arts?.map((singleWishlist) => {
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
            <button className="bg-red-800 text-white px-8 py-4 text-xl font-semibold">
              View All Favourites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
