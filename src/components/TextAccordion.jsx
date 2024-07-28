import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const ExpandableSections = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const sections = [
    { id: 1, title: 'About The Artwork', content: 'Soft colors, texture and muted tones make this painting very soothing and meditative.', moreContent: ' Painted with acrylics on canvas also using collage and acrylic paint pen. The sides are painted white and it is wired and ready to hang. Protected with a clear/satin varnish that accentuates the beauty and depth of this piece.' },
    { id: 2, title: 'Details and Dimentions', content: 'Content for section 2.', moreContent: ' More content for section 2.' },
    { id: 3, title: 'Shipping and Returns', content: 'Content for section 3.', moreContent: ' More content for section 3.' },
  ];

  return (
    <div className="p-4">
      {sections.map((section) => (
        <div key={section.id} className="border-b py-4">
          <div className="flex justify-between items-center">
            <div className="flex-grow flex items-center">
              <h2 className="text-lg font-semibold mr-2">{section.title}</h2>
              <p className="text-gray-700">{section.content}</p>
            </div>
            <button
              className="focus:outline-none"
              onClick={() => toggleSection(section.id)}
            >
              <FaChevronDown
                className={`transform transition-transform duration-300 ${
                  expandedSections[section.id] ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
          {expandedSections[section.id] && (
            <div className="mt-2">
              <p>{section.moreContent}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpandableSections;
