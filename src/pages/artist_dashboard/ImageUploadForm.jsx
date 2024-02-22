// ImageUploadForm component
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Dropzone from "../../components/Dropzone";

const ImageUploadForm = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleImageSelection = (selectedImages) => {
    const newImages = [...images];
    // newImages.push(selectedImages)
    console.log('selectedImages',selectedImages);
    selectedImages.forEach((selectedImage) => {
      console.log('selectedImage',selectedImage);
      newImages.push({
        file: selectedImage,
        src: URL.createObjectURL(selectedImage),
        title: title,
        size: selectedImage.size,
        originalDimensions: `${selectedImage.width}x${selectedImage.height}`,
      });
    });
    setImages(newImages);
    closeModal();
  };

  return (
    <div className="flex w-full">
      <div className="w-1/3 p-4">
        <div className="preview-section border border-gray-300 rounded p-4 flex flex-wrap">
          {images.length === 0 && (
            <FontAwesomeIcon icon={faImage} className="imageUploadPreviewIcon" />
          )}
          {images.length > 0 &&
            images.map((image, index) => (
              <div key={index} className="image-preview mb-4">
                <img
                  src={image.src}
                  alt={`Preview ${index+1}`}
                  className={`max-w-full ${index === 0 ? "w-100 h-100" : "w-40 h-40"}`}
                />
              </div>
            ))}
          <div className="Title p-2">
            Title
            <div>
              <i>{title}</i>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 p-4">
        <div className="upload-title">
          <label htmlFor="titleInput" className="block mb-2">
            Title:
          </label>
          <input
            id="titleInput"
            type="text"
            value={title}
            placeholder="Enter title"
            onChange={handleTitleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="upload-image w-1/3 h-10">
          <h1 className="block mb-2">Upload Art Image:</h1>
          <label
            htmlFor="imageInput"
            className="block imageInput"
            onClick={openModal}
          >
            <div className="addSign"></div>
            <div className="text-center">
              {images.length < 1 && (
                <u>
                  <small>ADD PRIMARY IMAGE</small>
                </u>
              )}
              {images.length > 1 && (
                <u>
                  <small>ADD ADDITIONAL IMAGE</small>
                </u>
              )}
            </div>
          </label>
        </div>
      </div>

      {modalOpen && (
        <Dropzone closeModal={closeModal} handleImageSelection={handleImageSelection} />
      )}
    </div>
  );
};

export default ImageUploadForm;
