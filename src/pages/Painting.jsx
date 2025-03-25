/* eslint-disable react/prop-types */
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import Accordion, { SecondAccordion } from "../components/Accordion";
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
import { useNavigate } from "react-router-dom";
import { setSortCriteria } from "../redux/app/art/artSlice";
import MasonaryGridLayout, {
  NoArtFound,
} from "../components/MasonaryGridLayout";
import { CustomSelect, CustomSelectWithSearchSide } from "../components/Select";

const Painting = () => {
  const dispatch = useDispatch();
  const { allArt, artNotFound, searchInput, sortCriteria, searchCriteria } =
    useSelector((state) => state.art);
  const [filterData, setFilterData] = useState({
    style: [],
    subject: [],
    orientation: [],
    medium: [],
    material: [],
    artistcountry: [],
    featuredartist: [],
  });

  // console.log("filterData==>", filterData);

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
      artistCountry: filterData?.artistcountry,
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
          <h2 className="text-3xl font-thin text-slate-900">
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
            <div className="w-full px-3 py-2 mt-6 text-xl text-center border border-gray-200 rounded-md bg-gray-50 backdrop-blur-lg">
              Paintings
            </div>
            <div className="mt-2.5">
              <SecondAccordion
                element={styleElement}
                name={"style"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
            <div className="mt-2.5">
              <SecondAccordion
                element={subjectElement}
                name={"subject"}
                onCheckChange={(e) => {
                  handleFilterData(e);
                }}
              />
            </div>
            <div className="mt-2.5">
              <SecondAccordion
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

