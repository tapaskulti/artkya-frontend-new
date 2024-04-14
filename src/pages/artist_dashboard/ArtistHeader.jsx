
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
    <div className="bg-current">
      <ul className="hidden text-sm font-medium text-center text-white shadow sm:flex ">
        <li className="w-full border-2 border-white hover:bg-slate-400">
          <a
            href="#"
             onClick={() => handleTabClick("Manage Artworks")}
             className={`inline-block w-full text-center p-4 ${
              activeTab === "Manage Artworks" 
              ? "bg-teal-50 text-black" 
              : ""
          }  `}
            aria-current={activeTab === "Manage Artworks" ? "page" : null}
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faImage} className="ArtistHedderIcon" />
              <span className="mt-2">Manage Artworks</span>
            </div>
          </a>
        </li>
        <li className="w-full border-2 border-white hover:bg-slate-400">
          <a
            href="#"
             onClick={() => handleTabClick("Sales Dashboard")}
             className={`inline-block w-full text-center p-4 ${
              activeTab === "Sales Dashboard" 
              ? "bg-teal-50 text-black" 
              : ""
          }  `}
            aria-current={activeTab === "Sales Dashboard" ? "page" : null}
          
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faChartLine} className="ArtistHedderIcon" />
              <span className="mt-2">Sales Dashboard</span>
            </div>
          </a>
        </li>
        <li className="w-full border-2 border-white hover:bg-slate-400">
          <a
            href="#"
             onClick={() => handleTabClick("Offers Dashboard")}
             className={`inline-block w-full text-center p-4 ${
              activeTab === "Offers Dashboard" 
              ? "bg-teal-50 text-black" 
              : ""
          }  `}
            aria-current={activeTab === "Offers Dashboard" ? "page" : null}
          
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faTags} className="ArtistHedderIcon" />
              <span className="mt-2">Offers Dashboard</span>
            </div>
          </a>
        </li>
        <li className="w-full border-2 border-white hover:bg-slate-400">
          <a
            href="#"
             onClick={() => handleTabClick("Addresses")}
             className={`inline-block w-full text-center p-4 ${
              activeTab === "Addresses" 
              ? "bg-teal-50 text-black" 
              : ""
          }  `}
            aria-current={activeTab === "Addresses" ? "page" : null}
          
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="ArtistHedderIcon" />
              <span className="mt-2">Addresses</span>
            </div>
          </a>
        </li>
        <li className="w-full border-2 border-white hover:bg-slate-400">
          <a
            href="#"
             onClick={() => handleTabClick("Curator Notes")}
             className={`inline-block w-full text-center p-4 ${
              activeTab === "Curator Notes" 
              ? "bg-teal-50 text-black" 
              : ""
          }  `}
            aria-current={activeTab === "Curator Notes" ? "page" : null}
          
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faStickyNote} className="ArtistHedderIcon" />
              <span className="mt-2">Curator Notes</span>
            </div>
          </a>
        </li>
        <li className="w-full border-2 border-white hover:bg-slate-400">
          <a
            href="#"
             onClick={() => handleTabClick("Account")}
             className={`inline-block w-full text-center p-4 ${
              activeTab === "Account" 
              ? "bg-teal-50 text-black" 
              : ""
          }  `}
            aria-current={activeTab === "Account" ? "page" : null}
          
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faUserCircle} className="ArtistHedderIcon" />
              <span className="mt-2">Account</span>
            </div>
          </a>
        </li>
        <li className="w-full border-2 border-white hover:bg-slate-400">
          <a
            href="#"
             onClick={() => handleTabClick("Profile Information")}
            className={`inline-block w-full text-center p-4 ${
              activeTab === "Profile Information" 
              ? "bg-teal-50 text-black" 
              : ""
            }  `}
            aria-current={activeTab === "Profile Information" ? "page" : null}
          
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="ArtistHedderIcon" />
              <span className="mt-2">Profile Information</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ArtistHeader;
