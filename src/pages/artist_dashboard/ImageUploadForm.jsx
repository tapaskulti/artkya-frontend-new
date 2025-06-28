/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Image,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  X,
  Upload
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Mock data - replace with your actual data
const categoryOptions = [
  "Paintings",
  "Photography",
  "Sculpture",
  "Digital Art",
  "Mixed Media",
  "Prints"
];

const subjectOptions = [
  "Abstract",
  "Landscape",
  "Portrait",
  "Still Life",
  "Nature",
  "Urban",
  "Animals"
];

const mediumOptions = [
  "Oil",
  "Acrylic",
  "Watercolor",
  "Digital",
  "Pencil",
  "Charcoal",
  "Mixed Media"
];

const materialOptions = [
  "Canvas",
  "Paper",
  "Wood",
  "Metal",
  "Glass",
  "Fabric",
  "Stone"
];

const styleOptions = [
  "Realistic",
  "Abstract",
  "Impressionist",
  "Modern",
  "Contemporary",
  "Minimalist"
];

// Reusable Components
const SearchableDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <div
        className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer flex justify-between items-center bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-black" : "text-gray-500"}>
          {value || placeholder}
        </span>
        <ChevronDown className="w-4 h-4" />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <input
            type="text"
            className="bg-white text-blackw-full px-3 py-2 border-b border-gray-200 focus:outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
                setSearch("");
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MultiSelectDropdown = ({
  options,
  selectedOptions,
  setSelectedOptions,
  placeholder,
  limit = 5
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().includes(search.toLowerCase()) &&
      !selectedOptions.includes(option)
  );

  const addOption = (option) => {
    if (selectedOptions.length < limit) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const removeOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  return (
    <div className="relative">
      <div
        className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer flex justify-between items-center bg-white min-h-[40px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-2">
          {selectedOptions.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            selectedOptions.map((option, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
              >
                {option}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(option);
                  }}
                />
              </span>
            ))
          )}
        </div>
        <ChevronDown className="w-4 h-4 flex-shrink-0" />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <input
            type="text"
            className=" bg-white text-black w-full px-3 py-2 border-b border-gray-200 focus:outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                addOption(option);
                setSearch("");
              }}
            >
              {option}
            </div>
          ))}
          {selectedOptions.length >= limit && (
            <div className="px-3 py-2 text-red-500 text-sm">
              Maximum {limit} selections allowed
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Accordion = ({ open, onToggle, title, isValid, children }) => {
  return (
    <div className="border border-gray-200 rounded-md mb-4">
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          {open ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
          <span className="font-medium">{title}</span>
        </div>
        <CheckCircle
          className={`w-5 h-5 ${isValid ? "text-green-500" : "text-red-500"}`}
        />
      </div>
      {open && (
        <div className="px-4 pb-4 border-t border-gray-200">{children}</div>
      )}
    </div>
  );
};

const StepProgressBar = ({ currentStep }) => {
  const steps = ["Image", "Description", "Price & Details", "Prints"];

  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
              currentStep >= index + 1 ? "bg-black" : "bg-gray-300"
            }`}
          >
            {index + 1}
          </div>
          <span className="mt-2 text-sm font-medium">{step}</span>
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-full mt-4 ${
                currentStep > index + 1 ? "bg-black" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const ArtUploadForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(1);
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    images: [],
    category: "Paintings",
    subject: "",
    year: "",
    medium: [],
    materials: [],
    styles: [],
    width: "",
    height: "",
    depth: "",
    keywords: [],
    description: "",
    price: "",
    offerPrice: "",
    printOption: "", // 'Original', 'Printed', 'Both'
    original: false,
    print: false
  });

  const [currentKeyword, setCurrentKeyword] = useState("");

  // Generate years
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 50; i--) {
      years.push(String(i));
    }
    return years;
  };

  // Validation functions
  const validateStep1 = () => {
    return formData.title.trim() !== "" && formData.images.length > 0;
  };

  const validateStep2 = () => {
    return (
      formData.category !== "" &&
      formData.subject !== "" &&
      formData.year !== "" &&
      formData.medium.length >= 1 &&
      formData.materials.length >= 1 &&
      formData.styles.length >= 1 &&
      formData.width !== "" &&
      formData.height !== "" &&
      formData.depth !== "" &&
      formData.keywords.length >= 5 &&
      formData.description.length >= 50
    );
  };

  const validateStep3 = () => {
    return (
      formData.price !== "" && parseFloat(formData.price) > 0
      // &&
      // formData.offerPrice !== "" &&
      // parseFloat(formData.offerPrice) > 0
    );
  };

  const validateStep4 = () => {
    return formData.printOption !== "";
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        return validateStep3();
      case 4:
        return validateStep4();
      default:
        return false;
    }
  };

  const canProceed = () => {
    return isStepValid(currentStep);
  };

  // Handle file upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  // Handle image deletion
  const handleImageDelete = (indexToDelete) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToDelete)
    }));
  };

  // Handle keyword addition
  const addKeyword = () => {
    if (currentKeyword.trim().length >= 2 && formData.keywords.length < 12) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, currentKeyword.trim()]
      }));
      setCurrentKeyword("");
    }
  };

  const removeKeyword = (index) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index)
    }));
  };

  // Navigation
  const nextStep = () => {
    if (canProceed() && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      setOpenAccordion(1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setOpenAccordion(1);
    }
  };

  // Handle print option change
  const handlePrintOptionChange = (option) => {
    setFormData((prev) => ({
      ...prev,
      printOption: option,
      original: option === "Original" || option === "Both",
      print: option === "Printed" || option === "Both"
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateStep4()) {
      // Create FormData for file upload (matching your backend controller)
      const submissionData = new FormData();

      // Basic fields
      submissionData.append("title", formData.title);
      submissionData.append("category", formData.category);
      submissionData.append("subject", formData.subject);
      submissionData.append("year", formData.year);
      submissionData.append("width", formData.width);
      submissionData.append("height", formData.height);
      submissionData.append("depth", formData.depth);
      submissionData.append("description", formData.description);
      submissionData.append("price", formData.price);
      submissionData.append("offerPrice", formData.offerPrice);
      submissionData.append("printOption", formData.printOption);
      submissionData.append("original", formData.original);
      submissionData.append("print", formData.print);

      // Arrays as JSON strings (as expected by your controller)
      submissionData.append("medium", JSON.stringify(formData.medium));
      submissionData.append("materials", JSON.stringify(formData.materials));
      submissionData.append("styles", JSON.stringify(formData.styles));
      submissionData.append("keywords", JSON.stringify(formData.keywords));

      // Images
      formData.images.forEach((image) => {
        submissionData.append("images", image);
      });

      // Thumbnail (first image)
      if (formData.images.length > 0) {
        submissionData.append("thumbnail", formData.images[0]);
      }

      // Artist ID (you'll need to get this from auth context)
      submissionData.append("artist", authUser?._id);

      console.log("Submitting artwork data...");
      dispatch({ type: "CREATE_POST", payload: { body: submissionData } });
    }

    navigate("/Painting");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
      <StepProgressBar currentStep={currentStep} totalSteps={4} />

      <div className="flex gap-8 ">
        {/* Preview Section */}
        <div className="w-1/3">
          <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>

            {formData.images.length === 0 ? (
              <div className="flex items-center justify-center h-48 bg-gray-200 rounded-lg">
                <Image className="w-16 h-16 text-gray-400" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden relative group">
                  <img
                    src={URL.createObjectURL(formData.images[0])}
                    alt="Primary"
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => handleImageDelete(0)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {formData.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-2">
                    {formData.images.slice(1).map((image, index) => (
                      <div
                        key={index}
                        className="w-full h-16 bg-gray-200 rounded overflow-hidden relative group"
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Additional ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                        <button
                          onClick={() => handleImageDelete(index + 1)}
                          className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-4">
              <h4 className="font-medium">Title</h4>
              <p className="text-gray-600 italic">
                {formData.title || "No title entered"}
              </p>
            </div>

            {formData.width && formData.height && formData.depth && (
              <div className="mt-2">
                <h4 className="font-medium">Dimensions</h4>
                <p className="text-gray-600">
                  {`${formData.width} × ${formData.height} × ${formData.depth}`}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="w-2/3">
          {/* Step 1: Image and Title */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Artwork</h2>

              <Accordion
                open={openAccordion === 1}
                onToggle={() => setOpenAccordion(openAccordion === 1 ? 0 : 1)}
                title="Title"
                isValid={formData.title.trim() !== ""}
              >
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter artwork title"
                  className="bg-white text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </Accordion>

              <Accordion
                open={openAccordion === 2}
                onToggle={() => setOpenAccordion(openAccordion === 2 ? 0 : 2)}
                title="Images"
                isValid={formData.images.length > 0}
              >
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Upload your artwork images. The first image will be used as
                    the primary image.
                  </p>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">
                        Click to upload images or drag and drop
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        PNG, JPG, GIF up to 10MB each
                      </p>
                    </label>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="text-sm text-green-600">
                      {formData.images.length} image(s) uploaded
                    </div>
                  )}
                </div>
              </Accordion>
            </div>
          )}

          {/* Step 2: Description */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Description</h2>

              <Accordion
                open={openAccordion === 1}
                onToggle={() => setOpenAccordion(openAccordion === 1 ? 0 : 1)}
                title="Category, Subject & Year"
                isValid={formData.category && formData.subject && formData.year}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category *
                    </label>
                    <SearchableDropdown
                      options={categoryOptions}
                      value={formData.category}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                      placeholder="Select category"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <SearchableDropdown
                      options={subjectOptions}
                      value={formData.subject}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, subject: value }))
                      }
                      placeholder="Select subject"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Year *
                    </label>
                    <SearchableDropdown
                      options={generateYears()}
                      value={formData.year}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, year: value }))
                      }
                      placeholder="Select year"
                    />
                  </div>
                </div>
              </Accordion>

              <Accordion
                open={openAccordion === 2}
                onToggle={() => setOpenAccordion(openAccordion === 2 ? 0 : 2)}
                title="Mediums, Materials & Styles"
                isValid={
                  formData.medium.length >= 1 &&
                  formData.materials.length >= 1 &&
                  formData.styles.length >= 1
                }
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Mediums (1-5) *
                    </label>
                    <MultiSelectDropdown
                      options={mediumOptions}
                      selectedOptions={formData.medium}
                      setSelectedOptions={(value) =>
                        setFormData((prev) => ({ ...prev, medium: value }))
                      }
                      placeholder="Select mediums"
                      limit={5}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Materials (1-5) *
                    </label>
                    <MultiSelectDropdown
                      options={materialOptions}
                      selectedOptions={formData.materials}
                      setSelectedOptions={(value) =>
                        setFormData((prev) => ({ ...prev, materials: value }))
                      }
                      placeholder="Select materials"
                      limit={5}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Styles (1-5) *
                    </label>
                    <MultiSelectDropdown
                      options={styleOptions}
                      selectedOptions={formData.styles}
                      setSelectedOptions={(value) =>
                        setFormData((prev) => ({ ...prev, styles: value }))
                      }
                      placeholder="Select styles"
                      limit={5}
                    />
                  </div>
                </div>
              </Accordion>

              <Accordion
                open={openAccordion === 3}
                onToggle={() => setOpenAccordion(openAccordion === 3 ? 0 : 3)}
                title="Dimensions"
                isValid={formData.width && formData.height && formData.depth}
              >
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Provide accurate dimensions as collectors need to know the
                    exact size before purchasing. For flat artworks, enter a
                    depth of 0.1.
                  </p>

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Width *
                      </label>
                      <input
                        type="number"
                        value={formData.width}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            width: e.target.value
                          }))
                        }
                        placeholder="0.0"
                        className="bg-white text-black w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Height *
                      </label>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            height: e.target.value
                          }))
                        }
                        placeholder="0.0"
                        className="bg-white text-black w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Depth *
                      </label>
                      <input
                        type="number"
                        value={formData.depth}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            depth: e.target.value
                          }))
                        }
                        placeholder="0.1"
                        className="bg-white text-black w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="flex items-end">
                      <span className="text-sm font-medium mb-2">inches</span>
                    </div>
                  </div>

                  {formData.width && formData.height && (
                    <div className="text-sm text-gray-600">
                      {/* Dimensions: {formData.width}" × {formData.height}" ×{" "}
                      {formData.depth}" */}
                      Dimensions:{" "}
                      {`${formData.width} × ${formData.height} × ${formData.depth}`}
                    </div>
                  )}
                </div>
              </Accordion>

              <Accordion
                open={openAccordion === 4}
                onToggle={() => setOpenAccordion(openAccordion === 4 ? 0 : 4)}
                title="Keywords & Description"
                isValid={
                  formData.keywords.length >= 5 &&
                  formData.description.length >= 50
                }
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Keywords (5-12) *
                    </label>
                    <p className="text-gray-600 text-sm mb-3">
                      Add descriptive keywords to help collectors find your
                      artwork. Each keyword should be at least 2 characters.
                    </p>

                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={currentKeyword}
                        onChange={(e) => setCurrentKeyword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                        placeholder="Enter keyword"
                        disabled={formData.keywords.length >= 12}
                        className="bg-white text-black flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <button
                        onClick={addKeyword}
                        disabled={
                          formData.keywords.length >= 12 ||
                          currentKeyword.length < 2
                        }
                        className="px-4 py-2 bg-black text-white rounded-md disabled:bg-gray-300"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {formData.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          {keyword}
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-red-600"
                            onClick={() => removeKeyword(index)}
                          />
                        </span>
                      ))}
                    </div>

                    {formData.keywords.length < 5 && (
                      <p className="text-red-500 text-sm">
                        Minimum 5 keywords required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description *
                    </label>
                    <p className="text-gray-600 text-sm mb-3">
                      Tell the story behind your artwork. Include inspiration,
                      techniques, and what you hope viewers will feel.
                    </p>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value
                        }))
                      }
                      placeholder="Describe your artwork..."
                      rows={6}
                      className="bg-white text-black w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.description.length}/50 minimum characters
                      {formData.description.length < 50 && (
                        <span className="text-red-500">
                          {" "}
                          - {50 - formData.description.length} more needed
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </Accordion>
            </div>
          )}

          {/* Step 3: Pricing */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Price & Details</h2>

              <Accordion
                open={openAccordion === 1}
                onToggle={() => setOpenAccordion(openAccordion === 1 ? 0 : 1)}
                title="Pricing"
                isValid={
                  formData.price && parseFloat(formData.price) > 0
                  // &&
                  // formData.offerPrice &&
                  // parseFloat(formData.offerPrice) > 0
                }
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Selling Price *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            price: e.target.value
                          }))
                        }
                        placeholder="0.00"
                        className="bg-white text-black w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium mb-2">
                      Offer Price *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        value={formData.offerPrice}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            offerPrice: e.target.value,
                          }))
                        }
                        placeholder="0.00"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Offer price should be less than or equal to selling price
                    </p>
                  </div> */}

                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Price Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Selling Price:</span>
                        <span>${formData.price || "0.00"}</span>
                      </div>
                      {/* <div className="flex justify-between">
                        <span>Offer Price:</span>
                        <span>${formData.offerPrice || "0.00"}</span>
                      </div> */}
                      <div className="flex justify-between">
                        <span>Shipping Fee:</span>
                        <span>$20.00</span>
                      </div>
                      <div className="flex justify-between font-medium border-t pt-1">
                        <span>Total to Buyer:</span>
                        <span>
                          $
                          {formData.price
                            ? (parseFloat(formData.price) + 20).toFixed(2)
                            : "20.00"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>
            </div>
          )}

          {/* Step 4: Print Options */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Print Options</h2>

              <Accordion
                open={openAccordion === 1}
                onToggle={() => setOpenAccordion(openAccordion === 1 ? 0 : 1)}
                title="Print Type"
                isValid={formData.printOption !== ""}
              >
                <div className="space-y-4">
                  <p className="text-gray-600">
                    {`Select what type of artwork you're offering:`}
                  </p>

                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="printType"
                        value="Original"
                        checked={formData.printOption === "Original"}
                        onChange={(e) =>
                          handlePrintOptionChange(e.target.value)
                        }
                        className="mr-3"
                      />
                      <span>Original artwork only</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="printType"
                        value="Printed"
                        checked={formData.printOption === "Printed"}
                        onChange={(e) =>
                          handlePrintOptionChange(e.target.value)
                        }
                        className="mr-3"
                      />
                      <span>Printed copies only</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="printType"
                        value="Both"
                        checked={formData.printOption === "Both"}
                        onChange={(e) =>
                          handlePrintOptionChange(e.target.value)
                        }
                        className="mr-3"
                      />
                      <span>Original and printed copies</span>
                    </label>
                  </div>

                  {formData.printOption && (
                    <div className="bg-blue-50 p-3 rounded-md text-sm">
                      <p>
                        <strong>Selected:</strong> {formData.printOption}
                      </p>
                      <p>
                        <strong>Original:</strong>{" "}
                        {formData.original ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Print:</strong> {formData.print ? "Yes" : "No"}
                      </p>
                    </div>
                  )}
                </div>
              </Accordion>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-md ${
                currentStep === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              Back
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`px-6 py-2 rounded-md ${
                  canProceed()
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Save & Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className={`px-6 py-2 rounded-md ${
                  canProceed()
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Submit Artwork
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtUploadForm;
