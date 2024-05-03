import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImg";

const ImageCropper = ({ image, aspectRatio, onCropCompleted, onCloseImageCropper }) => {
  const [crop, setCrop] = useState({ x: 400, y: 400 });
  const [zoom, setZoom] = useState(1);
  const [newImage, setNewImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedImageAreaPixels, setCroppedImageAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    onCropCompleted(croppedArea, croppedAreaPixels, croppedImage);
    setCroppedImageAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const { blobURL, blobFile } = await getCroppedImg(
        image,
        croppedImageAreaPixels
      );
      setCroppedImage(blobURL);
      setNewImage(blobFile);
      onCloseImageCropper(blobFile);
    } catch (e) {
      console.error("Error in showCroppedImage", e);
    }
  };

  return (
    <div className="imageCropper">
      <div className="imageCropperBody">
        <div className="cropTitle">
          <h1>Select thumbnail</h1>
        </div>
        <div className="cropperZone">
          <div className="croppreview">
            <img
              src={croppedImage ? croppedImage : image.preview}
              width={200}
            />
            <p>{newImage ? newImage.name : image.path}</p>
            <p>{((newImage ? newImage.size : image.size) / (1024 * 1024)).toFixed(1)}Mb</p>
          </div>
          <div className="crop-container">
            <Cropper
              image={image.preview}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        </div>
        <div className="cropperZoneFooter my-5">
          <div className="resetOrClose mb-5">
            <div className="" onClick={() => onCloseImageCropper(0)}>
              UPLOAD NEW IMAGE
            </div>
            <div onClick={() => setZoom(1)}>
              <FontAwesomeIcon icon={faSyncAlt} />
            </div>
          </div>

          <div className="btnset mb-5">
            <div>
              <button
                className="bg-gray-500 text-white-500 px-4 py-2  rounded-md"
                onClick={() => onCloseImageCropper(0)}
              >
                Cancel
              </button>
            </div>
            <div className="copyright_ok">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => showCroppedImage()}
              >
                Submit
              </button>
              <i>
              By clicking "Submit", I confirm that I am the copyright owner
              of this image.
            </i>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ImageCropper;
