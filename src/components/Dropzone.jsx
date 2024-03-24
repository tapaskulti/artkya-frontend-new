// Dropzone component
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import ImageCropper from '../components/ImageCropper'; 

const Dropzone = ({ closeModal, handleDropZoneImageSelection,isThumbnailImage }) => {
  const [files, setFiles] = useState([]);
  const [seletcedFiles, setSeletcedFiles] = useState([]);
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const handleCropCompleted = (area, pixels) => {
    setCroppedArea(area);
    setCroppedAreaPixels(pixels);
  };
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setSeletcedFiles(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) => ({
          ...file,
          preview: URL.createObjectURL(file),
        }))
      );
    },
  });

  const removeFile = (file) => () => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
  };

  const thumbs = files.map((file) => (
    <div key={file.name} className="previewImg border rounded-none">
      {
        isThumbnailImage? <ImageCropper
        image={file.preview}
        aspectRatio={1/1}
        onCropCompleted={handleCropCompleted}
      />:<img src={file.preview} alt={file.name} />
      }
     
      <button className="deleteIcon" onClick={removeFile(file)}>
        X
      </button>
    </div>
  ));

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <div className="imageUploader">
      <div className="innerImageUploader">
        <h2 className="text-xl font-bold mb-4">Upload Image</h2>
        <div
          {...getRootProps({ className: "dropzone" })}
          onClick={(e) => e.stopPropagation()}
        >
          {files.length > 0 && thumbs}
          <input {...getInputProps()} />
          <FontAwesomeIcon
            icon={faUpload}
            className="text-gray-500 uploadIcon"
          />
          <p className="mt-2">Drag and drop image here</p>
          <p onClick={open} className="mt-2">
            or<u> BROWSE IMAGE</u>
          </p>
        </div>
        <div className="flex imageUploaderFooter mt-6">
          <div className="image-req-text">
            <p>Your image file must be:</p>
            <ul className="ul-list">
              <li>
                <i>JPEG or PNG format</i>
              </li>
              <li>
                <i>At least 1500W x 1200H pixels</i>
              </li>
              <li>
                <i>Less than 50MB</i>
              </li>
            </ul>
          </div>
          <div>
            <div className="flex justify-end mt-6">
              <button
                className="text-blue-500 mr-4"
                onClick={() => closeModal()}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleDropZoneImageSelection(seletcedFiles,croppedArea,croppedAreaPixels)}
              >
                Submit
              </button>
            </div>
            <div className="flex justify-end mt-6">
              <p className="text-sm text-gray-500 ">
                By clicking "Submit", I confirm that I am the copyright owner of
                this image.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Dropzone;
