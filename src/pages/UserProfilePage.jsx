import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);
  const { authUser } = useSelector((state) => state.auth);

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

  const ImageCard = ({ index }) => (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md">
      <Image
        src={`/placeholder.svg?height=200&width=200&text=Image ${index}`}
        alt={`Image ${index}`}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );

  const handleFileUploadChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    formData.append("avatar", file);
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
            <div>image</div>
            <div className="bg-red-800 text-white px-8 py-4 text-xl font-semibold">
              View All Favourites
            </div>
          </div>
          <div className="space-y-6">
            <div className="text-3xl text-black font-light uppercase">
              Collections
            </div>
            <div>image</div>
            <div className="bg-red-800 text-white px-8 py-4 text-xl font-semibold">
              View All Favourites
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
