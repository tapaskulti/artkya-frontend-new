import React, { useState } from 'react';

const TextAccordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded mb-2">
      <div 
        className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center" 
        onClick={toggleAccordion}
      >
        <h2 className="font-semibold">{title}</h2>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className="p-4 border-t border-gray-300">{content}</div>}
    </div>
  );
};

export default TextAccordion;
