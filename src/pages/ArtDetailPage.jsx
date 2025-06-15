import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { TiTick } from "react-icons/ti";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import ProductCarousel from "../components/ProductCarousel";
import { setprintPrice } from "../redux/app/art/artSlice";

const ArtDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for UI elements
  const [selectedImage, setSelectedImage] = useState();
  const [activeTab, setActiveTab] = useState("original");
  const [activeInfoTab, setActiveInfoTab] = useState("about");
  const [selectedSize, setSelectedSize] = useState({
    label: "8 × 10 inches",
    value: "8*10 inches",
  });

  // Redux state
  const { artDetail, printPrice } = useSelector((state) => state.art);
  const { authUser } = useSelector((state) => state.auth);
  const { artistDetails } = useSelector((state) => state.artist);

  useEffect(() => {
    dispatch({
      type: "ART_DETAIL",
      payload: id,
    });
  }, [id, dispatch]);

  useEffect(() => {
    if (artDetail) {
      setSelectedImage(artDetail?.thumbnail?.secure_url);
      console.log("artist id===>", artDetail?.artist?._id);
      dispatch({
        type: "GET_ARTIST_PROFILE_BY_ID",
        payload: {
          artistId: artDetail?.artist?._id,
        },
      });
      dispatch({
        type: "GET_ALL_ART_BY_ARTIST",
        payload: {
          artistId: artDetail?.artist?._id,
        },
      });
    }
  }, [artDetail]);

  // Set default print price for 8x10 inches
  useEffect(() => {
    if (activeTab === "print") {
      dispatch(setprintPrice({ printPrice: "75" }));
    }
  }, [activeTab, dispatch]);

  // Content for information tabs
  const infoContent = {
    about: (
      <div>
        <p className="mb-4">
          {artDetail?.description ||
            "No description available for this artwork."}
        </p>
        <p>
          Created by {artDetail?.artist?.name || "Unknown Artist"} in{" "}
          {artDetail?.year || "N/A"}.
        </p>
        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p className="mt-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>
    ),
    details: (
      <div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Artwork Specifications</h3>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Medium:</span>{" "}
                {artDetail?.medium || "Not specified"}
              </li>
              <li>
                <span className="font-medium">Width:</span>{" "}
                {artDetail?.width || "N/A"} cm
              </li>
              <li>
                <span className="font-medium">Height:</span>{" "}
                {artDetail?.height || "N/A"} cm
              </li>
              <li>
                <span className="font-medium">Depth:</span>{" "}
                {artDetail?.depth || "N/A"} cm
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Additional Information</h3>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Style:</span>{" "}
                {artDetail?.style || "Not specified"}
              </li>
              <li>
                <span className="font-medium">Year:</span>{" "}
                {artDetail?.year || "N/A"}
              </li>
              <li>
                <span className="font-medium">Framed:</span>{" "}
                {artDetail?.isFramed ? "Yes" : "No"}
              </li>
              <li>
                <span className="font-medium">
                  Certificate of Authenticity:
                </span>{" "}
                Included
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Technical Details</h3>
          <p>
            The artwork is created using premium quality materials ensuring
            longevity and color preservation. The canvas is stretched over a
            wooden frame with finished edges.
          </p>
          <p className="mt-4">
            All materials used are archival quality and the artwork has been
            treated with a protective varnish to prevent dust and UV damage.
          </p>
        </div>
      </div>
    ),
    shipping: (
      <div>
        <h3 className="font-semibold mb-2">Shipping Information</h3>
        <p className="mb-4">
          All artworks are carefully packaged and insured during transit.
          Shipping is included in the price.
        </p>

        <h3 className="font-semibold mb-2">Returns Policy</h3>
        <p className="mb-4">
          {`We offer a 14-day satisfaction guarantee. If you're not completely
          satisfied with your purchase, you can return it within 14 days for a
          full refund.`}
        </p>

        <h3 className="font-semibold mb-2">Delivery Timeline</h3>
        <p>
          Original artworks typically ship within 3-5 business days. Print
          copies ship within 1-2 business days.
        </p>

        <h3 className="font-semibold mb-2 mt-4">International Shipping</h3>
        <p>
          We ship worldwide. International orders may be subject to import
          duties and taxes which are the responsibility of the buyer.
        </p>

        <h3 className="font-semibold mb-2 mt-4">Packaging</h3>
        <p>
          Each artwork is professionally packed in acid-free materials and
          protected with foam corners and rigid packaging to ensure safe
          delivery.
        </p>
      </div>
    ),
  };

  return (
    <div className="w-full bg-white">
      <Header />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
          <span>Back to Gallery</span>
        </Link>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image Gallery with Fixed Dimensions */}
          <div className="order-2 lg:order-1 lg:col-span-2">
            <div className="flex">
              {/* Thumbnails - Fixed Width */}
              <div className="w-20 flex flex-col gap-2 mr-4">
                {artDetail?.art?.map((singleArt, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(singleArt?.secure_url)}
                    className={`cursor-pointer border-2 ${
                      selectedImage === singleArt?.secure_url
                        ? "border-blue-500"
                        : "border-gray-200"
                    } hover:border-blue-300 transition-all`}
                  >
                    <img
                      src={singleArt?.secure_url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Main Image - Fixed Width and Height */}
              <div
                className="flex-1"
                style={{ width: "600px", height: "500px" }}
              >
                <div className="w-full h-full bg-gray-50 rounded-lg shadow-lg flex items-center justify-center">
                  <img
                    src={selectedImage}
                    alt={artDetail?.title || "Artwork"}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Artwork Details */}
          <div className="order-1 lg:order-2 lg:col-span-1">
            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              {/* Tabs for Original vs Print */}
              <div className="flex justify-between mb-6 border rounded overflow-hidden">
                <button
                  onClick={() => {
                    setActiveTab("original");
                    dispatch(setprintPrice({ printPrice: "" }));
                  }}
                  className={`flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === "original"
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  } transition-colors`}
                >
                  Original Art
                </button>
                <button
                  onClick={() => setActiveTab("print")}
                  className={`flex-1 py-3 px-4 text-center font-medium ${
                    activeTab === "print"
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  } transition-colors`}
                >
                  Print Copy
                </button>
              </div>

              {/* Artwork Info */}
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                  {artDetail?.title || "Untitled Artwork"}
                </h1>
                <p className="text-lg text-gray-600 italic">
                  {artDetail?.artist?.name || "Unknown Artist"}
                </p>
                {artDetail?.location && (
                  <p className="text-sm text-gray-600">{artDetail?.location}</p>
                )}
              </div>

              {/* Price and Options */}
              <div className="space-y-6">
                {activeTab === "original" ? (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600">
                      Size: {artDetail?.width} W x {artDetail?.height} H x{" "}
                      {artDetail?.depth} D cm
                    </div>
                    <div className="text-3xl font-light">
                      USD {artDetail?.totalPrice || "Price on request"}
                    </div>
                    <div className="flex flex-col gap-3">
                      <button
                        className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded transition-colors"
                        onClick={() => {
                          dispatch({
                            type: "ADD_ART_TO_CART",
                            payload: {
                              userId: authUser?._id,
                              artId: artDetail?._id,
                              artPrice: artDetail?.totalPrice,
                              navigate,
                            },
                          });
                        }}
                      >
                        ADD TO CART
                      </button>
                      <button
                        className="w-full bg-white border-2 border-black hover:bg-gray-100 text-black py-3 rounded transition-colors"
                        onClick={() => {
                          navigate(`/artDetailPage/${id}/original`);
                        }}
                      >
                        MAKE AN OFFER
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Select Size:
                      </label>
                      <Select
                        options={[
                          { label: "8 × 10 inches", value: "8*10 inches" },
                          { label: "16 × 20 inches", value: "16*20 inches" },
                          { label: "20 × 30 inches", value: "20*30 inches" },
                        ]}
                        className="text-sm"
                        value={selectedSize}
                        defaultValue={{
                          label: "8 × 10 inches",
                          value: "8*10 inches",
                        }}
                        onChange={(e) => {
                          setSelectedSize(e);
                          if (e.value === "8*10 inches") {
                            dispatch(setprintPrice({ printPrice: "75" }));
                          }
                          if (e.value === "16*20 inches") {
                            dispatch(setprintPrice({ printPrice: "175" }));
                          }
                          if (e.value === "20*30 inches") {
                            dispatch(setprintPrice({ printPrice: "195" }));
                          }
                        }}
                      />
                    </div>
                    <div className="text-3xl font-light">USD {printPrice}</div>
                    <button
                      className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded transition-colors"
                      onClick={() => {
                        navigate(`/artDetailPage/${id}/print`);
                      }}
                    >
                      BUY PRINT COPY
                    </button>
                  </div>
                )}

                {/* Benefits */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TiTick className="text-green-600 text-lg" />
                    <span className="text-sm">Shipping included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TiTick className="text-green-600 text-lg" />
                    <span className="text-sm">
                      14-day satisfaction guarantee
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Artworks Carousel */}
        <div className="mt-16">
          <h2 className="text-2xl font-medium mb-6">
            More From {artDetail?.artist?.name || "This Artist"}
          </h2>
          <ProductCarousel />
        </div>

        {/* Information Tabs - Below the carousel */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px space-x-8">
              <button
                onClick={() => setActiveInfoTab("about")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeInfoTab === "about"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } transition-colors`}
              >
                ABOUT THE ARTWORK
              </button>
              <button
                onClick={() => setActiveInfoTab("details")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeInfoTab === "details"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } transition-colors`}
              >
                DETAILS AND DIMENSIONS
              </button>
              <button
                onClick={() => setActiveInfoTab("shipping")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeInfoTab === "shipping"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } transition-colors`}
              >
                SHIPPING AND RETURNS
              </button>
            </nav>
          </div>
          {/* Content area with fixed height and overflow without scrollbar */}
          <div
            className="py-6 h-64 overflow-hidden"
            style={{
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="pr-2" style={{ paddingRight: "17px" }}>
              {infoContent[activeInfoTab]}
            </div>
          </div>
        </div>

        {/* Artist Profile Box */}
        <div className="mt-12 mb-16 bg-gray-50 rounded-lg shadow-md overflow-hidden">
          <div className="h-64 flex">
            {/* Artist Photo and Basic Info */}
            <div className="w-1/3 p-6 flex flex-col items-center justify-center border-r border-gray-200">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300">
                  <img
                    src={
                      artistDetails?.profileImage?.secure_url ||
                      "/api/placeholder/100/100"
                    }
                    alt={artistDetails?.userId?.name || "Artist"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center">
                {`${
                  artistDetails?.userId?.firstName
                    ? `${artistDetails?.userId?.firstName} ${artistDetails?.userId?.lastName}`
                    : "No artist"
                }`}
              </h3>
              <p className="text-gray-600 text-sm text-center">
                {artistDetails?.country || "International"}
              </p>
              <button
                className="mt-6 px-6 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
                onClick={() => navigate(`/ArtistProfilePage/${id}`)}
              >
                SEE FULL PROFILE
              </button>
            </div>

            {/* Artist Description */}
            <div className="w-2/3 p-6 flex flex-col">
              <h3 className="text-lg font-semibold mb-3">About the Artist</h3>
              <div
                className="overflow-hidden h-40"
                style={{
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <p className="text-sm text-gray-600">
                  {artistDetails?.aboutMe ||
                    `${
                      artDetail?.artist?.name || "This artist"
                    } is a contemporary artist known for their unique style and creative vision. 
                    With a background in fine arts and a passion for exploring new techniques, 
                    they have developed a distinctive approach that resonates with art enthusiasts worldwide.
                    
                    Their work has been featured in various exhibitions and galleries across the country, 
                    earning recognition for its innovative approach and emotional depth. Drawing inspiration from nature, 
                    urban landscapes, and personal experiences, the artist creates pieces that invite viewers 
                    to reflect and connect on a deeper level.
                    
                    Having refined their craft over many years, they continue to push boundaries and 
                    evolve their artistic expression with each new creation.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtDetailPage;
