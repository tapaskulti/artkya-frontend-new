import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  ZoomIn, 
  Check, 
  Star, 
  Shield, 
  Truck, 
  RotateCcw,
  MapPin,
  Calendar,
  Ruler,
  Palette,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

const ArtDetailPage = () => {
  // Mock data - replace with your Redux state
  const { artDetail } = useSelector((state) => state.art);
  const { authUser } = useSelector((state) => state.auth);
  const { artistDetails } = useSelector((state) => state.artist);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  //   useEffect(() => {
  //   if (activeTab === "print") {
  //     dispatch(setprintPrice({ printPrice: "75" }));
  //   }
  // }, [activeTab, dispatch]);

  // const [artDetail, setArtDetail] = useState({
  //   title: "Abstract Harmony",
  //   artist: {
  //     firstName: "Elena",
  //     lastName: "Rodriguez",
  //     name: "Elena Rodriguez",
  //     _id: "artist123"
  //   },
  //   thumbnail: { secure_url: "/api/placeholder/600/500" },
  //   art: [
  //     { secure_url: "/api/placeholder/600/500" },
  //     { secure_url: "/api/placeholder/600/500" },
  //     { secure_url: "/api/placeholder/600/500" },
  //   ],
  //   printOption: "Both", // "Original", "Printed", "Both"
  //   description: "A stunning contemporary piece that explores the intersection of color and emotion through bold brushstrokes and dynamic composition.",
  //   medium: ["Oil on Canvas"],
  //   width: "120",
  //   height: "90",
  //   depth: "3",
  //   year: "2024",
  //   totalPrice: 2500,
  //   location: "New York, USA",
  //   styles: ["Abstract", "Contemporary"],
  //   materials: ["Canvas", "Oil Paint"],
  //   isFramed: true
  // });

  // const [artistDetails, setArtistDetails] = useState({
  //   userId: {
  //     firstName: "Elena",
  //     lastName: "Rodriguez"
  //   },
  //   profileImage: { secure_url: null },
  //   country: "United States",
  //   aboutMe: "Elena Rodriguez is a contemporary abstract artist whose work explores the emotional landscape through vibrant colors and dynamic forms. With over 15 years of experience, her pieces have been featured in galleries across North America and Europe."
  // });

  // UI State
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("original");
  const [activeInfoTab, setActiveInfoTab] = useState("about");
  const [selectedSize, setSelectedSize] = useState({
    label: "8 × 10 inches",
    value: "8*10 inches"
  });
  const [printPrice, setPrintPrice] = useState(75);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  // Print size options with prices
  const printSizes = [
    { label: "8 × 10 inches", value: "8*10 inches", price: 75 },
    { label: "16 × 20 inches", value: "16*20 inches", price: 175 },
    { label: "20 × 30 inches", value: "20*30 inches", price: 195 },
    { label: "24 × 36 inches", value: "24*36 inches", price: 285 },
  ];

  useEffect(() => {
    if (artDetail?.thumbnail?.secure_url) {
      setSelectedImage(artDetail.thumbnail.secure_url);
    }
    // Set initial tab based on printOption
    if (artDetail?.printOption === "Printed") {
      setActiveTab("print");
    } else {
      setActiveTab("original");
    }
  }, [artDetail]);

  // Handle Square Payment for Print Copy
  const handlePrintPayment = async () => {
    setIsPaymentLoading(true);
    
    try {
      // Simulate Square payment integration
      const paymentData = {
        sourceId: "card_token_from_square_form", // This would come from Square's card form
        amount: printPrice * 100, // Square expects cents
        currency: "USD",
        metadata: {
          artId: artDetail._id,
          size: selectedSize.value,
          type: "print_copy"
        }
      };

      // Replace with actual axios call in your implementation
      // const response = await fetch('/api/payment/square', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(paymentData)
      // });
      
      // Simulate successful payment for demo
      console.log("Payment data:", paymentData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful payment
      console.log("Payment successful - simulated");
      
      // Update print copies count in backend (simulated)
      // await fetch('/api/art/update-print-sales', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     artId: artDetail._id,
      //     dimension: selectedSize.value,
      //     saleAmount: printPrice
      //   })
      // });
      
      alert("Payment successful! Your print copy will be processed shortly.");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsPaymentLoading(false);
    }
  };

  // Determine which tabs to show based on printOption
  const shouldShowOriginal = artDetail?.printOption === "Original" || artDetail?.printOption === "Both";
  const shouldShowPrint = artDetail?.printOption === "Printed" || artDetail?.printOption === "Both";

  const infoContent = {
    about: (
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-700 leading-relaxed mb-4">
          {artDetail?.description || "No description available for this artwork."}
        </p>
        <p className="text-gray-600">
          Created by {artDetail?.artist?.name || "Unknown Artist"} in {artDetail?.year || "N/A"}.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Style & Medium</h4>
            <div className="space-y-1">
              {artDetail?.styles?.map((style, index) => (
                <span key={index} className="inline-block bg-gray-100 px-2 py-1 rounded text-sm mr-2">
                  {style}
                </span>
              ))}
            </div>
            <div className="mt-2">
              {artDetail?.medium?.map((med, index) => (
                <span key={index} className="text-sm text-gray-600">{med}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Materials</h4>
            <div className="space-y-1">
              {artDetail?.materials?.map((material, index) => (
                <span key={index} className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm mr-2">
                  {material}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    details: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Artwork Specifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Ruler className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Dimensions</span>
              </div>
              <span className="text-gray-700">{artDetail?.width}W × {artDetail?.height}H × {artDetail?.depth}D cm</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Medium</span>
              </div>
              <span className="text-gray-700">{artDetail?.medium?.join(", ") || "Not specified"}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Year Created</span>
              </div>
              <span className="text-gray-700">{artDetail?.year || "N/A"}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Additional Information</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Certificate of Authenticity</span>
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">Framed</span>
              <span className="text-blue-700">{artDetail?.isFramed ? "Yes" : "No"}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="font-medium">Archival Quality</span>
              <Check className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    ),
    shipping: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <Truck className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-900">Free Shipping</h4>
              <p className="text-blue-700 text-sm">Worldwide delivery included</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
            <Shield className="w-6 h-6 text-green-600 mt-1" />
            <div>
              <h4 className="font-semibold text-green-900">Insured Transit</h4>
              <p className="text-green-700 text-sm">Full value protection</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
            <RotateCcw className="w-6 h-6 text-orange-600 mt-1" />
            <div>
              <h4 className="font-semibold text-orange-900">14-Day Returns</h4>
              <p className="text-orange-700 text-sm">Satisfaction guarantee</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-bold text-lg">Delivery Timeline</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
              <span>Original Artwork</span>
              <span className="font-medium">3-5 business days</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
              <span>Print Copies</span>
              <span className="font-medium">1-2 business days</span>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  const defaultUserImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Gallery</span>
            </button>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full transition-all ${isWishlisted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="flex space-x-4">
              {/* Thumbnails */}
              <div className="flex flex-col space-y-3">
                {artDetail?.art?.map((singleArt, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(singleArt?.secure_url)}
                    className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                      selectedImage === singleArt?.secure_url
                        ? "ring-2 ring-blue-500 ring-offset-2"
                        : "ring-1 ring-gray-200 hover:ring-gray-300"
                    }`}
                  >
                    <img
                      src={singleArt?.secure_url}
                      alt={`View ${index + 1}`}
                      className="w-16 h-16 object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 relative">
                <div className="aspect-[4/3] bg-white rounded-2xl shadow-lg overflow-hidden relative group">
                  <img
                    src={selectedImage}
                    alt={artDetail?.title}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <button 
                    onClick={() => setIsZoomed(true)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                  >
                    <ZoomIn className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Tabs */}
              {(shouldShowOriginal || shouldShowPrint) && (
                <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
                  {shouldShowOriginal && (
                    <button
                      onClick={() => setActiveTab("original")}
                      className={`flex-1 py-3 px-4 text-center font-semibold rounded-lg transition-all duration-300 ${
                        activeTab === "original"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Original Art
                    </button>
                  )}
                  {shouldShowPrint && (
                    <button
                      onClick={() => setActiveTab("print")}
                      className={`flex-1 py-3 px-4 text-center font-semibold rounded-lg transition-all duration-300 ${
                        activeTab === "print"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Print Copy
                    </button>
                  )}
                </div>
              )}

              {/* Artwork Info */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {artDetail?.title || "Untitled Artwork"}
                </h1>
                <p className="text-xl text-gray-600 mb-2">
                  by {artDetail?.artist?.name || "Unknown Artist"}
                </p>
                {artDetail?.location && (
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {artDetail?.location}
                  </div>
                )}
              </div>

              {/* Price and Purchase Options */}
              <div className="space-y-6">
                {activeTab === "original" ? (
                  <div className="space-y-6">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                      <div className="text-sm text-gray-600 mb-2">
                        Size: {artDetail?.width}W × {artDetail?.height}H × {artDetail?.depth}D cm
                      </div>
                      <div className="text-4xl font-light text-gray-900">
                        ${artDetail?.totalPrice?.toLocaleString() || "Price on request"}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02]">
                        ADD TO CART
                      </button>
                      <button className="w-full bg-white border-2 border-gray-900 hover:bg-gray-50 text-gray-900 py-4 rounded-xl font-semibold transition-all duration-300">
                        MAKE AN OFFER
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Select Size:
                      </label>
                      <div className="space-y-2">
                        {printSizes.map((size) => (
                          <button
                            key={size.value}
                            onClick={() => {
                              setSelectedSize(size);
                              setPrintPrice(size.price);
                            }}
                            className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                              selectedSize.value === size.value
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{size.label}</span>
                              <span className="text-gray-600">${size.price}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <div className="text-4xl font-light text-gray-900">
                        ${printPrice}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Digital print copy
                      </div>
                    </div>
                    
                    <button
                      onClick={handlePrintPayment}
                      disabled={isPaymentLoading}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPaymentLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        "BUY PRINT COPY"
                      )}
                    </button>
                  </div>
                )}

                {/* Benefits */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-1 bg-green-100 rounded-full">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">Free worldwide shipping</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-1 bg-blue-100 rounded-full">
                        <Shield className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">14-day satisfaction guarantee</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-1 bg-purple-100 rounded-full">
                        <Star className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium">Certificate of authenticity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Artist Profile Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 ring-4 ring-white shadow-lg">
                  <img
                    src={artistDetails?.profileImage?.secure_url || defaultUserImage}
                    alt={artistDetails?.userId?.firstName || "Artist"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {artistDetails?.userId?.firstName 
                  ? `${artistDetails.userId.firstName} ${artistDetails.userId.lastName}`
                  : "Artist Name"}
              </h3>
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{artistDetails?.country || "Location"}</span>
              </div>
              <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                VIEW FULL PROFILE
              </button>
            </div>
            
            <div className="lg:col-span-2 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About the Artist</h3>
              <p className="text-gray-700 leading-relaxed">
                {artistDetails?.aboutMe || 
                  `${artDetail?.artist?.name || "This artist"} is a contemporary artist known for their unique style and creative vision. With a background in fine arts and a passion for exploring new techniques, they have developed a distinctive approach that resonates with art enthusiasts worldwide.`}
              </p>
            </div>
          </div>
        </div>

        {/* Information Tabs */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {Object.keys(infoContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveInfoTab(tab)}
                  className={`py-6 font-semibold text-sm uppercase tracking-wide border-b-2 transition-all ${
                    activeInfoTab === tab
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab === "about" ? "About the Artwork" : 
                   tab === "details" ? "Details & Dimensions" : 
                   "Shipping & Returns"}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-8">
            <div className="max-h-96 overflow-y-auto">
              {infoContent[activeInfoTab]}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all z-10"
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt={artDetail?.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtDetailPage;
