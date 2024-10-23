import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";

const Dropzone = ({ closeModal, handleDropZoneImageSelection }) => {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/jpeg, image/png",
    maxSize: 50 * 1024 * 1024, // 50MB
    onDrop: async (acceptedFiles) => {
      const validFiles = [];
      const errors = [];

      await Promise.all(
        acceptedFiles.map(async (file) => {
          const image = new Image();
          const preview = URL.createObjectURL(file); // Create preview URL

          image.src = preview;

          const isValid = await new Promise((resolve) => {
            image.onload = function () {
              const isLargeEnough =
                this.width >= 1500 && this.height >= 1200;
              resolve(isLargeEnough);
            };
          });

          if (isValid) {
            validFiles.push(Object.assign(file, { preview })); // Keep original file properties intact
          } else {
            errors.push(`${file.name} does not meet the size criteria.`);
          }
        })
      );

      setFiles(validFiles);
      setErrorMessage(errors.join("\n"));
    },
  });

  const removeFile = (file) => () => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
  };

  const thumbs = files.map((file, index) => (
    <div key={index} className="relative w-36 h-36">
      <img
        src={file.preview}
        alt={file.name}
        className="w-full h-full object-cover rounded-lg shadow-md"
      />
      <button
        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full"
        onClick={removeFile(file)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  ));

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Image</h2>

        <div
          {...getRootProps({
            className:
              "border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer",
          })}
        >
          <input {...getInputProps()} />
          <FontAwesomeIcon icon={faUpload} className="text-gray-500 text-4xl" />
          <p className="mt-2 text-gray-600">
            {files.length === 0
              ? "Drag and drop an image here"
              : "Drag and drop a different image here"}
          </p>
          <p
            onClick={open}
            className="text-blue-500 underline cursor-pointer"
          >
            {files.length === 0 ? "or BROWSE IMAGE" : "or BROWSE DIFFERENT IMAGE"}
          </p>
        </div>

        {errorMessage && (
          <p className="text-red-500 mt-4">{errorMessage}</p>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-6">{thumbs}</div>

        <div className="mt-6">
          <p className="font-medium mb-2">Your image file must be:</p>
          <ul className="list-disc list-inside text-gray-700">
            <li>JPEG or PNG format</li>
            <li>At least 1500W x 1200H pixels</li>
            <li>Less than 50MB</li>
          </ul>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button className="text-blue-500" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleDropZoneImageSelection(files)}
          >
            Submit
          </button>
        </div>

        <p className="text-sm text-gray-500 text-right mt-2">
          By clicking "Submit", I confirm that I am the copyright owner of
          this image.
        </p>
      </div>
    </div>
  );
};

export default Dropzone;
