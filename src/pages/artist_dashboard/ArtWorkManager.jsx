import React, { useState, useEffect } from "react";
import HowToTutorial from "./HowToTutorial";
import ArtworkForm from "./ArtworkForm";
function ArtWorkManager() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeComp, setActiveComp] = useState(null);
  const handalBtnClick = (path) => {
    setActiveTab(path);
  };
  const handalCompBtnClick = (compName) => {
    console.log("compName", compName);
    setActiveComp(compName);
  };
  useEffect(() => {
    console.log("activeComp", activeComp);
    console.log("activeTab", activeTab);
    // if (activeTab !== "tutorial") {
    //   setActiveComp(null);
    // }
    if (activeComp == "uploadwork") {
      setActiveTab(null)
    }
  }, [activeTab,activeComp]);
  return (
    <>
      {activeTab=='home' && (
        <div className="flex flex-col items-center mt-10 h-screen">
          <div className="w-full max-w-lg bg-white border-2 rounded-none p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Your Artworks</h1>
                <div className="bg-blue-500 text-white px-2 py-1 rounded">
                  Verified
                </div>
              </div>
              <div
                data-type="notification"
                data-section="verification-notification"
              >
                <p className="text-sm text-gray-700">
                  To start selling, please{" "}
                  <span className="font-bold">
                    provide your tax information and verify your photo ID
                  </span>
                  .
                </p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
              
                >
                  Start Selling
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full max-w-lg bg-white border-2 rounded-none p-6">
            <div data-section="no-artworks">
              <h2 className="text-xl font-bold text-gray-800">
                You Have No Artworks. Start Uploading.
              </h2>
              <div className="mt-4 space-y-2">
                <p className="text-gray-700">
                  See our tutorial on how to photograph your artworks first,
                  <br />
                  or just get started with your first upload.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handalBtnClick("tutorial")}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    See Tutorial
                  </button>
                  <button
                    onClick={() => handalCompBtnClick("uploadwork")}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Upload Artwork
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab == "tutorial" && !activeComp && (
        <HowToTutorial handalCompBtnClick={handalCompBtnClick} />
      )}
      {activeComp == "uploadwork" && <ArtworkForm />}
    </>
  );
}

export default ArtWorkManager;
