import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import Accordion from "../components/Accordion";
import {
  artistCountryElement,
  colorElement,
  featuredArtistElement,
  materialElement,
  mediumElement,
  orientationElement,
  priceElement,
  sizeElement,
  styleElement,
  subjectElement,
} from "../utlis/filterData";
import { FaHeart, FaPlus } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { setAllFilteredArt } from "../redux/app/art/artSlice";

// import ArtItem from "../components/ArtItem";

const Painting = () => {
  const dispatch = useDispatch();
  const { filteredArt, allArt } = useSelector((state) => state.art);
  const { authUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [itemsToShow, setItemsToShow] = useState();
  const [filterData, setFilterData] = useState({
    style: [],
    subject: [],
    orientation: [],
    medium: [],
    material: [],
    artistcountry: [],
    featuredartist: [],
  });
  const [searchCriteria, setSearchCriteria] = useState("none");
  const [sortCriteria, setSortCriteria] = useState("none");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (
      filterData?.style?.length === 0 ||
      filterData?.subject?.length === 0 ||
      filterData?.orientation?.length === 0 ||
      filterData?.medium?.length === 0 ||
      filterData?.material?.length === 0 ||
      filterData?.artistcountry?.length === 0 ||
      filterData?.featuredartist?.length === 0
    ) {
      dispatch(setAllFilteredArt({ filteredArt: [] }));
    }
  }, [filterData]);

  // const [toggleHide, setToggleHide] = useState(false);

  // const newstyleElement = styleElement.slice(0, 3);
  // const [buttonText, setButtonText] = useState("read more");

  // function handleClick() {
  //   if (!toggleHide) {
  //     setButtonText("hide");
  //   } else {
  //     setButtonText("read more");
  //   }
  //   setToggleHide(!toggleHide);
  // }

  const handleFilterData = (e) => {
    const { value, checked, name } = e.target;
    const newFilterData = { ...filterData };

    if (newFilterData[name]?.includes(value) === false && checked === true) {
      newFilterData[name].push(value);
    } else if (
      newFilterData[name]?.includes(value) === true &&
      checked === false
    ) {
      newFilterData[name] = newFilterData[name].filter(
        (item) => item !== value
      );
    } else {
      return;
    }
    setFilterData(newFilterData);
  };

  // console.log("filterData=============>", filterData);

  useEffect(() => {
    const filterDataPayload = {
      style: filterData?.style,
      subject: filterData?.subject,
      orientation: filterData?.orientation,
      medium: filterData?.medium,
      material: filterData?.material,
      artistcountry: filterData?.artistcountry,
      featuredartist: filterData?.featuredartist,
    };

    dispatch({
      type: "FILTER_ART",
      payload: {
        sortingCriteria: sortCriteria,
        body: filterDataPayload,
      },
    });
  }, [filterData]);

  useEffect(() => {
    if (searchCriteria === "Art") {
      dispatch({
        type: "SEARCH_BY_ART_TITLE",
        payload: searchInput,
      });
    } else {
      dispatch({
        type: "SEARCH_BY_ARTIST",
        payload: searchInput,
      });
    }
  }, [searchInput, searchCriteria]);

  console.log("sortCriteria==>", sortCriteria);

  useEffect(() => {
    dispatch({
      type: "ALL_ART",
      payload: { sortCriteria, searchCriteria, searchInput },
    });
  }, [sortCriteria, searchCriteria, searchInput, dispatch]);

  const options = [
    // { value: "recomended", label: "Recomended" },
    { value: "newToOld", label: "New to Old" },
    { value: "priceLowHigh", label: "Price: Low to High" },
    { value: "priceHighLow", label: "Price: High to Low" },
  ];

  return (
    <>
      <div className="static">
        <Header />
        <div className="flex justify-end px-10 py-2 border-b border-slate-200 focus:outline-none focus:border-slate-600">
          <div className="flex items-center">
            <Select
              options={[
                { value: "art", label: "Art" },
                { value: "artist", label: "Artist" },
              ]}
              onChange={(e) => {
                if (e.label === "Art") {
                  setSearchCriteria("Art");
                } else {
                  setSearchCriteria("Artist");
                }
              }}
              className="rounded-none absolute -right-6 w-32 px-3 py-1.5 focus:outline-none focus:border-none border-gray-400"
            />
            <input
              type="text"
              className="relative border border-gray-400 border-l-transparent border-slate-600 py-1.5 focus:outline-none focus:border-slate-600"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between px-10 mt-5">
          <h2 className="text-slate-900 text-3xl font-thin">
            Original Paintings For Sale
          </h2>
          <Select
            options={options}
            className="w-52 bg-white py-1.5 focus:outline-none focus:border-none"
            onChange={(e) => {
              if (e.label === "New to Old") {
                setSortCriteria("newToOld");
              } else if (e.label === "Price: Low to High") {
                setSortCriteria("incresingPrice");
              } else if (e.label === "Price: High to Low") {
                setSortCriteria("decreasingPrice");
              } else {
                setSortCriteria("none");
              }
            }}
          />
        </div>
        <div className="mt-10 lg:flex">
          <div className="w-1/4 rounded-lg rounded-br-xl px-10">
            <h2>Category</h2>
            <div className="w-full bg-gray-50 border border-gray-200 backdrop-blur-lg rounded-md mt-6 px-3 py-2 text-xl text-center">
              Paintings
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion
                element={styleElement}
                name={"style"}
                onCheckChange={(e) => {
                  console.log(e.target.value);
                  console.log(e.target.checked);
                  handleFilterData(e);
                }}
              />

              {/* {styleElement.slice(0, itemsToShow).map((c, ...rest) => (
                <Accordion key={c.title} name={c.title} rest={rest} />
              ))}
              {styleElement.length > 3 && itemsToShow < 6 ? (
                <button onClick={showmore}>Show More</button>
              ) : itemsToShow > 3 && styleElement.length > 5 ? (
                <button onClick={showless}>Show Less</button>
              ) : (
                ""
              )} */}

              {/* {!toggleHide ? (
                <>
                  <div>{newstyleElement}</div>
                </>
              ) : (
                <>
                  <div>{styleElement}</div>
                </>
              )} */}
              {/* <button onClick={() => handleClick()}>{buttonText}</button> */}
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion
                element={subjectElement}
                name={"subject"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion
                element={mediumElement}
                name={"medium"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion
                element={materialElement}
                name={"material"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion element={priceElement} />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion element={sizeElement} />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion
                element={orientationElement}
                name={"orientation"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion element={colorElement} />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion
                element={artistCountryElement}
                name={"artistcountry"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion
                element={featuredArtistElement}
                name={"featuredartist"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
          </div>
          <div className="w-2/3 mt-10 lg:flex">
            <div className="">
              {/* <div className="bg-gray-100 h-auto backdrop-blur-lg rounded-md w-full md:max-lg:max-w-screen-sm md:max-lg:mx-auto mt-6 px-3 py-2">Left</div> */}
              <div className="mt-20 ">
                <div className="h-auto mt-32 gap-10 lg:gap-16 columns-1 md:columns-2 lg:columns-3 2xl:columns-4 gap-y-16 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-16">
                  {(filteredArt.length !== 0 ? filteredArt : allArt)?.map(
                    (singleArt) => {
                      return (
                        <div key={singleArt._id}>
                          <div className="relative group">
                            <div className="hidden group-hover:block animation-duration: 3s">
                              <div className="flex absolute space-x-1 right-3 top-3 ">
                                <button className="bg-white w-7 h-7 rounded-full flex justify-center pt-1.5">
                                  <FaPlus />
                                </button>
                                <button 
                                className="bg-white w-7 h-7 rounded-full flex justify-center pt-1.5"
                                onClick={() => {
                                  dispatch({
                                    type: "ADD_ART_TO_WISHLIST",
                                    payload: {
                                      userId: authUser?._id,
                                      artId: singleArt?._id,                
                                    },
                                  });
                                }}
                                >
                                  <FaHeart />
                                </button>
                                <button
                                  className="bg-white w-7 h-7 rounded-full flex justify-center pt-1.5"
                                  onClick={() => {
                                    dispatch({
                                      type: "ADD_ART_TO_CART",
                                      payload: {
                                        userId: authUser?._id,
                                        artId: singleArt?._id,
                                        artPrice: singleArt?.price,
                                        navigate
                                      },
                                    });
                                  }}
                                >
                                  <FaCartShopping />
                                </button>
                              </div>
                            </div>
                            <Link to={`/artDetailPage/${singleArt._id}`}>
                              <img
                                src={singleArt?.thumbnail?.secure_url}
                                alt=""
                                className="w-full"
                              />
                            </Link>
                          </div>
                          <br />
                          <div>
                            <ArtDetails
                              title={singleArt?.title}
                              width={singleArt?.width}
                              height={singleArt?.height}
                              depth={singleArt?.depth}
                              price={singleArt?.price}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Painting;

// eslint-disable-next-line react/prop-types
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

export const ArtDetails = ({
  title,
  width,
  height,
  depth,
  price,
  artist,
  artistCountry,
}) => {
  return (
    <div className="w-full text-black pb-6">
      <div className="text-sm font-normal lg:text-base xl:text-lg lg:items-start lg:justify-normal lg:flex-col">
        <div className="text-gray-500 lg:text-base xl:text-base">{title}</div>
        <div className="-mt-1 text-sm font-semibold text-gray-500 lg:text-base xl:text-base md:text-sm">
          <div className="lg:text-xs xl:text-xs">
            {" "}
            {width} W x {height} H x {depth} D inches
          </div>
        </div>
      </div>
      <div className="flex justify-between text-sm font-semibold text-gray-500 xl:text-base md:text-sm my-3">
        <div>
          <div className="text-sm">{artist}</div>
          <div className="text-xs -pt-2">{artistCountry}</div>
        </div>
        <div>
          <span className="text-sm">Price:</span> Print Copy {price}
        </div>
      </div>
    </div>
  );
};
