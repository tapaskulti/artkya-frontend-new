import Header from "../components/Header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Img1 from "../assets/Img1.jpg";
import Img3 from "../assets/img3.jpg";
import Img14 from "../assets/img14.jpg";
import Img6 from "../assets/img6.jpg";
import Img8 from "../assets/img8.jpg";
import Img9 from "../assets/img9.jpg";
import Img12 from "../assets/img12.jpg";

import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
// import ArtItem from "../components/ArtItem";

const LandingPage = () => {
  return (
    <>
      <div className="static">
        <Header />
        <h2>Painting</h2>
        <div className="mt-10 lg:flex">
          <div className="w-1/4 rounded-lg rounded-br-xl px-10">
            <h2>Filter</h2>
            <div className="w-full bg-gray-100 backdrop-blur-lg rounded-md mt-6 px-3 py-2">
              Left
            </div>
          </div>
          <div className="w-4/6 mt-10 lg:flex">
            <div className="px-10">
              {/* <div className="bg-gray-100 h-auto backdrop-blur-lg rounded-md w-full md:max-lg:max-w-screen-sm md:max-lg:mx-auto mt-6 px-3 py-2">Left</div> */}
              <div className="mt-20">
                <div className="h-auto mt-32 gap-10 lg:gap-16 columns-1 md:columns-2 lg:columns-3 2xl:columns-3 gap-y-16 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-16">
                  <div>
                    <img src={Img1} alt="" />
                    <br />
                    <div>
                      <ArtDetails />
                    </div>
                  </div>
                  <div>
                    <img src={Img3} alt="" />
                    <br />
                    <div>
                      <ArtDetails />
                    </div>
                  </div>
                  <div>
                    <img src={Img14} alt="" />
                    <br />
                    <div>
                      <ArtDetails />
                    </div>
                  </div>
                  <div>
                    <img src={Img6} alt="" />
                    <br />
                    <div>
                      <ArtDetails />
                    </div>
                  </div>                  
                  <div>
                    <img src={Img8} alt="" />
                    <br />
                    <div>
                      <ArtDetails />
                    </div>
                  </div>
                  <div>
                    <img src={Img9} alt="" />
                    <br />
                    <div>
                      <ArtDetails />
                    </div>
                  </div>
                  <div>
                    <img src={Img12} alt="" />
                    <br />
                    <div>
                      <ArtDetails />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

export const ExhibitionItem = ({ exhibitionName, year }) => {
  return (
    <div className="flex items-center space-x-4 border-b">
      <FontAwesomeIcon icon={faPaintBrush} className="text-yellow-500" />
      <div className="text-base w-96">{exhibitionName}</div>
      <div className="w-40 font-semibold text-stone-700">{year}</div>
    </div>
  );
};

export const SkeletonLoader = () => {
  return (
    <div
      role="status"
      className="max-w-sm border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
        <svg
          className="w-12 h-12 text-gray-200 dark:text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
        </svg>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      <div className="flex items-center mt-4 space-x-3">
        <svg
          className="text-gray-200 w-14 h-14 dark:text-gray-700"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
          <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const ArtDetails = () => {
  return (
    <div className="w-full text-black">
      <div className="text-sm font-normal lg:text-base xl:text-lg lg:items-start lg:justify-normal lg:flex-col">
        <div className="text-gray-500 lg:text-base xl:text-base">
          ID: AK125436
        </div>
        <div className="-mt-1 text-sm font-semibold text-gray-500 lg:text-base xl:text-base md:text-sm">
          <div className="lg:text-xs xl:text-xs">W 120 * H 300 inches</div>          
        </div>
      </div>
      <div className="flex justify-between text-sm font-semibold text-gray-500 xl:text-base md:text-sm my-5">
        <div>
          <div className="text-sm">Elizabeth Becker</div>
          <div className="text-xs -pt-2">United States</div>
        </div>
        <div>
          <span className="text-sm">Price:</span> Print Copy $75
        </div>
      </div>
    </div>
  );
};
