/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import ArtUploadForm from './ImageUploadForm';

// Art Upload Form Component - replace this import with your actual ArtUploadForm
// import ArtUploadForm from './ArtUploadForm';

// const ArtworkForm = () => (
//   <div className="p-6 bg-white min-h-screen">
//     <div className="max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Upload Artwork</h2>
//       <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-200">
//         <p className="text-gray-500">Your ArtUploadForm (ImageUploadForm) component goes here</p>
//         <p className="text-sm text-gray-400 mt-2">
//           Replace this placeholder with your actual ArtUploadForm component
//         </p>
//       </div>
//     </div>
//   </div>
// );

// How To Tutorial Component
const HowToTutorial = ({ handalCompBtnClick }) => (
  <div className="p-6 bg-white min-h-screen">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">How to Photograph Your Artwork</h2>
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Step 1: Lighting</h3>
            <p className="text-gray-600">Use natural lighting or professional photography lights for best results.</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Step 2: Positioning</h3>
            <p className="text-gray-600">Position your artwork flat and straight, avoiding any shadows or reflections.</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Step 3: Quality</h3>
            <p className="text-gray-600">Use high resolution settings and ensure the image is sharp and clear.</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => handalCompBtnClick("uploadwork")}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Start Uploading
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Main Artwork Manager Component
const ArtWorkManager = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeComp, setActiveComp] = useState(null);

  const handalBtnClick = (path) => {
    setActiveTab(path);
  };

  const handalCompBtnClick = (compName) => {
    setActiveComp(compName);
  };

  useEffect(() => {
    if (activeComp === "uploadwork") {
      setActiveTab(null);
    }
  }, [activeTab, activeComp]);

  return (
    <>
      {activeTab === 'home' && (
        <div className="flex flex-col items-center mt-10 h-screen bg-white">
          <div className="w-full max-w-lg bg-white border-2 border-gray-200 rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Your Artworks</h1>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Verified
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 mb-3">
                  To start selling, please{" "}
                  <span className="font-bold">
                    provide your tax information and verify your photo ID
                  </span>
                  .
                </p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Start Selling
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full max-w-lg bg-white border-2 border-gray-200 rounded-lg shadow-md p-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                You Have No Artworks. Start Uploading.
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  See our tutorial on how to photograph your artworks first,
                  or just get started with your first upload.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handalBtnClick("tutorial")}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    See Tutorial
                  </button>
                  <button
                    onClick={() => handalCompBtnClick("uploadwork")}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Upload Artwork
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "tutorial" && !activeComp && (
        <HowToTutorial handalCompBtnClick={handalCompBtnClick} />
      )}
      {activeComp === "uploadwork" && <ArtUploadForm />}
    </>
  );
};

export default ArtWorkManager;