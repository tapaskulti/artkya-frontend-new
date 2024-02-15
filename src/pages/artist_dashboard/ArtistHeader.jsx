
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

const ArtistHeader = ({ activeTab, handleTabClick }) => {
  return (
    <>
      <ul className="hidden text-sm font-medium text-center text-gray-500 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li className="w-full">
          <a
            href="#"
             onClick={() => handleTabClick("Manage Artworks")}
             className={`inline-block w-full text-center p-4 ${
              activeTab === "Manage Artworks" 
              ? "dark:bg-gray-700" 
              : "dark:bg-gray-500"
          } dark:text-white `}
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
             className={`inline-block w-full text-center p-4 ${
              activeTab === "Sales Dashboard" 
              ? "dark:bg-gray-700" 
              : "dark:bg-gray-500"
          } dark:text-white `}
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
             className={`inline-block w-full text-center p-4 ${
              activeTab === "Offers Dashboard" 
              ? "dark:bg-gray-700" 
              : "dark:bg-gray-500"
          } dark:text-white `}
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
             onClick={() => handleTabClick("Addresses")}
             className={`inline-block w-full text-center p-4 ${
              activeTab === "Addresses" 
              ? "dark:bg-gray-700" 
              : "dark:bg-gray-500"
          } dark:text-white `}
            aria-current={activeTab === "Addresses" ? "page" : null}
          
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
             onClick={() => handleTabClick("Curator Notes")}
             className={`inline-block w-full text-center p-4 ${
              activeTab === "Curator Notes" 
              ? "dark:bg-gray-700" 
              : "dark:bg-gray-500"
          } dark:text-white `}
            aria-current={activeTab === "Curator Notes" ? "page" : null}
          
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
             onClick={() => handleTabClick("Account")}
             className={`inline-block w-full text-center p-4 ${
              activeTab === "Account" 
              ? "dark:bg-gray-700" 
              : "dark:bg-gray-500"
          } dark:text-white `}
            aria-current={activeTab === "Account" ? "page" : null}
          
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faUserCircle} className="ArtistHedderIcon" />
              <span className="mt-2">Account</span>
            </div>
          </a>
        </li>
        <li className="w-full">
        {/* bg-gray-100 */}
        {/* bg-white */}
          <a
            href="#"
             onClick={() => handleTabClick("Profile Information")}
            className={`inline-block w-full text-center p-4 ${
              activeTab === "Profile Information" 
                ? "dark:bg-gray-700" 
                : "dark:bg-gray-500"
            } dark:text-white `}
            aria-current={activeTab === "Profile Information" ? "page" : null}
          
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
