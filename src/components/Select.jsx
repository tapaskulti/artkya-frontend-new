/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchCriteria, setSearchInput } from '../redux/app/art/artSlice';


export const CustomSelect = ({
  options = [],
  label,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  labelClassName = '',
  dropdownClassName = '',
  itemClassName = '',
  selectedItemClassName = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const ref = useRef();

  useEffect(() => {
    const selectedOption = options.find(option => option.value === value);
    setSelectedLabel(selectedOption ? selectedOption.label : '');
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={ref}>
      {label && <label className={`mb-2 block ${labelClassName}`}>{label}</label>}
      <div
        className={`border px-4 py-2 rounded-md shadow-sm cursor-pointer flex justify-between items-center ${dropdownClassName}`}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        <span>{selectedLabel || placeholder}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${itemClassName} ${value === option.value ? selectedItemClassName : ''}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export const CustomSelectWithSearchSide = ({
  categories = [],
  placeholder = 'Select a category',
  label,
  className = '',
  labelClassName = '',
  selectClassName = '',
  searchInputClassName = '',
  dropdownClassName = '',
  itemClassName = '',
  selectedItemClassName = '',
  ...props
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
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
    dispatch(setSearchCriteria({ searchCriteria: category })); // Update searchCriteria in Redux
    setIsOpen(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(setSearchInput({ searchInput: e.target.value })); // Update searchInput in Redux
  };

  return (
    <div className={`relative ${className}`} {...props}>
      {label && <label className={`mb-2 block ${labelClassName}`}>{label}</label>}

      <div className="flex items-center space-x-2">
        {/* Category Selection */}
        <div
          className={`border px-4 py-2 rounded-md shadow-sm cursor-pointer flex justify-between items-center ${selectClassName}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedCategory || placeholder}</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={handleSearchInputChange}
          className={`border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none ${searchInputClassName}`}
        />
      </div>

      {/* Category Dropdown */}
      {isOpen && (
        <ul className={`absolute z-10 mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto w-full ${dropdownClassName}`}>
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => handleCategorySelect(category)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${itemClassName}`}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};