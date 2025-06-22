import Header from "../components/Header";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaPencilAlt, FaCamera, FaEdit, FaPlus } from "react-icons/fa";
import MasonaryGridLayout from "../components/MasonaryGridLayout";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// Image Cropping Modal Component
const ImageCropModal = ({ 
  isOpen, 
  onClose, 
  imageSrc, 
  onCropComplete, 
  cropType = 'profile', // 'profile' or 'cover'
  isUploading = false,
  uploadProgress = 0 
}) => {
  const [crop, setCrop] = useState(
    cropType === 'profile' 
      ? { unit: '%', width: 50, height: 50, x: 25, y: 25, aspect: 1 }
      : { unit: '%', width: 80, height: 30, x: 10, y: 35, aspect: 16/9 }
  );
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  const handleCropAndUpload = () => {
    if (completedCrop && imgRef.current) {
      const canvas = document.createElement('canvas');
      const image = imgRef.current;
      const ctx = canvas.getContext('2d');

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      canvas.toBlob((blob) => {
        onCropComplete(blob);
      }, 'image/jpeg', 0.9);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            Crop {cropType === 'profile' ? 'Profile Picture' : 'Cover Photo'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            disabled={isUploading}
          >
            ×
          </button>
        </div>
        
        <div className="mb-4">
          <ReactCrop
            crop={crop}
            onChange={setCrop}
            onComplete={setCompletedCrop}
            aspect={cropType === 'profile' ? 1 : 16/9}
            circularCrop={cropType === 'profile'}
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop preview"
              className="max-w-full max-h-96 object-contain"
            />
          </ReactCrop>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            onClick={handleCropAndUpload}
            disabled={!completedCrop || isUploading}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <span>Crop & Upload</span>
            )}
          </button>
        </div>

        {/* Enhanced Progress Bar Section */}
        {isUploading && (
          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Upload Progress</span>
              <span className="text-sm font-medium text-amber-600">{uploadProgress}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${uploadProgress}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-amber-600"></div>
              <span>
                {uploadProgress < 30 ? 'Preparing image...' :
                 uploadProgress < 70 ? 'Uploading to server...' :
                 uploadProgress < 95 ? 'Processing image...' : 'Almost done...'}
              </span>
            </div>
            
            {/* Additional upload info */}
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
              <div className="flex items-center space-x-2">
                <FaCamera className="h-4 w-4 text-amber-600" />
                <span className="text-sm text-amber-800">
                  Your {cropType === 'profile' ? 'profile picture' : 'cover photo'} is being uploaded and optimized
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Empty State Component
const EmptyStateCard = ({ type, onEdit }) => (
  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
    <FaEdit className="mx-auto h-12 w-12 text-gray-400 mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      No {type} information
    </h3>
    <p className="text-gray-500 mb-4">
      Add your {type.toLowerCase()} details to complete your profile
    </p>
    <button
      onClick={onEdit}
      className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
    >
      <FaPlus className="w-4 h-4 mr-2" />
      Add {type}
    </button>
  </div>
);

function ArtistProfilePage() {
  const [activeTab, setActiveTab] = useState("info");
  const [showFullContent, setShowFullContent] = useState(false);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [cropType, setCropType] = useState('profile');
  const [uploadProgress, setUploadProgress] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, authUser } = useSelector((state) => state.auth);
  const { artistImageUploadLoading, artistDetails, getAllArtByArtist } = useSelector((state) => state.artist);
  let { id } = useParams();

  // Check if current user can edit this profile
  const canEdit = authUser?._id === id && authUser?.isArtist;

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
  }, [id, dispatch]);

  // Simulate upload progress when uploading
  useEffect(() => {
    if (artistImageUploadLoading) {
      setUploadProgress(0);
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(progressInterval);
    } else {
      // Upload completed
      if (uploadProgress > 0) {
        setUploadProgress(100);
        setTimeout(() => {
          setCropModalOpen(false);
          setCropImageSrc(null);
          setUploadProgress(0);
        }, 1000);
      }
    }
  }, [artistImageUploadLoading, uploadProgress]);

  const handleImageSelect = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setCropImageSrc(e.target.result);
        setCropType(type);
        setCropModalOpen(true);
        setUploadProgress(0);
      };
      reader.readAsDataURL(file);
    }
    // Reset input value to allow selecting same file again
    event.target.value = '';
  };

  const handleCropComplete = (croppedBlob) => {
    const formData = new FormData();
    
    if (cropType === 'profile') {
      formData.append("avatar", croppedBlob, `profile_${Date.now()}.jpg`);
    } else {
      formData.append("artistcoverPhoto", croppedBlob, `cover_${Date.now()}.jpg`);
    }

    dispatch({
      type: "UPDATE_ARTIST_IMAGE",
      payload: {
        artistId: id,
        body: formData,
      },
    });
  };

  const handleEditProfile = () => {
    navigate(`/artist/edit-profile/${id}`);
  };

  const renderContent = () => {
    const content = {
      info: artistDetails?.aboutMe,
      education: artistDetails?.education, 
      events: artistDetails?.events,
      exhibition: artistDetails?.exibition,
    };

    const text = content[activeTab];
    
    if (!text || text.trim() === '') {
      return <EmptyStateCard type={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} onEdit={handleEditProfile} />;
    }

    const displayedText = showFullContent ? text : text?.substring(0, 500);
    const shouldShowMore = text?.length > 500 && !showFullContent;

    return (
      <div className="h-full overflow-auto">
        <p className="text-gray-700 leading-relaxed">{displayedText}</p>
        {shouldShowMore && (
          <>
            <span className="text-gray-500">...</span>
            <button
              onClick={() => setShowFullContent(true)}
              className="text-amber-600 underline hover:text-amber-700 transition-colors ml-2"
            >
              See more
            </button>
          </>
        )}
        {showFullContent && text?.length > 500 && (
          <button
            onClick={() => setShowFullContent(false)}
            className="text-amber-600 underline hover:text-amber-700 transition-colors ml-2"
          >
            Show less
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-white">
      <Header />
      
      {/* Cover Photo */}
      <div className="w-full h-64 bg-gray-300 relative group">       
        {artistImageUploadLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <img
            src={artistDetails?.coverPhoto?.secure_url || "https://via.placeholder.com/1200x300/f3f4f6/9ca3af?text=Cover+Photo"}
            className="w-full h-full object-cover"
            alt="Cover"
          />
        )}   
        
        {canEdit && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <label
              htmlFor="coverUpload"
              className="text-white cursor-pointer bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all duration-200"
            >
              <FaCamera className="w-6 h-6 text-white" />
            </label>
            <input
              id="coverUpload"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageSelect(e, 'cover')}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex justify-center min-h-screen">
        {/* Profile Card */}
        <div className="shadow-lg rounded-lg w-96 p-6 relative bg-white">
          {/* Profile Picture */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white relative group shadow-lg">
              {artistImageUploadLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                </div>
              ) : (
                <img
                  src={artistDetails?.profileImage?.secure_url || "https://via.placeholder.com/150/f3f4f6/9ca3af?text=Profile"}
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              )}          
              
              {canEdit && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <label
                    htmlFor="profileUpload"
                    className="text-white cursor-pointer bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all duration-200"
                  >
                    <FaCamera className="w-5 h-5 text-white" />
                  </label>
                  <input
                    id="profileUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageSelect(e, 'profile')}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="text-center mt-24 h-20 p-2">
            <h2 className="text-xl font-semibold text-gray-900">
              {artistDetails?.userId?.firstName && artistDetails?.userId?.lastName 
                ? `${artistDetails.userId.firstName} ${artistDetails.userId.lastName}`
                : "Artist Name"
              }
            </h2>
            <p className="text-gray-600">
              {artistDetails?.city || artistDetails?.state || artistDetails?.country
                ? `${artistDetails?.city || ''}${artistDetails?.city && (artistDetails?.state || artistDetails?.country) ? ', ' : ''}${artistDetails?.state || ''}${artistDetails?.state && artistDetails?.country ? ', ' : ''}${artistDetails?.country || ''}`
                : "Location not specified"
              }
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-4">
            <div className="flex justify-around bg-gray-100 rounded-lg p-1">
              {['info', 'education', 'events', 'exhibition'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setShowFullContent(false);
                  }}
                  className={`py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab 
                      ? "bg-white text-amber-600 shadow-sm" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm h-[400px] overflow-y-auto p-4">
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Products List Section */}
        <div className="flex-1 p-4 max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Artworks</h3>
            {canEdit && (
              <button
                onClick={() => navigate('/artist/upload-artwork')}
                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              >
                <FaPlus className="w-4 h-4 mr-2" />
                Add Artwork
              </button>
            )}
          </div>
          
          <div className="flex-1 h-[85vh] overflow-y-auto bg-gray-50 p-4 rounded-lg border border-gray-200">
            {getAllArtByArtist && getAllArtByArtist.length > 0 ? (
              <MasonaryGridLayout artDetails={getAllArtByArtist} />
            ) : (
              <div className="text-center py-12">
                <FaEdit className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No artworks yet</h3>
                <p className="text-gray-500 mb-6">
                  {canEdit 
                    ? "Start showcasing your creativity by uploading your first artwork" 
                    : "This artist hasn't uploaded any artworks yet"
                  }
                </p>
                {canEdit && (
                  <button
                    onClick={() => navigate('/artist/upload-artwork')}
                    className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                  >
                    <FaPlus className="w-5 h-5 mr-2" />
                    Upload Artwork
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Crop Modal */}
      <ImageCropModal
        isOpen={cropModalOpen}
        onClose={() => {
          setCropModalOpen(false);
          setCropImageSrc(null);
        }}
        imageSrc={cropImageSrc}
        onCropComplete={handleCropComplete}
        cropType={cropType}
        isUploading={artistImageUploadLoading}
        uploadProgress={uploadProgress}
      />
    </div>
  );
}

export default ArtistProfilePage;