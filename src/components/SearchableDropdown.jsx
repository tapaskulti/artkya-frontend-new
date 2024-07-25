import { useEffect, useRef, useState } from "react";

const SearchableDropdown = ({ options, selectedVal, handleChange }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery("");
    handleChange(option);
    setIsOpen(false);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return "";
  };

  const filter = (options) => {
    return options.filter(
      (option) => option.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <div className=" text-left z-50">
      <div>
        <input
          ref={inputRef}
          type="text"
          value={getDisplayValue()}
          name="searchTerm"
          onChange={(e) => {
            setQuery(e.target.value);
            handleChange(null);
          }}
          placeholder="Search..."
          className="border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:border-blue-500 w-full"
          onClick={toggle}
        />
      </div>
      <div
        className={`origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-gray-800 text-white ring-1 ring-black ring-opacity-5 ${
          isOpen ? "block" : "hidden"
        } w-full z-50`}
      >
        <div className="py-1">
          {filter(options).map((option, index) => (
            <div
              key={`${index}`}
              onClick={() => selectOption(option)}
              className={`block px-4 py-2 text-sm hover:bg-blue-500 hover:text-white`}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchableDropdown;
