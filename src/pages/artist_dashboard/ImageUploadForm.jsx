import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faChevronDown,
  faChevronRight,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import Dropzone from "../../components/Dropzone";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
const ImageUploadForm = ({ currentStep, nextStep, prevStep,HandlecheckForNextBtnSubmit }) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    setStep(currentStep);
  }, [currentStep]);

  const handleNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 4));
    nextStep();
  };

  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
    prevStep();
  };

  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(1);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [mediums, setMediums] = useState("");
  const [materials, setMaterials] = useState("");
  const [styles, setStyles] = useState("");
  const [width, setWidth] = useState(1);
  const [hight, setHight] = useState(1);
  const [depth, setDepth] = useState(1);
  const [keywords, setKeywords] = useState();
  const [description, setDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [platformFee, setPlatformFee] = useState("");
  const [validationErr, setValidationErr] = useState("");
  const [spErr, setSpErr] = useState("");
  const [opErr, ertOpErr] = useState("");
  const [isPriceFormErr, setIsPriceFormErr] = useState(false);
  useEffect(() => {
    setIsPriceFormErr(false);
    setValidationErr("");
    setSpErr("");
    ertOpErr("");

    if (!sellingPrice) {
      setIsPriceFormErr(true);
      setSpErr("Please Enter Selling Price");
      return;
    }

    if (!/^\d*\.?\d*$/.test(sellingPrice)) {
      setIsPriceFormErr(true);
      setSpErr("Please Enter Number only for Selling Price");
      return;
    }

    if (offerPrice && !/^\d*\.?\d*$/.test(offerPrice)) {
      setIsPriceFormErr(true);
      ertOpErr("Please Enter Number only for Offer Price");
      return;
    }

    if (offerPrice && sellingPrice < offerPrice) {
      setValidationErr("Offer Price cannot be more than Selling Price");
      setIsPriceFormErr(true);
    } else if (!isPriceFormErr) {
      setPlatformFee((offerPrice * 0.2).toFixed(2));
    }
  }, [sellingPrice, offerPrice, isPriceFormErr]);
  useEffect(() => {
    if (currentStep == 1 && title && images.length > 0) {
      HandlecheckForNextBtnSubmit(false)
      console.log(false);
    } else {
      HandlecheckForNextBtnSubmit(true)
    }
  }, [title,images ,currentStep]);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleChange = (value, setState) => {
    setState(value);
  };
  const handleRemoveKeyword = (index) => {
    const updatedKeywords = keywords
      .split(" ")
      .filter((_, i) => i !== index)
      .join(" ");
    setKeywords(updatedKeywords);
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 50; i--) {
      years.push(i);
    }
    return years;
  };
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDropZoneImageSelection = (selectedImages) => {
    const newImages = [...images];
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
                  className={`max-w-full ${index === 0 ? "w-100 h-100" : "w-40 h-40"
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
        {step === 1 && (
          <>
            <div className="formTitle">
              <h1>Artwork</h1>
            </div>
            <Accordion open={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)}>
                <div className="w-full flex justify-between items-center">
                  <div className="flex  justify-between items-center">
                    <FontAwesomeIcon
                      icon={open === 1 ? faChevronDown : faChevronRight}
                    />
                    <span className="accordionHeader">Title</span>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className={title ? 'text-green-500' : 'text-red-500'}
                    />
                  </div>
                </div>

              </AccordionHeader>
              <AccordionBody>
                <div className="upload-title">
                  <label htmlFor="titleInput" className="block mt-5">
                    Title:
                  </label>
                  <input
                    id="titleInput"
                    type="text"
                    value={title}
                    placeholder="Enter title"
                    onChange={(e) => handleChange(e.target.value, setTitle)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </AccordionBody>
            </Accordion>
            <div className="upload-image h-10">
              <Accordion open={open === 2}>
                <AccordionHeader onClick={() => handleOpen(2)}>
                  <div className="w-full flex justify-between items-center">
                    <div className="flex justify-between items-center">
                      <FontAwesomeIcon
                        icon={open === 2 ? faChevronDown : faChevronRight}
                      />
                      <span className="accordionHeader"> Image</span>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={images.length > 0 ? 'text-green-500' : 'text-red-500'}
                      />
                    </div>
                  </div>

                </AccordionHeader>
                <AccordionBody>
                  <h1 className="block mt-5">Upload Art Image:</h1>
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
          </>
        )}

        {step === 2 && (
          <>
            <div className="formTitle">
              <h1>Description</h1>
            </div>
            <Accordion open={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)}>
                <div className="flex justify-between items-center">
                  <FontAwesomeIcon
                    icon={open === 1 ? faChevronDown : faChevronRight}
                  />
                  <span className="accordionHeader">
                    {" "}
                    Category, Subject, Year
                  </span>
                </div>
              </AccordionHeader>
              <AccordionBody>
                <div className="upload-title">
                  <label htmlFor="year" className="block mt-5">
                    Category:
                  </label>
                  <div className="relative w-full">
                    <input
                      id="category"
                      type="text"
                      value={category}
                      placeholder="Search and Select"
                      onChange={(e) =>
                        handleChange(e.target.value, setCategory)
                      }
                      className="w-full mt-3 px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="upload-title">
                  <label htmlFor="year" className="block mt-5">
                    Subject:
                  </label>
                  <div className="relative w-full">
                    <input
                      id="subject"
                      type="text"
                      value={subject}
                      placeholder="Search and Select"
                      onChange={(e) => handleChange(e.target.value, setSubject)}
                      className="w-full mt-3 px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="upload-title">
                  <label htmlFor="year" className="block mt-5">
                    Year:
                  </label>
                  <div className="relative w-full">
                    <select
                      id="year"
                      value={selectedYear}
                      onChange={(e) =>
                        handleChange(e.target.value, setSelectedYear)
                      }
                      className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select Year</option>
                      {generateYears().map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 2}>
              <AccordionHeader onClick={() => handleOpen(2)}>
                <div className="flex justify-between items-center">
                  <FontAwesomeIcon
                    icon={open === 2 ? faChevronDown : faChevronRight}
                  />
                  <span className="accordionHeader">
                    {" "}
                    Mediums, Materials & Styles
                  </span>
                </div>
              </AccordionHeader>
              <AccordionBody>
                <div className="upload-title">
                  <label htmlFor="year" className="block mt-5">
                    Mediums:
                  </label>
                  <div className="relative w-full">
                    <input
                      id="mediums"
                      type="text"
                      value={mediums}
                      placeholder="Search and Select"
                      onChange={(e) => handleChange(e.target.value, setMediums)}
                      className="w-full mt-3 px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="upload-title">
                  <label htmlFor="year" className="block mt-5">
                    Materials:
                  </label>
                  <div className="relative w-full">
                    <input
                      id="materials"
                      type="text"
                      value={materials}
                      placeholder="Search and Select"
                      onChange={(e) =>
                        handleChange(e.target.value, setMaterials)
                      }
                      className="w-full mt-3 px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="upload-title">
                  <label htmlFor="year" className="block mt-5">
                    Styles:
                  </label>
                  <div className="relative w-full">
                    <input
                      id="styles"
                      type="text"
                      value={styles}
                      placeholder="Search and Select"
                      onChange={(e) => handleChange(e.target.value, setStyles)}
                      className="w-full mt-3 px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 3}>
              <AccordionHeader onClick={() => handleOpen(3)}>
                <div className="flex justify-between items-center">
                  <FontAwesomeIcon
                    icon={open === 3 ? faChevronDown : faChevronRight}
                  />
                  <span className="accordionHeader"> Dimensions</span>
                </div>
              </AccordionHeader>
              <AccordionBody>
                <div className="upload-title">
                  <label htmlFor="titleInput" className="block mt-5">
                    It’s very important that you provide accurate dimensions as
                    collectors and trade clients need to know the exact size of
                    the artwork before purchasing it. For flat artworks, such as
                    photographs and other works on paper, we suggest that you
                    enter a depth of 0.1.
                  </label>
                  <div className="dimensions">
                    <div className="m-2 w-1/4">
                      <label htmlFor="titleInput1" className="block">
                        Width
                      </label>
                      <input
                        id="titleInput1"
                        type="text"
                        value={width}
                        placeholder="Enter title"
                        onChange={(e) => handleChange(e.target.value, setWidth)}
                        className="w-full mt-3 px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div className="m-2 w-1/4">
                      <label htmlFor="titleInput2" className="block">
                        Height
                      </label>
                      <input
                        id="titleInput2"
                        type="text"
                        value={hight}
                        placeholder="Enter title"
                        onChange={(e) => handleChange(e.target.value, setHight)}
                        className="w-full mt-3 px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div className="m-2 w-1/4">
                      <label htmlFor="titleInput3" className="block">
                        Depth
                      </label>
                      <input
                        id="titleInput3"
                        type="text"
                        value={depth}
                        placeholder="Enter title"
                        onChange={(e) => handleChange(e.target.value, setDepth)}
                        className="w-full mt-3 px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div className="m-2 w-1/4 flex items-end">
                      <label htmlFor="titleInput4" className="sr-only"></label>
                      <div className="w-full mt-3 px-3 py-2">in</div>
                    </div>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 4}>
              <AccordionHeader onClick={() => handleOpen(4)}>
                <div className="flex justify-between items-center">
                  <FontAwesomeIcon
                    icon={open === 4 ? faChevronDown : faChevronRight}
                  />
                  <span className="accordionHeader">
                    Keywords & Description
                  </span>
                </div>
              </AccordionHeader>
              <AccordionBody>
                <div className="upload-title">
                  <label htmlFor="titleInput" className="block mt-5">
                    Keywords
                  </label>
                  <p>
                    Please provide from 5 to 12 keywords. Tagging your artwork
                    with keywords allows collectors to find your artwork more
                    easily. It’s best to enter simple, descriptive words that
                    describe the key visual elements of the work, such as color,
                    subject matter, and artistic style. You may enter or paste a
                    comma separated list of keywords that are distinct and at
                    least 2-character long. We recommend providing keywords in
                    English.
                  </p>
                  <input
                    id="keywords"
                    type="text"
                    value={keywords}
                    placeholder="Enter Keywords"
                    onChange={(e) => handleChange(e.target.value, setKeywords)}
                    className="w-full  my-5 px-3 py-2 border rounded-md"
                  />
                  <div className="keywords-container">
                    {keywords &&
                      keywords.length > 0 &&
                      keywords
                        .trim()
                        .split(" ")
                        .map((keyword, index) => (
                          <div
                            key={index}
                            className="keyword-item flex items-center space-x-2 bg-gray-100 px-2 py-1 mx-2 rounded-md"
                          >
                            <span className="text-sm flex-1 truncate">
                              {keyword}
                            </span>
                            <button
                              onClick={() => handleRemoveKeyword(index)}
                              className="focus:outline-none bg-transparent hover:bg-gray-200 text-red-500 font-semibold py-1 px-2 rounded"
                            >
                              X
                            </button>
                          </div>
                        ))}
                  </div>
                </div>
                <div className="upload-title mt-5">
                  <label htmlFor="year" className="block mt-5">
                    Description:
                  </label>
                  <p>
                    Collectors tend to appreciate works more if they know the
                    “story” behind them, so be sure to write informative artwork
                    descriptions. Great descriptions not only provide useful
                    information (e.g. physical texture, whether hanging hardware
                    is included, quality of materials), but they also answer
                    questions like:
                  </p>
                  <p>
                    <li>
                      <b>What/who inspired the work?</b>
                    </li>
                    <li>
                      <b>What do you hope its viewers will feel/think?</b>
                    </li>
                    <li>
                      <b>
                        Why did you choose the medium, subject matter, style?
                      </b>
                    </li>
                  </p>
                  <div className="relative w-full">
                    <textarea
                      id="description"
                      rows="10"
                      value={description}
                      placeholder="Search and Select"
                      onChange={(e) =>
                        handleChange(e.target.value, setDescription)
                      }
                      className="w-full mt-3 px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
          </>
        )}
        {step === 3 && (
          <>
            <Accordion open={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)}>
                <div className="flex justify-between items-center">
                  <FontAwesomeIcon
                    icon={open === 1 ? faChevronDown : faChevronRight}
                  />
                  <span className="accordionHeader">
                    Seller Price, Offer Price, Platform Charge
                  </span>
                </div>
              </AccordionHeader>
              <AccordionBody>
                <div className="upload-title">
                  <label htmlFor="sellerPrice" className="block mt-5">
                    Seller Price:
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="sellerPrice"
                      pattern="[0-9]+([.,][0-9]+)?"
                      title="Please enter a valid number"
                      value={sellingPrice}
                      onChange={(e) =>
                        handleChange(e.target.value, setSellingPrice)
                      }
                      className="w-full mt-3 px-3 py-2 border rounded-md"
                    />
                    <span style={{ color: "red", fontStyle: "italic" }}>
                      {spErr}
                    </span>
                  </div>
                </div>
                <div className="upload-title">
                  <label htmlFor="offerPrice" className="block mt-5">
                    Offer Price:
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="offerPrice"
                      value={offerPrice}
                      onChange={(e) =>
                        handleChange(e.target.value, setOfferPrice)
                      }
                      className="w-full mt-3 px-3 py-2 border rounded-md"
                    />
                    <span style={{ color: "red", fontStyle: "italic" }}>
                      {opErr || validationErr}
                    </span>
                  </div>
                </div>
                <div className="upload-title">
                  <label htmlFor="platformCharge" className="block mt-5">
                    Platform Charge:
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="platformCharge"
                      value={platformFee}
                      disabled
                      className="w-full mt-3 px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
          </>
        )}
        {step === 4 && (
          <>
            <div>thsis is 4 </div>
          </>
        )}
      </div>

      {modalOpen && (
        <Dropzone
          closeModal={closeModal}
          handleDropZoneImageSelection={handleDropZoneImageSelection}
          isThumbnailImage={images.length < 1}
        />
      )}
    </div>
  );
};

export default ImageUploadForm;
