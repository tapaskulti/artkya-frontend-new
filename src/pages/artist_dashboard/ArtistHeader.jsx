import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faImage, 
  faChartLine, 
  faTags, 
  faMapMarkerAlt, 
  faStickyNote, 
  faUserCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const ArtistHeader = () => {
  const [activeTab, setActiveTab] = useState("Manage Artworks");

  const handleTabClick = (tabName) => {
    console.log('current tab  clicked',tabName);
    setActiveTab(tabName);
  };

  return (
    <>
      <ul className="hidden text-sm font-medium text-center text-gray-500 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li className="w-full">
          <a
            href="#"
             onClick={() => handleTabClick("Manage Artworks")}
            className={`inline-block w-full text-center p-4 dark:text-white${
              activeTab === "Manage Artworks" 
              ? "text-gray-900 bg-gray-600" 
              : "text-gray-500 bg-gray-700"
            }`}
            aria-current={activeTab === "Manage Artworks" ? "page" : null}
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faImage} className="ArtistHedderIcon" />
              <span className="mt-2">Manage Artworks</span>
            </div>
          </a>
        </li>
        <li className="w-full">
          <a
            href="#"
             onClick={() => handleTabClick("Sales Dashboard")}
             className={`inline-block w-full text-center p-4 dark:text-white${
              activeTab === "Sales Dashboard" 
              ? "text-gray-900 bg-gray-600" 
              : "text-gray-500 bg-gray-700"
            }`}
            aria-current={activeTab === "Sales Dashboard" ? "page" : null}
          
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faChartLine} className="ArtistHedderIcon" />
              <span className="mt-2">Sales Dashboard</span>
            </div>
          </a>
        </li>
        <li className="w-full">
          <a
            href="#"
             onClick={() => handleTabClick("Offers Dashboard")}
             className={`inline-block w-full text-center p-4 dark:text-white${
              activeTab === "Offers Dashboard" 
              ? "text-gray-900 bg-gray-600" 
              : "text-gray-500 bg-gray-700"
            }`}
            aria-current={activeTab === "Offers Dashboard" ? "page" : null}
          
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faTags} className="ArtistHedderIcon" />
              <span className="mt-2">Offers Dashboard</span>
            </div>
          </a>
        </li>
        <li className="w-full">
          <a
            href="#"
             onClick={() => handleTabClick("Offers Dashboard")}
            className={`inline-block w-full text-center p-4 ${
              activeTab === "Manage Artworks" 
                ? "text-gray-900 bg-gray-100" 
                : "text-gray-500 bg-white"
            } border-r border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:text-white dark:bg-gray-700`}
            aria-current={activeTab === "Manage Artworks" ? "page" : null}
          
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="ArtistHedderIcon" />
              <span className="mt-2">Addresses</span>
            </div>
          </a>
        </li>
        <li className="w-full">
          <a
            href="#"
             onClick={() => handleTabClick("Manage Artworks")}
            className={`inline-block w-full text-center p-4 ${
              activeTab === "Manage Artworks" 
                ? "text-gray-900 bg-gray-100" 
                : "text-gray-500 bg-white"
            } border-r border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:text-white dark:bg-gray-700`}
            aria-current={activeTab === "Manage Artworks" ? "page" : null}
          
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faStickyNote} className="ArtistHedderIcon" />
              <span className="mt-2">Curator Notes</span>
            </div>
          </a>
        </li>
        <li className="w-full">
          <a
            href="#"
             onClick={() => handleTabClick("Manage Artworks")}
            className={`inline-block w-full text-center p-4 ${
              activeTab === "Manage Artworks" 
                ? "text-gray-900 bg-gray-100" 
                : "text-gray-500 bg-white"
            } border-r border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:text-white dark:bg-gray-700`}
            aria-current={activeTab === "Manage Artworks" ? "page" : null}
          
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faUserCircle} className="ArtistHedderIcon" />
              <span className="mt-2">Account</span>
            </div>
          </a>
        </li>
        <li className="w-full">
          <a
            href="#"
             onClick={() => handleTabClick("Manage Artworks")}
            className={`inline-block w-full text-center p-4 ${
              activeTab === "Manage Artworks" 
                ? "text-gray-900 bg-gray-100" 
                : "text-gray-500 bg-white"
            } border-r border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:text-white dark:bg-gray-700`}
            aria-current={activeTab === "Manage Artworks" ? "page" : null}
          
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="ArtistHedderIcon" />
              <span className="mt-2">Profile Information</span>
            </div>
          </a>
        </li>
      </ul>
    </>
  );
};

export default ArtistHeader;
