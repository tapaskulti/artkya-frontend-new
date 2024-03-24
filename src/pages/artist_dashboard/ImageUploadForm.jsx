// ImageUploadForm component
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Dropzone from "../../components/Dropzone";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
const ImageUploadForm = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDropZoneImageSelection = (selectedImages,croppedArea,croppedAreaPixels) => {
    const newImages = [...images];
    // newImages.push(selectedImages)
    console.log("selectedImages", selectedImages);
    console.log('croppedArea#############',croppedArea);
    console.log('croppedAreaPixels#############',croppedAreaPixels);
    selectedImages.forEach((selectedImage) => {
      console.log("selectedImage", selectedImage);
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
                  alt={`Preview ${index + 1}`}
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
        <Accordion open={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            <div className="flex justify-between items-center">
              <FontAwesomeIcon
                icon={open === 1 ? faChevronDown : faChevronRight}
              />
              <span> Title</span>
            </div>
          </AccordionHeader>
          <AccordionBody>
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
          </AccordionBody>
        </Accordion>
        <div className="upload-image h-10">
          <Accordion open={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)}>
              <div className="flex justify-between items-center">
                <FontAwesomeIcon
                  icon={open === 2 ?faChevronDown  : faChevronRight}
                />
                <span> Image</span>
              </div>
            </AccordionHeader>
            <AccordionBody>
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
            </AccordionBody>
          </Accordion>
        </div>
      </div>

      {modalOpen && (
        <Dropzone
          closeModal={closeModal}
          handleDropZoneImageSelection={handleDropZoneImageSelection}
          isThumbnailImage={images.length<1}
        />
      )}
    </div>
  );
};

export default ImageUploadForm;
