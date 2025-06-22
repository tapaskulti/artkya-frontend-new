/* eslint-disable react/prop-types */
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { Search, Filter, Grid, List, SortAsc, Palette, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import {
  artistCountryElement,
  colorElement,
  featuredArtistElement,
  materialElement,
  mediumElement,
  orientationElement,
  priceElement,
  sizeElement,
  styleElement,
  subjectElement,
} from "../utlis/filterData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSortCriteria, setSearchInput, setSearchCriteria } from "../redux/app/art/artSlice";

const Painting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allArt, artNotFound, searchInput, sortCriteria, searchCriteria, totalPages, currentPage } =
    useSelector((state) => state.art);
  const { authUser } = useSelector((state) => state.auth);
    
  const [filterData, setFilterData] = useState({
    style: [],
    subject: [],
    orientation: [],
    medium: [],
    material: [],
    artistcountry: [],
    featuredartist: [],
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
  });

  const handleClearAllFilters = () => {
    setFilterData({
      style: [],
      subject: [],
      orientation: [],
      medium: [],
      material: [],
      artistcountry: [],
      featuredartist: [],
    });
    setPagination({ ...pagination, page: 1 });
  };

  const handleFilterData = (e) => {
    const { value, checked, name } = e.target;
    const newFilterData = { ...filterData };

    if (newFilterData[name]?.includes(value) === false && checked === true) {
      newFilterData[name].push(value);
    } else if (
      newFilterData[name]?.includes(value) === true &&
      checked === false
    ) {
      newFilterData[name] = newFilterData[name].filter(
        (item) => item !== value
      );
    } else {
      return;
    }
    setFilterData(newFilterData);
    setPagination({ ...pagination, page: 1 }); // Reset to first page when filters change
  };

  // Initial fetch to get all arts
  useEffect(() => {
    dispatch({
      type: "NEW_FILTER_ART",
      payload: {
        sortingCriteria: sortCriteria,
        searchCriteria: searchCriteria,
        searchInput: searchInput,
        page: pagination.page,
        limit: pagination.limit,
        body: {}, // Empty body to fetch all arts
      },
    });
  }, [dispatch]);

  useEffect(() => {
    const filterDataPayload = {
      style: filterData?.style,
      subject: filterData?.subject,
      orientation: filterData?.orientation,
      medium: filterData?.medium,
      material: filterData?.material,
      artistCountry: filterData?.artistcountry,
      featuredartist: filterData?.featuredartist,
    };

    dispatch({
      type: "NEW_FILTER_ART",
      payload: {
        sortingCriteria: sortCriteria,
        searchCriteria: searchCriteria,
        searchInput: searchInput,
        page: pagination.page,
        limit: pagination.limit,
        body: filterDataPayload,
      },
    });
  }, [filterData, sortCriteria, searchCriteria, searchInput, pagination, dispatch]);

  const options = [
    { value: "newToOld", label: "New to Old" },
    { value: "priceLowHigh", label: "Price: Low to High" },
    { value: "priceHighLow", label: "Price: High to Low" },
  ];

  const handleSortCriteriaChange = (value) => {
    dispatch(setSortCriteria({ sortCriteria: value }));
    setPagination({ ...pagination, page: 1 }); // Reset to first page when sorting changes
  };

  const categories = ["Art", "Artist"];

  // Enhanced Accordion Component
  const Accordion = ({ element, onCheckChange, name, isBlackGradient = false }) => {
    const [accordionOpen, setAccordionOpen] = useState(false);

    const headerClasses = isBlackGradient 
      ? "flex justify-between items-center w-full p-4 text-left bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-300"
      : "flex justify-between items-center w-full p-4 text-left bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all duration-300";
    
    const titleClasses = isBlackGradient ? "font-semibold text-white" : "font-semibold text-gray-900";
    const iconClasses = isBlackGradient ? "fill-white shrink-0 ml-8" : "fill-gray-500 shrink-0 ml-8";

    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-3 overflow-hidden">
        <button
          onClick={() => setAccordionOpen(!accordionOpen)}
          className={headerClasses}
        >
          <span className={titleClasses}>{element[0]?.title}</span>
          <svg
            className={iconClasses}
            width="12"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="12"
              height="2"
              rx="1"
              className={`transform origin-center transition duration-200 ease-out ${
                accordionOpen && "!rotate-180"
              }`}
            />
            <rect
              y="7"
              width="12"
              height="2"
              rx="1"
              className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                accordionOpen && "!rotate-180"
              }`}
            />
          </svg>
        </button>
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out text-gray-600 text-sm ${
            accordionOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden bg-white p-4">
            {element[0]?.element?.map((singleElement, index) => {
              return (
                <div key={index}>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                      style={{ backgroundColor: 'white', borderColor: '#d1d5db' }}
                      name={name}
                      value={singleElement}
                      onChange={onCheckChange}
                      checked={filterData[name]?.includes(singleElement) || false}
                    />
                    <div className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors">
                      {singleElement}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const SecondAccordion = ({ element, onCheckChange, name }) => {
    const [accordionOpen, setAccordionOpen] = useState(true); // Accordion starts open
    const [showAll, setShowAll] = useState(false); // Controls 'Show More' functionality

    // Split the elements into two parts: first 5 elements and the rest
    const firstFiveElements = element[0]?.element?.slice(0, 6);
    const remainingElements = element[0]?.element?.slice(5);

    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-3 overflow-hidden">
        <button
          onClick={() => setAccordionOpen(!accordionOpen)}
          className="flex justify-between items-center w-full p-4 text-left bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-300"
        >
          <span className="font-semibold text-white">{element[0]?.title}</span>
          <svg
            className="fill-white shrink-0 ml-8"
            width="12"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="12"
              height="2"
              rx="1"
              className={`transform origin-center transition duration-200 ease-out ${
                accordionOpen && "!rotate-180"
              }`}
            />
            <rect
              y="7"
              width="12"
              height="2"
              rx="1"
              className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                accordionOpen && "!rotate-180"
              }`}
            />
          </svg>
        </button>
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out text-gray-600 text-sm ${
            accordionOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden bg-white p-4">
            {firstFiveElements?.map((singleElement, index) => (
              <div key={index}>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                    style={{ backgroundColor: 'white', borderColor: '#d1d5db' }}
                    name={name}
                    value={singleElement}
                    onChange={onCheckChange}
                    checked={filterData[name]?.includes(singleElement) || false}
                  />
                  <div className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors">
                    {singleElement}
                  </div>
                </div>
              </div>
            ))}

            {/* Display remaining elements if 'showAll' is true */}
            {showAll &&
              remainingElements?.map((singleElement, index) => (
                <div key={index + 5}>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                      style={{ backgroundColor: 'white', borderColor: '#d1d5db' }}
                      name={name}
                      value={singleElement}
                      onChange={onCheckChange}
                      checked={filterData[name]?.includes(singleElement) || false}
                    />
                    <div className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors">
                      {singleElement}
                    </div>
                  </div>
                </div>
              ))}

            {/* Show 'Show More' button only if there are more than 5 elements */}
            {remainingElements?.length > 0 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-gray-900 mt-2 font-medium hover:text-gray-700 transition-colors focus:outline-none"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CustomSelect = ({
    options = [],
    value,
    onChange,
    placeholder = 'Select an option',
    className = '',
    ...props
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('');

    useEffect(() => {
      const selectedOption = options.find(option => option.value === value);
      setSelectedLabel(selectedOption ? selectedOption.label : '');
    }, [value, options]);

    const handleSelect = (option) => {
      onChange(option.value);
      setIsOpen(false);
    };

    return (
      <div className={`relative ${className}`}>
        <div
          className="bg-white border border-gray-300 px-4 py-3 rounded-xl shadow-sm cursor-pointer flex justify-between items-center hover:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
          {...props}
        >
          <span className="text-gray-900">{selectedLabel || placeholder}</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isOpen && (
          <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors ${value === option.value ? 'bg-gray-900 text-white' : 'text-gray-900'}`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const CustomSelectWithSearchSide = ({
    categories = [],
    placeholder = 'Select a category',
    className = '',
    ...props
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(searchCriteria || '');
    const [searchTerm, setSearchTerm] = useState(searchInput || '');
    const [searchPlaceholder, setSearchPlaceholder] = useState('Search by Art/Artist');

    useEffect(() => {
      // Update the search placeholder based on selected category
      if (selectedCategory === 'Art') {
        setSearchPlaceholder('Search by Art');
      } else if (selectedCategory === 'Artist') {
        setSearchPlaceholder('Search by Artist');
      } else {
        setSearchPlaceholder('Search by Art/Artist');
      }
    }, [selectedCategory]);

    const handleCategorySelect = (category) => {
      setSelectedCategory(category);
      dispatch(setSearchCriteria({ searchCriteria: category }));
      setIsOpen(false);
      setPagination({ ...pagination, page: 1 }); // Reset to first page when search criteria changes
    };

    const handleSearchInputChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      dispatch(setSearchInput({ searchInput: value }));
      setPagination({ ...pagination, page: 1 }); // Reset to first page when search input changes
    };

    return (
      <div className={`relative ${className}`} {...props}>
        <div className="flex items-center space-x-3 bg-white rounded-xl shadow-sm border border-gray-200 p-1">
          <div className="relative w-32">
            <button
              className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium truncate">
                {selectedCategory || "All"}
              </span>
              <svg className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="w-full pl-10 pr-4 py-2 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    );
  };

  // Pagination Component
  const PaginationComponent = () => {
    const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);
    
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPagination({ ...pagination, page: newPage });
      }
    };

    const handlePageSelect = (page) => {
      setPagination({ ...pagination, page });
      setIsPageDropdownOpen(false);
    };

    const generatePageNumbers = () => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    };

    if (!totalPages || totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center space-x-4 py-8">
        <div className="flex items-center space-x-2">
          {/* First Page */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={pagination.page === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="First Page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>

          {/* Previous Page */}
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors min-w-[120px] text-center"
            >
              Page {pagination.page} of {totalPages}
            </button>
            
            {isPageDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {generatePageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageSelect(pageNum)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                      pageNum === pagination.page ? 'bg-gray-900 text-white' : 'text-gray-900'
                    }`}
                  >
                    Page {pageNum}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Next Page */}
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Last Page */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={pagination.page === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Last Page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const MasonaryGridLayout = ({ artDetails }) => {
    return (
      <div className="w-full">
        {/* Grid layout with responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {artDetails?.map((singleArt, index) => (
            <div
              key={index}
              className="group bg-white shadow-lg rounded-2xl overflow-hidden relative border border-gray-200 hover:shadow-xl transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <a href={`/artDetailPage/${singleArt?._id}`}>
                  <div className="w-full h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={singleArt?.thumbnail?.secure_url}
                      alt={singleArt?.title || `Art ${index}`}
                      className="max-w-full max-h-full object-contain transition-transform duration-[2000ms] ease-in-out transform group-hover:scale-110"
                    />
                  </div>
                </a>
                
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-lg">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-red-50 transform hover:scale-110 transition-all duration-300 shadow-lg"
                    onClick={() => {
                      dispatch({
                        type: "ADD_ART_TO_WISHLIST",
                        payload: {
                          userId: authUser?._id,
                          artId: singleArt?._id,
                        },
                      });
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  
                  {/* Conditional Cart Button */}
                  {!singleArt?.isOriginalSold && (
                    <button
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-green-500 hover:bg-green-50 transform hover:scale-110 transition-all duration-300 shadow-lg"
                      onClick={() => {
                        dispatch({
                          type: "ADD_ART_TO_CART",
                          payload: {
                            userId: authUser?._id,
                            artId: singleArt?._id,
                            artPrice: singleArt?.totalPrice,
                            navigate,
                          },
                        });
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0L14 18" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Status Badge */}
                {singleArt?.isOriginalSold && (
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      Original Sold
                    </span>
                  </div>
                )}

                {/* Print Only Button for Sold Items */}
                {singleArt?.isOriginalSold && (
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => navigate(`/artDetailPage/${singleArt?._id}`)}
                      className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Print Copy Available
                    </button>
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-white">
                <div className="flex justify-between items-center space-x-3 mb-2">
                  <h2 className="text-lg font-semibold truncate text-gray-900">
                    {singleArt?.title}
                  </h2>
                  <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                    ${singleArt?.totalPrice}
                  </p>
                </div>
                <p 
                  className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors mb-1"
                  onClick={() => {               
                    navigate(`/ArtistProfilePage/${singleArt?.artist?._id}`)
                  }}
                >
                  {`${
                    singleArt?.artist?.firstName
                      ? singleArt?.artist?.firstName
                      : ""
                  } ${
                    singleArt?.artist?.lastName ? singleArt?.artist?.lastName : ""
                  }`}
                </p>
                <p className="text-sm text-gray-500">
                  {singleArt.height} x {singleArt?.width} x {singleArt?.depth} inch
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination - Now properly positioned */}
        <div className="w-full border-t border-gray-200 pt-6">
          <PaginationComponent />
        </div>
      </div>
    );
  };

  const NoArtFound = () => {
    return (
      <div className="flex flex-col justify-center items-center px-20 py-20 text-center bg-white rounded-2xl border border-gray-200">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <FontAwesomeIcon icon={faPaintBrush} className="text-4xl text-gray-400" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Art Found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms</p>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-end px-10 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <CustomSelectWithSearchSide
              categories={categories}
              placeholder="Select"
              className="w-full max-w-md"
            />
          </div>
        </div>
        
        <div className="bg-white px-10 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-2">
                Original Paintings For Sale
              </h2>
              <p className="text-gray-600">
                Discover unique artworks from talented artists worldwide
              </p>
            </div>
            <CustomSelect
              value={sortCriteria}
              onChange={(e) => {
                handleSortCriteriaChange(e);
              }}
              options={options}
              placeholder="Sort by"
              className="w-52 max-w-xs"
            />
          </div>
        </div>
        
        <div className="flex bg-gray-50">
          {/* Fixed Sidebar with proper positioning below header */}
          <div className="w-80 bg-white border-r border-gray-200 fixed left-0 h-screen overflow-hidden flex flex-col" style={{ top: '140px' }}>
            <div className="p-6 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button 
                  onClick={handleClearAllFilters}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors border border-gray-300 px-3 py-1 rounded-md hover:border-gray-400"
                >
                  Clear All
                </button>
              </div>
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-900 rounded-xl p-4 text-center mb-6">
                <Palette className="w-6 h-6 text-white mx-auto mb-2" />
                <span className="font-medium text-white">Paintings</span>
              </div>
            </div>
            
            {/* Scrollable accordion area */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="space-y-1">
                <SecondAccordion
                  element={styleElement}
                  name={"style"}
                  onCheckChange={(e) => {
                    handleFilterData(e);
                  }}
                />
                <SecondAccordion
                  element={subjectElement}
                  name={"subject"}
                  onCheckChange={(e) => {
                    handleFilterData(e);
                  }}
                />
                <SecondAccordion
                  element={mediumElement}
                  name={"medium"}
                  onCheckChange={(e) => {
                    handleFilterData(e);
                  }}
                />
                <Accordion
                  element={materialElement}
                  name={"material"}
                  onCheckChange={(e) => {
                    handleFilterData(e);
                  }}
                  isBlackGradient={true}
                />
                <Accordion 
                  element={priceElement} 
                  isBlackGradient={true}
                />
                <Accordion 
                  element={sizeElement} 
                  isBlackGradient={true}
                />
                <Accordion
                  element={orientationElement}
                  name={"orientation"}
                  onCheckChange={(e) => {
                    handleFilterData(e);
                  }}
                  isBlackGradient={true}
                />
                <Accordion 
                  element={colorElement} 
                  isBlackGradient={true}
                />
                <Accordion
                  element={artistCountryElement}
                  name={"artistcountry"}
                  onCheckChange={(e) => {
                    handleFilterData(e);
                  }}
                  isBlackGradient={true}
                />
                <Accordion
                  element={featuredArtistElement}
                  name={"featuredartist"}
                  onCheckChange={(e) => {
                    handleFilterData(e);
                  }}
                  isBlackGradient={true}
                />
              </div>
            </div>
          </div>

          {/* Main content area with left margin for fixed sidebar */}
          <div className="flex-1 ml-80 bg-white min-h-screen">
            <div className="p-6">
              {artNotFound ? (
                <NoArtFound />
              ) : (
                <MasonaryGridLayout artDetails={allArt} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Painting;

// eslint-disable-next-line react/prop-types
export const ExhibitionItem = ({ exhibitionName, year }) => {
  return (
    <div className="flex items-center space-x-4 border-b bg-white p-4 rounded-lg">
      <FontAwesomeIcon icon={faPaintBrush} className="text-yellow-500" />
      <div className="text-base w-96 text-gray-900">{exhibitionName}</div>
      <div className="w-40 font-semibold text-gray-700">{year}</div>
    </div>
  );
};