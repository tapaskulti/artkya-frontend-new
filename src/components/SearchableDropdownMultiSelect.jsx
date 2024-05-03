import React, { useState } from "react";

const SearchableDropdownMultiSelect = ({
    options,
    selectedOptions,
    setSelectedOptions,
    placeholder = "Search...",
    limit = Infinity,
}) => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (option) => {
        if (selectedOptions.length < limit) {
            setSelectedOptions([...selectedOptions, option]);
            setQuery("");
            setIsOpen(false);
        }
    };

    const removeOption = (option) => {
        const newSelectedOptions = selectedOptions.filter((item) => item !== option);
        setSelectedOptions(newSelectedOptions);
    };

    const filterOptions = () => {
        return options.filter((option) =>
            option.toLowerCase().includes(query.toLowerCase())
        );
    };

    const isInputDisabled = selectedOptions.length >= limit;

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:border-blue-500 w-full"
                    onClick={toggle}
                    disabled={isInputDisabled} // Disable input if limit is reached
                />
            </div>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-gray-800 text-white ring-1 ring-black ring-opacity-5 w-full z-50">
                    <div className="py-1">
                        {filterOptions().map((option, index) => (
                            <div
                                key={index}
                                onClick={() => selectOption(option)}
                                className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-blue-500 hover:text-white ${
                                    selectedOptions && selectedOptions.includes(option)
                                        ? "bg-blue-500 text-white"
                                        : ""
                                }`}
                            >
                                <span>{option}</span>
                                <button
                                    className="focus:outline-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        selectOption(option);
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="flex flex-wrap">
                {Array.isArray(selectedOptions) && selectedOptions.map((option, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 rounded-full px-3 py-1 m-1 flex items-center hover:bg-gray-300"
                    >
                        <span className="mr-2 font-bold">{option}</span>
                        <span
                            className="font-bold text-red-600 hover:text-red-800 cursor-pointer"
                            onClick={() => removeOption(option)}
                        >
                            x
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchableDropdownMultiSelect;
