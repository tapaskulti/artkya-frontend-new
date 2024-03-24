import React, { useState } from "react";
import ImageUploadForm  from "./ImageUploadForm";
const StepProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex justify-between w-full mt-1">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index} className="w-1/4 text-center text-sm relative">
            <div className="flex flex-col items-center">
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  currentStep >= index + 1 ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <span className="text-white">{index + 1}</span>
              </div>
              <div>
                {index + 1 === 1 && <div className="font-bold">Image</div>}
                {index + 1 === 2 && <div className="font-bold">Description</div>}
                {index + 1 === 3 && (
                  <div className="font-bold">Price & Details</div>
                )}
                {index + 1 === 4 && <div className="font-bold">Prints</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const ArtworkForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  // Function to handle progressing to the next step
  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  };

  // Function to handle going back to the previous step
  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between w-full   mt-1">
          <div className="flex justify-between w-full">
            <StepProgressBar
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between w-full">
          <div className="flex justify-between w-full mt-1">
            {currentStep && <ImageUploadForm  currentStep={currentStep}
          nextStep={nextStep}
          prevStep={prevStep}/>}
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between w-full   mt-1">
          <div className="flex justify-between w-full">
            <button
              onClick={prevStep}
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Save & Exit
            </button>
            {currentStep !== totalSteps && (
              <button
                onClick={nextStep}
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Save & Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtworkForm;
