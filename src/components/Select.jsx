/* eslint-disable react/prop-types */


import React, { useEffect, useRef, useState } from 'react';

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
  options = [],
  label,
  placeholder = 'Select a category',
  searchPlaceholder = 'Search...',
  className = '',
  labelClassName = '',
  selectClassName = '',
  searchInputClassName = '',
  dropdownClassName = '',
  itemClassName = '',
  selectedItemClassName = '',
  onOptionSelect = () => {},
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const ref = useRef();

  useEffect(() => {
    if (selectedCategory) {
      setFilteredOptions(
        options
          .filter(option => option.category === selectedCategory)
          .filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    } else {
      setFilteredOptions([]);
    }
  }, [selectedCategory, searchTerm, options]);

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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleOptionSelect = (option) => {
    onOptionSelect(option);
  };

  return (
    <div className={`relative ${className}`} ref={ref}>
      {label && <label className={`mb-2 block ${labelClassName}`}>{label}</label>}
      <div className="flex flex-col md:flex-row items-center md:space-x-2 space-y-2 md:space-y-0">
        {/* Category Selection */}
        <div
          className={`flex-grow md:flex-grow-0 border px-4 py-2 rounded-md shadow-sm cursor-pointer flex justify-between items-center ${selectClassName}`}
          onClick={() => setIsOpen(!isOpen)}
          {...props}
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
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`flex-grow border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none ${searchInputClassName}`}
          disabled={!selectedCategory}
        />
      </div>

      {/* Category Dropdown */}
      {isOpen && (
        <ul className={`absolute z-10 mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto w-full md:w-auto ${dropdownClassName}`}>
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

      {/* Filtered Options */}
      {selectedCategory && searchTerm && (
        <ul className={`mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto ${dropdownClassName}`}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${itemClassName} ${option.label === searchTerm ? selectedItemClassName : ''}`}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};