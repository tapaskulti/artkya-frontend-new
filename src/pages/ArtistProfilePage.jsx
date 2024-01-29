import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

// import { Link } from "react-router-dom";
import Img1 from "../assets/Img1.jpg";
import Img3 from "../assets/img3.jpg";
import Img14 from "../assets/img14.jpg";
import Img6 from "../assets/img6.jpg";
import Img8 from "../assets/img8.jpg";
import Img9 from "../assets/img9.jpg";
import Img12 from "../assets/img12.jpg";

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
import { useDispatch } from "react-redux";
import Select from "react-select";

// import ArtItem from "../components/ArtItem";

const Painting = () => {
  const dispatch = useDispatch();
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

  console.log("filterData=============>", filterData);

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
        body: filterDataPayload,
      },
    });
  }, [filterData]);

  const options = [
    { value: "recomended", label: "Recomended" },
    { value: "newToOld", label: "New to Old" },
    { value: "priceLowHigh", label: "Price: Low to High" },
    { value: "priceHighLow", label: "Price: High to Low" },
  ];

  return (
    <>
      <div className="static">
        <Header />
        <div className="flex justify-end px-10 py-2 border-b border-slate-200">
          <div className="flex items-center">
            <Select
              options={[
                { value: "art", label: "Art" },
                { value: "artist", label: "Artist" },
              ]}
              className="rounded-none absolute -right-6 w-32 px-3 py-1.5 focus:outline-none focus:border-slate-300"
            />
            <input
              type="text"
              className="relative border border-l-transparent border-slate-300 py-1.5"
            />
          </div>
        </div>
        <div className="flex items-center justify-between px-10 mt-5">
          <h2 className="text-slate-900 text-3xl font-thin">
            Original Paintings For Sale
          </h2>
          <Select
            options={options}
            className="w-52 bg-white py-1.5 focus:outline-none focus:border-slate-300"
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
              dfksdf
            </div>
          </div>
          <div className="w-4/6 mt-10 lg:flex">
            <div className="">
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
