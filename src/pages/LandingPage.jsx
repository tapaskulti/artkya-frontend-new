import Header from "../components/Header";
// import phouzdar_photo from "../assets/artist1.jpg";
import painting01 from "../assets/img-800x1000.jpg";
import painting02 from "../assets/img-1000x1500.jpg";
import painting03 from "../assets/img-1080x1920.jpg";
import painting04 from "../assets/img-1200x808.jpg";
import painting05 from "../assets/img-1200x900.jpg";
import painting06 from "../assets/img-1280x853.jpg";
import painting07 from "../assets/img-2048x1365.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
// import ArtItem from "../components/ArtItem";

const LandingPage = () => {
  return (
    <>
      <div className="static">
        <Header />
        <div className="mt-10 lg:flex">
          <div className="px-10">
            <h2>Painting</h2>
            {/* <div className="bg-gray-100 h-auto backdrop-blur-lg rounded-md w-full md:max-lg:max-w-screen-sm md:max-lg:mx-auto mt-6 px-3 py-2">Left</div> */}
            <div className="mt-20 p-5 md:p-10">
              <div className="h-auto mx-6 mt-32 sm:mx-6 gap-10 lg:gap-16 columns-1 md:columns-2 lg:columns-3 2xl:columns-4 gap-y-16 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-16">
                <img src={painting01} alt="" />
                <img src={painting02} alt="" />
                <img src={painting03} alt="" />
                <img src={painting04} alt="" />
                <img src={painting05} alt="" />
                <img src={painting06} alt="" />
                <img src={painting07} alt="" />
                <img src={painting03} alt="" />
                <img src={painting04} alt="" />
                <img src={painting05} alt="" />
                <img src={painting06} alt="" />
                <img src={painting01} alt="" />
                <img src={painting02} alt="" />
                <img src={painting03} alt="" />
                <img src={painting04} alt="" />
                <img src={painting05} alt="" />
                <img src={painting06} alt="" />
                <img src={painting07} alt="" />
                <img src={painting03} alt="" />
                <img src={painting04} alt="" />
                <img src={painting05} alt="" />
                <img src={painting06} alt="" />
                <img src={painting06} alt="" />
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
      className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
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
