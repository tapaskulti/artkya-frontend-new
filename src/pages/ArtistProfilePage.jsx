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
import phouzdar_photo from "../assets/artist.jpg";

import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";

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

  const [activeTab, setActiveTab] = useState("tab1");
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
                  <div className="flex items-center space-x-5 justify-between text-lg text-teal-600 text-left border-b-2">
                    <button
                      onClick={() => setActiveTab("tab1")}
                      className="bg-slate-300 rounded-tl rounded-tr px-5 py-1 text-slate-800 text-sm font-semibold"
                    >
                      Info
                    </button>
                    <button
                      onClick={() => setActiveTab("tab2")}
                      className="bg-slate-300 rounded-tl rounded-tr px-5 py-1 text-slate-800 text-sm font-semibold"
                    >
                      Education
                    </button>
                    <button
                      onClick={() => setActiveTab("tab3")}
                      className="bg-slate-300 rounded-tl rounded-tr px-5 py-1 text-slate-800 text-sm font-semibold"
                    >
                      Exhibitions
                    </button>
                  </div>
                  {activeTab === "tab1" && (
                    <div className="text-slate-600 text-left mt-5 overflow-y-auto">
                        Phauzdar studied Fine Arts in Kolkata and is an
                        extremely modest artist who believes that his art should
                        speak to the viewer and not his curriculum vitae. He
                        lives and works at Kolkata, India.
                    </div>
                  )}
                  {activeTab === "tab2" && <div className="mt-5">Education</div>}
                  {activeTab === "tab3" && (
                    <div className="w-auto h-60 mt-5 space-y-2 overflow-y-auto lg:w-72">
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
                  )}
                  <div className="my-3 text-sm text-right text-blue-700 hover:underline">
                    <Link to="/aboutus">Read More</Link>
                  </div>
                </div>
              </div>
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
