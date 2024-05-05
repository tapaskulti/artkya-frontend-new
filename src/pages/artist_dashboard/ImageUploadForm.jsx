import React, { useState, useEffect } from "react";
import SearchableDropdown from '../../components/SearchableDropdown';
import SearchableDropdownMultiSelect from '../../components/SearchableDropdownMultiSelect';
import axios from 'axios';
import {
  CategoryItem,
  subjectElement,
  colorElement,
  featuredArtistElement,
  materialElement,
  mediumElement,
  orientationElement,
  priceElement,
  sizeElement,
  styleElement,
} from "../../utlis/filterData";
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
const ImageUploadForm = ({ currentStep, nextStep, prevStep, HandlecheckForNextBtnSubmit }) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    setStep(currentStep);
    setOpen(1)
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
  const [category, setCategory] = useState("Paintings");
  const [subject, setSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [mediums, setMediums] = useState("");
  const [materials, setMaterials] = useState("");
  const [styles, setStyles] = useState("");
  const [width, setWidth] = useState();
  const [height, setHight] = useState();
  const [depth, setDepth] = useState();
  const [currentKey, setCurrentKey] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [description, setDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [platformFee, setPlatformFee] = useState("");
  const [validationErr, setValidationErr] = useState("");
  const [spErr, setSpErr] = useState("");
  const [opErr, setOpErr] = useState("");
  const [printOption, setPrintOption] = useState("");
  const [isUnique, setIsUnique] = useState(false);

  useEffect(() => {
    const rectElement = document.getElementById("rect");
    if (rectElement) {
      let h = parseFloat(height);
      let w = parseFloat(width);
      if (w && h && !isNaN(w) && !isNaN(h)) {
        if (w > 10 || h > 10) {
          w /= Math.pow(10, Math.floor(Math.log10(w)));
          h /= Math.pow(10, Math.floor(Math.log10(h)));
        }
        rectElement.style.width = w / 2 + "in";
        rectElement.style.height = h / 2 + "in";
      }
      if (w || h) {
        if (!w) {
          rectElement.style.width = 0 + "in";
        }
        if (!h) {
          rectElement.style.height = 0 + "in";
        }
      }
    }


  }, [width, height, depth]);

  useEffect(() => {
    setValidationErr("");
    setSpErr("");
    setOpErr("");

    if (!sellingPrice) {
      setSpErr("Please Enter Selling Price");
      return
    }
    if (!offerPrice) {
      setOpErr("Please Enter OfferPrice Price")
      return
    }
    if (sellingPrice < offerPrice) {
      setValidationErr("Offer Price cannot be more than Selling Price");
    } else {
      setPlatformFee((offerPrice * 0.2).toFixed(2));
      return
    }
  }, [sellingPrice, offerPrice, platformFee, spErr, opErr, validationErr]);


  useEffect(() => {
    HandlecheckForNextBtnSubmit(false)
    return; //delete this 2 line 
    if (currentStep == 1 && title && images.length > 0) {
      HandlecheckForNextBtnSubmit(false)

    } else if (currentStep == 2 && category && subject && selectedYear && mediums.length > 0 && materials.length > 0 && styles.length > 0 && width && height && depth && keywords.length > 4 && description.length > 50) {
      HandlecheckForNextBtnSubmit(false)

    } else
      if (currentStep == 3 && sellingPrice, offerPrice && platformFee && !spErr && !opErr && !validationErr) {
        HandlecheckForNextBtnSubmit(false)

      } else {
        HandlecheckForNextBtnSubmit(true)
      }
  }, [title, images, currentStep, category, subject, selectedYear, mediums, materials, styles, width, height, depth, keywords, description, sellingPrice, offerPrice, platformFee, spErr, opErr, validationErr]);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const handleKeyPusher = (newKey) => {
    if (newKey.length < 3) {
      alert('Keywords must be at least 2 characters.')
      return
    }
    if (newKey) {
      setKeywords((prevData) => [...prevData, newKey]);
      setCurrentKey('')
    }

  };
  const handleRemoveKeyword = (index) => {
    setKeywords((prevKeywords) => {
      const updatedKeywords = prevKeywords.filter((_, i) => i !== index);
      return updatedKeywords;
    });
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 50; i--) {
      years.push(String(i));
    }
    return years;
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

  const handlePrintOption = (key) => {
    setPrintOption(key)
  }

  const finalFormSubmission = async () => {
    try {
      const artFormData = {
        images,
        title,
        category,
        subject,
        selectedYear,
        mediums,
        materials,
        styles,
        width,
        height,
        depth,
        keywords,
        description,
        sellingPrice,
        offerPrice,
        platformFee,
        printOption,
        isUnique
      };
      console.log('artFormData',artFormData);
     await axios.post('http://localhost:3000/upload', artFormData)
              .then(response => {
                // Handle success
                console.log('Submission successful:', response.data);
              })
              .catch(error => {
                // Handle error
                console.error('Error submitting data:', error);
              });
    } catch (error) {
      console.log('Error while submiting a Art Data',error);
    }
  }
  return (
    <div className="block w-full">
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
                    <input
                      id="titleInput"
                      type="text"
                      value={title}
                      placeholder="Enter title"
                      onChange={(e) => (setTitle(e.target.value))}
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
                  <div className="w-full flex justify-between items-center">
                    <div className="flex  justify-between items-center">
                      <FontAwesomeIcon
                        icon={open === 1 ? faChevronDown : faChevronRight}
                      />
                      <span className="accordionHeader"> Category, Subject & Year</span>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={category && subject && selectedYear ? 'text-green-500' : 'text-red-500'}
                      />
                    </div>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  <div className="upload-title">
                    <label htmlFor="Category" className="block my-2">
                      Category:
                    </label>
                    <div className=" w-full">
                      <SearchableDropdown
                        options={CategoryItem.flatMap(item => item.element)}
                        selectedVal={category}
                        handleChange={(val) => setCategory(val)}
                      />
                    </div>
                  </div>
                  <div className="upload-Subject">
                    <label htmlFor="year" className="block mt-5 mb-2">
                      Subject:
                    </label>
                    <div className=" w-full">
                      <SearchableDropdown
                        options={subjectElement.flatMap(item => item.element)}
                        selectedVal={subject}
                        handleChange={(val) => setSubject(val)}
                      />
                    </div>
                  </div>
                  <div className="upload-title">
                    <label htmlFor="year" className="block mt-5 mb-2">
                      Year:
                    </label>
                    <div className=" w-full">
                      <SearchableDropdown
                        options={generateYears().flatMap(item => item)}
                        selectedVal={selectedYear}
                        handleChange={(val) => setSelectedYear(val)}
                      />
                    </div>
                  </div>
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 2}>
                <AccordionHeader onClick={() => handleOpen(2)}>
                  <div className="w-full flex justify-between items-center">
                    <div className="flex  justify-between items-center">
                      <FontAwesomeIcon
                        icon={open === 2 ? faChevronDown : faChevronRight}
                      />
                      <span className="accordionHeader"> Mediums, Materials & Styles</span>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={mediums.length > 0 && materials.length > 0 && styles.length > 0 ? 'text-green-500' : 'text-red-500'}
                      />
                    </div>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  <div className="upload-title">
                    <label htmlFor="year" className="block mb-3">
                      Mediums:
                    </label>
                    <div className=" w-full">
                      <i>Select 1-5 Mediums</i>
                      <SearchableDropdownMultiSelect
                        placeholder="Search or Select Mediums"
                        limit={5}
                        options={mediumElement.length > 0 ? mediumElement[0].element : []}
                        selectedOptions={mediums}
                        setSelectedOptions={setMediums}
                      />
                    </div>
                  </div>
                  <div className="upload-title">
                    <label htmlFor="year" className="block mt-5 mb-2">
                      Materials:
                    </label>
                    <div className=" w-full">
                      <i>Select 1-5 Materials</i>
                      <SearchableDropdownMultiSelect
                        placeholder="Search or Select Materials"
                        limit={5}
                        options={materialElement.length > 0 ? materialElement[0].element : []}
                        selectedOptions={materials}
                        setSelectedOptions={setMaterials}
                      />
                    </div>
                  </div>
                  <div className="upload-title">
                    <label htmlFor="year" className="block mt-5 mb-2">
                      Styles:
                    </label>
                    <div className=" w-full">
                      <i>Select 1-5 Styles</i>
                      <SearchableDropdownMultiSelect
                        placeholder="Search or Select Styles"
                        limit={5}
                        options={styleElement.length > 0 ? styleElement[0].element : []}
                        selectedOptions={styles}
                        setSelectedOptions={setStyles}
                      />
                    </div>
                  </div>
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 3}>
                <AccordionHeader onClick={() => handleOpen(3)}>
                  <div className="w-full flex justify-between items-center">
                    <div className="flex  justify-between items-center">
                      <FontAwesomeIcon
                        icon={open === 3 ? faChevronDown : faChevronRight}
                      />
                      <span className="accordionHeader">Dimensions</span>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={width && height && depth ? 'text-green-500' : 'text-red-500'}
                      />
                    </div>
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
                          type="number"
                          value={width}
                          placeholder="Enter title"
                          onChange={(e) => setWidth(e.target.value)}
                          className="w-full mt-3 px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div className="m-2 w-1/4">
                        <label htmlFor="titleInput2" className="block">
                          Height
                        </label>
                        <input
                          id="titleInput2"
                          type="number"
                          value={height}
                          placeholder="Enter title"
                          onChange={(e) => setHight(e.target.value)}
                          className="w-full mt-3 px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div className="m-2 w-1/4">
                        <label htmlFor="titleInput3" className="block">
                          Depth
                        </label>
                        <input
                          id="titleInput3"
                          type="number"
                          value={depth}
                          placeholder="Enter title"
                          onChange={(e) => setDepth(e.target.value)}
                          className="w-full mt-3 px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div className="m-2 w-1/4 flex items-end">
                        <label htmlFor="titleInput4" className="sr-only"></label>
                        <div className="w-full mt-3 px-3 py-2"><u><b>
                          inches</b></u></div>
                      </div>
                    </div>
                    <div
                      id="rect">
                      {width && height && <p>{width + " x " + height}
                      </p>}

                    </div>
                  </div>
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 4}>
                <AccordionHeader onClick={() => handleOpen(4)}>
                  <div className="w-full flex justify-between items-center">
                    <div className="flex  justify-between items-center">
                      <FontAwesomeIcon
                        icon={open === 4 ? faChevronDown : faChevronRight}
                      />
                      <span className="accordionHeader">Keywords & Description</span>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={keywords.length > 4 && keywords.length < 12 && description.length > 50 ? 'text-green-500' : 'text-red-500'}
                      />
                    </div>
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
                      id="currentKey"
                      type="text"
                      value={currentKey}
                      placeholder="Enter Keywords"
                      onChange={(e) => setCurrentKey(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleKeyPusher(e.target.value)
                        }
                      }}
                      disabled={keywords.length > 11}
                      className="w-full  mt-5 mb-3 px-3 py-2 border rounded-md"
                    />
                    {(keywords.length > 11) &&
                      <p className="text-red-500 font-semibold">Max Keywords of 12 has been reached</p>
                    }
                    {(keywords.length < 5) &&
                      <p className="text-red-500 font-semibold">Minimum 5 Keywords required</p>
                    }
                    <div className="flex flex-wrap w-full">
                      {keywords &&
                        keywords.length > 0 &&
                        keywords.map((keyword, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 bg-gray-100 px-2 py-1 mx-2 rounded-md my-4"
                          >
                            <span className="text-sm flex-1 truncate">{keyword}</span>
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
                          setDescription((e.target.value))
                        }
                        className="w-full mt-3 px-3 py-2 border rounded-md"
                      />
                      {description.length < 50 &&
                        < p className="text-red-500 font-semibold">Minimum characters still required {50 - description.length}</p>
                      }
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
                  <div className="w-full flex justify-between items-center">
                    <div className="flex  justify-between items-center">
                      <FontAwesomeIcon
                        icon={open === 1 ? faChevronDown : faChevronRight}
                      />
                      <span className="accordionHeader">   Seller Price, Offer Price & Platform Charge</span>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={sellingPrice && offerPrice && platformFee && !validationErr && !spErr && !opErr ? 'text-green-500' : 'text-red-500'}
                      />
                    </div>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  <div className="upload-title">
                    <label htmlFor="sellerPrice" className="block mt-5">
                      Seller Price:
                    </label>
                    <div className="relative w-full">
                      <input
                        type="number"
                        id="sellerPrice"
                        pattern="[0-9]+([.,][0-9]+)?"
                        title="Please enter a valid number"
                        value={sellingPrice}
                        onChange={(e) =>
                          setSellingPrice(e.target.value)
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
                        type="number"
                        id="offerPrice"
                        value={offerPrice}
                        onChange={(e) =>
                          setOfferPrice(e.target.value)
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
              <Accordion open={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)}>
                  <div className="w-full flex justify-between items-center">
                    <div className="flex justify-between items-center">
                      <FontAwesomeIcon
                        icon={open === 1 ? faChevronDown : faChevronRight}
                      />
                      <span className="accordionHeader">Printing</span>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={printOption ? 'text-green-500' : 'text-red-500'}
                      />
                    </div>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  <div className="upload-title">
                    <label htmlFor="printOption" className="block mb-2 font-bold">
                      Original Or Printed Copy:
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-blue-500"
                          name="printOption"
                          value="Original"
                          checked={printOption === 'Original'}
                          onChange={() => handlePrintOption('Original')}
                        />
                        <span className="ml-2">Original</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-blue-500"
                          name="printOption"
                          value="Printed"
                          checked={printOption === 'Printed'}
                          onChange={() => handlePrintOption('Printed')}
                        />
                        <span className="ml-2">Printed</span>
                      </label>
                    </div>
                    <label htmlFor="uniqueCheckbox" className="block mt-5 font-bold">
                      <input
                        type="checkbox"
                        id="uniqueCheckbox"
                        checked={isUnique}
                        onChange={() => setIsUnique(!isUnique)}
                        className="mr-2"
                      />
                      Unique in Universe
                    </label>
                  </div>
                </AccordionBody>
              </Accordion>

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
      <div className="w-full text-center">
        {currentStep == 4 && (
          <button
            onClick={()=>finalFormSubmission()}
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Final Submission
          </button>
        )}
      </div>

    </div>
  );
};

export default ImageUploadForm;
