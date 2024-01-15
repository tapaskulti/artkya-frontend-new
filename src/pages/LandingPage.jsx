import Header from "../components/Header";
import phouzdar_photo from "../assets/artist1.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import ArtItem from "../components/ArtItem";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { arts, nonselectedArts, isArtListLoading } = useSelector(
    (state) => state.art
  );

  const options = [
    { value: "2008", label: "2008 and Prior" },
    { value: "2009", label: "2009" },
    { value: "2010", label: "2010" },
    { value: "2011", label: "2011" },
    { value: "2012", label: "2012" },
    { value: "2013", label: "2013" },
    { value: "2014", label: "2014" },
    { value: "2015", label: "2015" },
    { value: "2016", label: "2016" },
    { value: "2017", label: "2017" },
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
  ];

  return (
    <>
      <div className="static">
        <Header />
        <div className="mt-10 lg:flex">
          {/* about phauzdar and banner */}
          <div className="relative mx-5 md:mx-0">
            {/* background and phauzdar image */}
            <div className="bg-gray-100 h-auto backdrop-blur-lg w-full md:max-lg:max-w-screen-sm md:max-lg:mx-auto lg:w-[23rem] md:px-10 px-5 md:mx-5  lg:mx-7 translate-y-20  rounded-lg rounded-br-xl">
              <img
                src={phouzdar_photo}
                className="relative object-fill mx-auto transform -translate-y-20 border-8 border-white rounded-full w-52 h-52 "
                alt="Phauzdar"
              />
              <div className="relative z-10 flex-col justify-center -translate-y-16">
                <div className="mb-5 border-b-2 rounded-full">
                  <div className="flex justify-center font-sans text-2xl font-semibold text-gray-600">
                    Pranab Phauzdar{" "}
                  </div>

                  <div className="flex justify-center text-gray-600">
                    1957, Kolkata, India
                  </div>
                </div>

                <div className="text-sm tracking-wider text-justify text-gray-700 md:w-auto lg:w-auto ">
                  Phauzdar studied Fine Arts in Kolkata and is an extremely
                  modest artist who believes that his art should speak to the
                  viewer and not his curriculum vitae. He lives and works at
                  Kolkata, India.
                </div>

                <div className="pt-5">
                  <div className="text-lg text-teal-600 border-b-2">
                    Exhibitions
                  </div>
                  <div className="w-auto h-48 pt-2 space-y-2 overflow-y-auto lg:w-72">
                    <ExhibitionItem
                      exhibitionName="Group Exhibition at the Lalit Kala Academy New Delhi"
                      year="1978-1979"
                    />
                    <ExhibitionItem
                      exhibitionName="Solo Exhibition of colleges"
                      year="1985"
                    />
                    <ExhibitionItem
                      exhibitionName="Solo Exhibition oil paintings at the Academy of Fine Arts Kolkata"
                      year="1986"
                    />
                    <ExhibitionItem
                      exhibitionName="Jehangir Art Gallery Mumbai"
                      year="1986"
                    />
                    <ExhibitionItem
                      exhibitionName="Solo Exhibition of colleges"
                      year="1985"
                    />
                  </div>
                  <div className="my-3 text-sm text-right text-blue-700 hover:underline">
                    <Link to="/aboutus">Read More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* list of art works */}
          <div className="w-full py-24 lg:py-5 xl:py-0 2xl:py-0 ">
            <div className="justify-between pb-2 mx-6 sm:flex md:flex">
              <div className="pb-3 text-2xl font-normal text-gray-400 md:text-3xl">
                Artworks
              </div>
              <div className="flex items-center space-x-6">
                <div>Filter arts </div>
                <Select
                  className="w-40 md:w-80"
                  isMulti
                  options={options}
                  classNamePrefix="select year"
                  onChange={(e) => {
                    console.log(e.length);
                    let yearList = [];
                    e.map((year) => yearList.push(year.value));
                    if (e.length === 0) {
                      dispatch({
                        type: "ALL_ART",
                      });
                      dispatch({
                        type: "ALL_NONSELECT_ART",
                      });
                    } else {
                      dispatch({
                        type: "ALL_ART",
                        payload: JSON.stringify(yearList),
                      });
                      dispatch({
                        type: "ALL_NONSELECT_ART",
                        payload: JSON.stringify(yearList),
                      });
                    }
                  }}
                />
              </div>
            </div>
            {/* list of arts */}

            {!isArtListLoading ? (
              <>
                <div className="h-auto mx-6 mt-32 sm:mx-6 columns-1 sm:columns-1 md:columns-2 2xl:columns-3 gap-y-16">
                  {arts?.map((art) => (
                    <>
                      <ArtItem
                        text={art?.description}
                        artId={art?.artId}
                        artsizeHeight={art?.height}
                        artsizewidth={art?.width}
                        art={art?.picture?.secure_url}
                        price={art?.Price}
                      />
                    </>
                  ))}
                </div>
                <div className="h-auto mx-6 mt-32 sm:mx-6 columns-1 sm:columns-1 md:columns-2 2xl:columns-3 gap-y-16">
                  {nonselectedArts?.map((art) => (
                    <>
                      <ArtItem
                        text={art?.description}
                        artId={art?.artId}
                        artsizeHeight={art?.height}
                        artsizewidth={art?.width}
                        art={art?.picture?.secure_url}
                        price={art?.Price}
                      />
                    </>
                  ))}
                </div>
              </>
            ) : (
              <div className="w-screen mx-3 md:mx-20 h-auto lg:w-auto sm:w-[90vw] md:w-[90vw] sm:grid sm:grid-cols-2 md:grid-cols-3 md:max-lg:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 lg:mx-8 space-y-10 sm:space-y-0 flex-col justify-center lg:gap-x-3 md:gap-x-10 gap-y-10  2xl:h-[80vh] overflow-y-auto overflow-x-hidden">
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
              </div>
            )}
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
