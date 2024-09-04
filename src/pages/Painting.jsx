/* eslint-disable react/prop-types */
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
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { setAllFilteredArt, setSortCriteria } from "../redux/app/art/artSlice";
import MasonaryGridLayout, {
  NoArtFound,
} from "../components/MasonaryGridLayout";
import { CustomSelect, CustomSelectWithSearchSide } from "../components/Select";

// import ArtItem from "../components/ArtItem";

// const Painting = () => {
//   const dispatch = useDispatch();
//   const { filteredArt, allArt } = useSelector((state) => state.art);
//   const { authUser } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const [itemsToShow, setItemsToShow] = useState();
//   const [filterData, setFilterData] = useState({
//     style: [],
//     subject: [],
//     orientation: [],
//     medium: [],
//     material: [],
//     artistcountry: [],
//     featuredartist: [],
//   });
//   const [searchCriteria, setSearchCriteria] = useState("none");
//   const [sortCriteria, setSortCriteria] = useState("none");
//   const [searchInput, setSearchInput] = useState("");

//   useEffect(() => {
//     if (
//       filterData?.style?.length === 0 ||
//       filterData?.subject?.length === 0 ||
//       filterData?.orientation?.length === 0 ||
//       filterData?.medium?.length === 0 ||
//       filterData?.material?.length === 0 ||
//       filterData?.artistcountry?.length === 0 ||
//       filterData?.featuredartist?.length === 0
//     ) {
//       dispatch(setAllFilteredArt({ filteredArt: [] }));
//     }
//   }, [filterData]);

//   // const [toggleHide, setToggleHide] = useState(false);

//   // const newstyleElement = styleElement.slice(0, 3);
//   // const [buttonText, setButtonText] = useState("read more");

//   // function handleClick() {
//   //   if (!toggleHide) {
//   //     setButtonText("hide");
//   //   } else {
//   //     setButtonText("read more");
//   //   }
//   //   setToggleHide(!toggleHide);
//   // }

//   const handleFilterData = (e) => {
//     const { value, checked, name } = e.target;
//     const newFilterData = { ...filterData };

//     if (newFilterData[name]?.includes(value) === false && checked === true) {
//       newFilterData[name].push(value);
//     } else if (
//       newFilterData[name]?.includes(value) === true &&
//       checked === false
//     ) {
//       newFilterData[name] = newFilterData[name].filter(
//         (item) => item !== value
//       );
//     } else {
//       return;
//     }
//     setFilterData(newFilterData);
//   };

//   // console.log("filterData=============>", filterData);

//   useEffect(() => {
//     const filterDataPayload = {
//       style: filterData?.style,
//       subject: filterData?.subject,
//       orientation: filterData?.orientation,
//       medium: filterData?.medium,
//       material: filterData?.material,
//       artistcountry: filterData?.artistcountry,
//       featuredartist: filterData?.featuredartist,
//     };

//     dispatch({
//       type: "FILTER_ART",
//       payload: {
//         sortingCriteria: sortCriteria,
//         body: filterDataPayload,
//       },
//     });
//   }, [filterData]);

//   useEffect(() => {
//     if (searchCriteria === "Art") {
//       dispatch({
//         type: "SEARCH_BY_ART_TITLE",
//         payload: searchInput,
//       });
//     } else {
//       dispatch({
//         type: "SEARCH_BY_ARTIST",
//         payload: searchInput,
//       });
//     }
//   }, [searchInput, searchCriteria]);

//   console.log("sortCriteria==>", sortCriteria);

//   useEffect(() => {
//     dispatch({
//       type: "ALL_ART",
//       payload: { sortCriteria, searchCriteria, searchInput },
//     });
//   }, [sortCriteria, searchCriteria, searchInput, dispatch]);

//   const options = [
//     // { value: "recomended", label: "Recomended" },
//     { value: "newToOld", label: "New to Old" },
//     { value: "priceLowHigh", label: "Price: Low to High" },
//     { value: "priceHighLow", label: "Price: High to Low" },
//   ];

//   return (
//     <>
//       <div className="static">
//         <Header />
//         <div className="flex justify-end px-10 py-2 border-b border-slate-200 focus:outline-none focus:border-slate-600">
//           <div className="flex items-center">
//             <Select
//               options={[
//                 { value: "art", label: "Art" },
//                 { value: "artist", label: "Artist" },
//               ]}
//               onChange={(e) => {
//                 if (e.label === "Art") {
//                   setSearchCriteria("Art");
//                 } else {
//                   setSearchCriteria("Artist");
//                 }
//               }}
//               className="rounded-none absolute -right-6 w-32 px-3 py-1.5 focus:outline-none focus:border-none border-gray-400"
//             />
//             <input
//               type="text"
//               className="relative border border-gray-400 border-l-transparent border-slate-600 py-1.5 focus:outline-none focus:border-slate-600"
//               value={searchInput}
//               onChange={(e) => {
//                 setSearchInput(e.target.value);
//               }}
//             />
//           </div>
//         </div>
//         <div className="flex items-center justify-between px-10 mt-5">
//           <h2 className="text-slate-900 text-3xl font-thin">
//             Original Paintings For Sale
//           </h2>
//           <Select
//             options={options}
//             className="w-52 bg-white py-1.5 focus:outline-none focus:border-none"
//             onChange={(e) => {
//               if (e.label === "New to Old") {
//                 setSortCriteria("newToOld");
//               } else if (e.label === "Price: Low to High") {
//                 setSortCriteria("incresingPrice");
//               } else if (e.label === "Price: High to Low") {
//                 setSortCriteria("decreasingPrice");
//               } else {
//                 setSortCriteria("none");
//               }
//             }}
//           />
//         </div>
//         <div className="mt-10 lg:flex">
//           <div className="w-1/5 rounded-lg rounded-br-xl px-10">
//             <h2>Category</h2>
//             <div className="w-full bg-gray-50 border border-gray-200 backdrop-blur-lg rounded-md mt-6 px-3 py-2 text-xl text-center">
//               Paintings
//             </div>
//             <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
//               <Accordion
//                 element={styleElement}
//                 name={"style"}
//                 onCheckChange={(e) => {
//                   console.log(e.target.value);
//                   console.log(e.target.checked);
//                   handleFilterData(e);
//                 }}
//               />

//               {/* {styleElement.slice(0, itemsToShow).map((c, ...rest) => (
//                 <Accordion key={c.title} name={c.title} rest={rest} />
//               ))}
//               {styleElement.length > 3 && itemsToShow < 6 ? (
//                 <button onClick={showmore}>Show More</button>
//               ) : itemsToShow > 3 && styleElement.length > 5 ? (
//                 <button onClick={showless}>Show Less</button>
//               ) : (
//                 ""
//               )} */}

//               {/* {!toggleHide ? (
//                 <>
//                   <div>{newstyleElement}</div>
//                 </>
//               ) : (
//                 <>
//                   <div>{styleElement}</div>
//                 </>
//               )} */}
//               {/* <button onClick={() => handleClick()}>{buttonText}</button> */}
//             </div>
//             <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
//               <Accordion
//                 element={subjectElement}
//                 name={"subject"}
//                 onCheckChange={(e) => {
//                   handleFilterData(e);
//                 }}
//               />
//             </div>
//             <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
//               <Accordion
//                 element={mediumElement}
//                 name={"medium"}
//                 onCheckChange={(e) => {
//                   handleFilterData(e);
//                 }}
//               />
//             </div>
//             <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
//               <Accordion
//                 element={materialElement}
//                 name={"material"}
//                 onCheckChange={(e) => {
//                   handleFilterData(e);
//                 }}
//               />
//             </div>
//             <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
//               <Accordion element={priceElement} />
//             </div>
//             <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
//               <Accordion element={sizeElement} />
//             </div>
//             <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
//               <Accordion
//                 element={orientationElement}
//                 name={"orientation"}
//                 onCheckChange={(e) => {
//                   handleFilterData(e);
//                 }}
//               />
//             </div>
//             <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
//               <Accordion element={colorElement} />
//             </div>
//             <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
//               <Accordion
//                 element={artistCountryElement}
//                 name={"artistcountry"}
//                 onCheckChange={(e) => {
//                   handleFilterData(e);
//                 }}
//               />
//             </div>
//             <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
//               <Accordion
//                 element={featuredArtistElement}
//                 name={"featuredartist"}
//                 onCheckChange={(e) => {
//                   handleFilterData(e);
//                 }}
//               />
//             </div>
//           </div>
//           <div className="mt-10 lg:flex">
//           {/* filteredArt.length !== 0 ? filteredArt : allArt */}
//            <MasonaryGridLayout artDetails={filteredArt.length !== 0 ? filteredArt : allArt}/>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


const Painting = () => {
  const dispatch = useDispatch();
  const {
    allArt,
    artNotFound,
    searchInput,
    sortCriteria,
    searchCriteria,
  } = useSelector((state) => state.art);
  const [filterData, setFilterData] = useState({
    style: [],
    subject: [],
    orientation: [],
    medium: [],
    material: [],
    artistcountry: [],
    featuredartist: [],
  });

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

  // Initial fetch to get all arts
  useEffect(() => {
    dispatch({
      type: "NEW_FILTER_ART",
      payload: {
        sortingCriteria: sortCriteria,
        searchCriteria: searchCriteria,
        searchInput: searchInput,
        body: {}, // Empty body to fetch all arts
      },
    });
  }, [dispatch]);

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
      type: "NEW_FILTER_ART",
      payload: {
        sortingCriteria: sortCriteria,
        searchCriteria: searchCriteria,
        searchInput: searchInput,
        body: filterDataPayload,
      },
    });
  }, [filterData, sortCriteria, searchCriteria, searchInput, dispatch]);

  const options = [
    { value: "newToOld", label: "New to Old" },
    { value: "priceLowHigh", label: "Price: Low to High" },
    { value: "priceHighLow", label: "Price: High to Low" },
  ];

  const handleSortCriteriaChange = (value) => {
    dispatch(setSortCriteria({ sortCriteria: value }));
  };

  const categories = ["Art", "Artist"];

  return (
    <>
      <div className="static h-full">
        <Header />
        <div className="flex justify-end px-10 py-2 border-b border-slate-200 focus:outline-none focus:border-slate-600">
          <div className="flex items-center">
            <CustomSelectWithSearchSide
              categories={categories}
              placeholder="Select"
              className="w-full max-w-md"
              labelClassName="text-gray-700 font-semibold"
              selectClassName="text-gray-700 border-gray-300 w-28"
              searchInputClassName="text-gray-700 border-gray-300"
            />
          </div>
        </div>
        <div className="flex items-center justify-between px-10 mt-5">
          <h2 className="text-slate-900 text-3xl font-thin">
            Original Paintings For Sale
          </h2>
          <CustomSelect
            value={sortCriteria}
            onChange={(e) => {
              handleSortCriteriaChange(e);
            }}
            options={options}
            placeholder="Select"
            className="w-52 max-w-xs"
            labelClassName="text-gray-700 font-semibold"
            dropdownClassName="text-gray-700 border-gray-300"
            itemClassName="text-gray-700"
            selectedItemClassName="bg-blue-500 text-white"
          />
        </div>
        <div className="flex mt-10 h-[calc(100vh-160px)]">
          {/* Accordion Container */}
          <div className="w-1/5 h-[80vh] overflow-y-scroll bg-white border-r border-slate-200 p-4 scrollbar-hide">
            <h2>Category</h2>
            <div className="w-full bg-gray-50 border border-gray-200 backdrop-blur-lg rounded-md mt-6 px-3 py-2 text-xl text-center">
              Paintings
            </div>
            <div className="mt-2.5">
              <Accordion
                element={styleElement}
                name={"style"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
            <div className="mt-2.5">
              <Accordion
                element={subjectElement}
                name={"subject"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
            <div className="mt-2.5">
              <Accordion
                element={mediumElement}
                name={"medium"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
            <div className="mt-2.5">
              <Accordion
                element={materialElement}
                name={"material"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
            <div className="mt-2.5">
              <Accordion
                element={priceElement}
                // name={"orientation"}
                // onCheckChange={(e) => {
                //   handleFilterData(e);
                // }}
              />
            </div>
            <div className="mt-2.5">
              <Accordion
                element={sizeElement}
                // name={"orientation"}
                // onCheckChange={(e) => {
                //   handleFilterData(e);
                // }}
              />
            </div>
            <div className="mt-2.5">
              <Accordion
                element={orientationElement}
                name={"orientation"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
            <div className="mt-2.5">
              <Accordion
                element={colorElement}
                // name={"artistcountry"}
                // onCheckChange={(e) => {
                //   handleFilterData(e);
                // }}
              />
            </div>
            <div className="mt-2.5">
              <Accordion
                element={artistCountryElement}
                name={"artistcountry"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
            <div className="mt-2.5 w-full">
              <Accordion
                element={featuredArtistElement}
                name={"featuredartist"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
          </div>

          {/* Masonry Grid Container */}
          <div className="flex-1 h-[80vh] overflow-y-auto bg-white p-4 stylish-scrollbar">
            {artNotFound ? (
              <NoArtFound />
            ) : (
              <MasonaryGridLayout artDetails={allArt} />
            )}
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
