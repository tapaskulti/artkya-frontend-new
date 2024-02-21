import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faUpload } from "@fortawesome/free-solid-svg-icons";

const ImageUploadForm = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageChange = (e) => {
    const newImages = [...images];
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageData = {
        file: file,
        src: event.target.result,
        title: title,
        size: file.size,
        originalDimensions: `${file.width}x${file.height}`,
      };
      newImages.push(imageData);
      setImages(newImages);
    };

    reader.readAsDataURL(file);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = {
          file: file,
          src: event.target.result,
          title: title,
          size: file.size,
          originalDimensions: `${file.width}x${file.height}`,
        };
        const newImages = [...images];
        newImages.push(imageData);
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleImageSelection = (selectedImages) => {
    const newImages = [...images];
    selectedImages.forEach((selectedImage) => {
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
        <div
          className="preview-section border border-gray-300 rounded p-4 flex flex-wrap"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {images.length === 0 && (
            <FontAwesomeIcon
              icon={faImage}
              className="imageUploadPreviewIcon"
            />
          )}
          {images.length > 0 &&
            images.map((image, index) => (
              <div key={index} className="image-preview mb-4">
                <img
                  src={image.src}
                  alt={`Preview ${index}`}
                  className={`max-w-full ${
                    index === 0 ? "w-100 h-100" : "w-40 h-40"
                  }`}
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
        <Modal onClose={closeModal} onImageSelection={handleImageSelection} />
      )}
    </div>
  );
};

const Modal = ({ onClose, onImageSelection }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleSubmit = () => {
    onImageSelection(selectedImages);
  };

  return (
    <div className="imageUploader">
      <div className="innerImageUploader">
        <h2 className="text-xl font-bold mb-4">Upload Image</h2>
        <div className="dropzone-container">
          <label className="dropzoneInput cursor-pointer">
            <div className="dropzoneInputInner">
              <FontAwesomeIcon
                icon={faUpload}
                className="text-gray-500 uploadIcon"
              />
              <p className="mt-2">Drag and drop image here</p>
              <p className="mt-2">or<u> BROWSE IMAGE</u></p>
              <input
                id="modalImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple={true}
                className="hidden"
              />
            </div>
          </label>
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
              <button className="text-blue-500 mr-4" onClick={onClose}>
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleSubmit}
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

export default ImageUploadForm;
