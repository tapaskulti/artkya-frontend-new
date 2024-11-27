import Header from "../components/Header";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
// import { Spinner } from "@material-tailwind/react";
// import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
// import MasonaryGridLayout from "../components/MasonaryGridLayout";
import { FaPencilAlt } from "react-icons/fa";
import MasonaryGridLayout from "../components/MasonaryGridLayout";

function ArtistProfilePage() {
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );
  const [coverImage, setCoverImage] = useState(
    "https://via.placeholder.com/1200x300"
  );
  const [activeTab, setActiveTab] = useState("info");
  const [showFullContent, setShowFullContent] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setArtistImageUploadLoading, artistDetails, getAllArtByArtist } =
    useSelector((state) => state.artist);
  let { id } = useParams();
  const formData = new FormData();
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    dispatch({
      type: "GET_ARTIST_PROFILE_BY_ID",
      payload: {
        artistId: id,
      },
    });

    dispatch({
      type: "GET_ALL_ART_BY_ARTIST",
      payload: {
        artistId: id,
      },
    });
  }, []);

    const handleFileUploadChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    formData.append("avatar", file);

    dispatch({
      type: "UPDATE_ARTIST_IMAGE",
      payload: {
        artistId: id,
        body: formData,
      },
    });
  };
    const handleCoverChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    formData.append("artistcoverPhoto", file);

    dispatch({
      type: "UPDATE_ARTIST_IMAGE",
      payload: {
        artistId: id,
        body: formData,
      },
    });
  };
  const handleIconClick = () => {
    fileInputRef.current.click();
  };


  // const handleCoverChange = (e) => {
  //   setCoverImage(URL.createObjectURL(e.target.files[0]));
  // };

  const renderContent = () => {
    const content = {
      info: artistDetails?.aboutMe,
      education:artistDetails?.education, 
      events: artistDetails?.events,
      exhibition: artistDetails?.exibition,
    };

    const text = content[activeTab];
    const displayedText = showFullContent
      ? text
      : text?.substring(0, 500) + "...";

    return (
      <div className="h-full overflow-auto">
        <p>{displayedText}</p>
        {!showFullContent && (
          <button
            onClick={() => setShowFullContent(true)}
            className="text-blue-500 underline"
          >
            See more
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="relative h-screen bg-white">
       <Header />
      {/* Cover Photo */}
      <div className="w-full h-64 bg-gray-300 relative">       
        {setArtistImageUploadLoading ? (
                <>
                  {/* <Spinner /> */}
                </>
              ) : (
                <>
                  <img
                    src={artistDetails?.coverPhoto?.secure_url}
                    // src={coverImage}
                    className="w-full h-full object-cover"
                    alt={coverImage}
                  />
                </>
              )}   
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <label
            htmlFor="coverUpload"
            className="text-white cursor-pointer absolute right-4 top-4 bg-white rounded-full p-4"
          >
            <FaPencilAlt className="w-6 h-6 text-black" />
          </label>
          <input
            id="coverUpload"
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Main Content: Profile Card and Products Section */}
      <div className="flex justify-center h-full">
        {/* Profile Card */}
        <div className="shadow-lg rounded-lg w-96 p-6 relative">
          {/* Profile Picture */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white relative group">
            {setArtistImageUploadLoading ? (
                <>
                  <Spinner />
                </>
              ) : (
                <>
                  <img
                    src={artistDetails?.profileImage?.secure_url}
                    className="w-full h-full object-cover"
                    alt={profileImage}
                  />
                </>
              )}          
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
            </div>
          </div>
          {/* User Details */}
          <div className="text-center mt-24 h-20 p-2">
            <h2 className="text-xl font-semibold">
            {`${artistDetails?.userId?.firstName} ${artistDetails?.userId?.lastName}`}
            </h2>
            <p className="text-gray-600"> {`${artistDetails?.city}, ${artistDetails?.state}, ${artistDetails?.country}`}</p>
          </div>

          {/* Tabs for Info, Education, Events, Exhibition */}
          <div className="mt-4">
            <div className="flex justify-around bg-gray-200 rounded-lg">
              <button
                onClick={() => {
                  setActiveTab("info");
                  setShowFullContent(false);
                }}
                className={`py-2 px-4 ${
                  activeTab === "info" ? "text-blue-500 underline" : ""
                }`}
              >
                Info
              </button>
              <button
                onClick={() => {
                  setActiveTab("education");
                  setShowFullContent(false);
                }}
                className={`py-2 px-4 ${
                  activeTab === "education" ? "text-blue-500 underline" : ""
                }`}
              >
                Education
              </button>
              <button
                onClick={() => {
                  setActiveTab("events");
                  setShowFullContent(false);
                }}
                className={`py-2 px-4 ${
                  activeTab === "events" ? "text-blue-500 underline" : ""
                }`}
              >
                Events
              </button>
              <button
                onClick={() => {
                  setActiveTab("exhibition");
                  setShowFullContent(false);
                }}
                className={`py-2 px-4 ${
                  activeTab === "exhibition" ? "text-blue-500 underline" : ""
                }`}
              >
                Exhibition
              </button>
            </div>
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md h-[400px] overflow-y-auto ">
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Products List Section */}
        <div className="flex-1 p-4 ">
          <h3 className="text-lg font-semibold py-4">Products Listed</h3>
          <div className="flex-1 h-[85vh] overflow-y-auto bg-white p-4 stylish-scrollbar">
          <MasonaryGridLayout artDetails={getAllArtByArtist} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistProfilePage;
