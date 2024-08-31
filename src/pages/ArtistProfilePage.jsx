import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams,useNavigate } from "react-router-dom";
import MasonaryGridLayout from "../components/MasonaryGridLayout";
import { FaPencilAlt } from "react-icons/fa";

// import ArtItem from "../components/ArtItem";

const ArtistProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { setArtistImageUploadLoading, artistDetails, getAllArtByArtist } =
    useSelector((state) => state.artist);
  const formData = new FormData();

  let { id } = useParams();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("tab1");

  console.log("id------->", id);

  const handleFileUploadChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    formData.append("avatar", file);

    dispatch({
      type: "UPDATE_ARTIST_IMAGE",
      payload: {
        artistId: id,
        body: formData,
      },
    });
  };
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    dispatch({
      type: "GET_ARTIST_PROFILE_BY_ID",
      payload: {
        artistId: id,
      },
    });

    dispatch({
      type: "GET_ALL_ART_BY_ARTIST",
      payload: {
        artistId: id,
      },
    });
  }, []);

  return (
    <>
      <div className="static">
        <Header />
        {/* <div className="flex justify-end px-10 py-2 border-b border-slate-200">
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
        </div> */}
        <div className="px-10 mt-5">
          <h2 className="text-slate-900 text-3xl font-thin ">
            Original Paintings For Sale
          </h2>
          {/* <Select
            options={options}
            className="w-52 bg-white py-1.5 focus:outline-none focus:border-slate-300"
          /> */}
        </div>
        <div className="mt-10 lg:flex">
          <div className="relative mx-5 md:mx-0">
            {/* background and phauzdar image */}
            <div className="bg-gray-100 h-auto backdrop-blur-lg w-full md:max-lg:max-w-screen-sm md:max-lg:mx-auto lg:w-[23rem] md:px-10 px-5 md:mx-5  lg:mx-7 translate-y-20  rounded-lg rounded-br-xl">
              {setArtistImageUploadLoading ? (
                <>
                  <Spinner />
                </>
              ) : (
                <>
                  <img
                    src={artistDetails?.profileImage?.secure_url}
                    className="relative object-fill mx-auto transform -translate-y-20 border-8 border-white rounded-full w-52 h-52 "
                    alt="Phauzdar"
                  />
                </>
              )}

              <div
                className="absolute right-24 top-[70px] bg-gray-300 p-4 rounded-full cursor-pointer"
                onClick={handleIconClick}
              >
                <FaPencilAlt />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUploadChange}
              />
              <div className="relative z-10 flex-col justify-center -translate-y-16">
                <div className="mb-5 border-b-2 rounded-full">
                  <div className="flex justify-center font-sans text-2xl font-semibold text-gray-600">
                    {`${artistDetails?.userId?.firstName} ${artistDetails?.userId?.lastName}`}
                  </div>

                  <div className="flex justify-center text-gray-600">
                    {`${artistDetails?.city}, ${artistDetails?.state}, ${artistDetails?.country}`}
                  </div>
                </div>

                <div className="text-sm tracking-wider text-justify text-gray-700 md:w-auto lg:w-auto ">
                  {artistDetails?.aboutMe}
                </div>

                <div className="pt-5">
                  <div className="flex items-center space-x-5 justify-between text-lg text-teal-600 text-left border-b-2">
                    <button
                      onClick={() => setActiveTab("tab1")}
                      className="bg-slate-300 rounded-tl rounded-tr px-5 py-1 text-slate-800 text-sm font-semibold"
                    >
                      Education
                    </button>
                    <button
                      onClick={() => setActiveTab("tab2")}
                      className={`${
                        activeTab === "tab2"
                          ? "bg-slate-300 rounded-tl rounded-tr px-5 py-1 text-slate-800"
                          : "bg-transparent"
                      } text-sm font-semibold`}
                    >
                      Events
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
                      {artistDetails?.education}
                    </div>
                  )}
                  {activeTab === "tab2" && (
                    <div className="mt-5">{artistDetails?.events}</div>
                  )}
                  {activeTab === "tab3" && (
                    <>
                      <div className="mt-5">{artistDetails?.exibition}</div>
                    </>
                    // <div className="w-auto h-60 mt-5 space-y-2 overflow-y-auto lg:w-72">
                    //   <ExhibitionItem
                    //     exhibitionName="Group Exhibition at the Lalit Kala Academy New Delhi"
                    //     year="1978-1979"
                    //   />
                    //   <ExhibitionItem
                    //     exhibitionName="Solo Exhibition of colleges"
                    //     year="1985"
                    //   />
                    //   <ExhibitionItem
                    //     exhibitionName="Solo Exhibition oil paintings at the Academy of Fine Arts Kolkata"
                    //     year="1986"
                    //   />
                    //   <ExhibitionItem
                    //     exhibitionName="Jehangir Art Gallery Mumbai"
                    //     year="1986"
                    //   />
                    //   <ExhibitionItem
                    //     exhibitionName="Solo Exhibition of colleges"
                    //     year="1985"
                    //   />
                    // </div>
                  )}
                  <div className="my-3 text-sm text-right text-blue-700 hover:underline">
                    <Link to="/aboutus">Read More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-4/6 lg:flex">
            <div className="">
              {/* <div className="bg-gray-100 h-auto backdrop-blur-lg rounded-md w-full md:max-lg:max-w-screen-sm md:max-lg:mx-auto mt-6 px-3 py-2">Left</div> */}
              <div className="mt-20">
                <MasonaryGridLayout artDetails={getAllArtByArtist}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistProfilePage;

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


