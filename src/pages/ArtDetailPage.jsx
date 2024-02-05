// import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setBuyOriginalType, setPriceTobeCheckout } from "../redux/art-slice";
import Select from "react-select";
import { toast } from "react-toastify";
import artPic from "../assets/artPic.jpg";
import { TiTick } from "react-icons/ti";
// import tn01 from "../assets/tn01.jpg";

const ArtDetailPage = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     setPriceTobeCheckout({
  //       priceToBeChekout: "",
  //     })
  //   );
  // }, []);

  // const { artDetail, isLoading, priceToBeChekout } = useSelector(
  //   (state) => state.art
  // );
  // const [customerDetailForArtCopy, setcustomerDetailForArtCopy] =
  //   useState(true);

  // const [artModes, setartModes] = useState({
  //   artCopy: true,
  //   artOrigin: false,
  // });

  // console.log(priceToBeChekout, "priceToBeChekout");
  // const [ticket, setticket] = useState();

  // useEffect(() => {
  //   dispatch(
  //     setBuyOriginalType({
  //       buyOriginalType: false,
  //     })
  //   );
  //   dispatch({
  //     type: "ART_DETAIL",
  //     payload: {
  //       artId: id,
  //     },
  //   });
  // }, []);

  return (
    <div className="w-screen">
      <Header />
      <div className="w-full px-32 py-10">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} className="pb-5 w-7 h-7" />
        </Link>

        <div className="w-full md:flex md:justify-between md:space-x-16">
          {/* image */}
          <div className="space-y-2">
            <img src={artPic} alt="" className="w-16 h-16" />
            <img src={artPic} alt="" className="w-16 h-16" />
            <img src={artPic} alt="" className="w-16 h-16" />
            <img src={artPic} alt="" className="w-16 h-16" />
            <img src={artPic} alt="" className="w-16 h-16" />
          </div>
          <div className="w-1/2">
            <img
              src={artPic}
              alt={"here is the text"}
              className="rounded-md shadow-xl md:w-full "
            />
          </div>

          {/* image detail */}
          <div className="w-1/3 text-center bg-slate-50">
            <div className="flex justify-between text-xl font-semibold text-left">
              <button className="bg-slate-300 text-base w-1/2 py-2.5">
                Original Art
              </button>
              <button className="w-1/2 py-2.5 text-base">Print Copy</button>
            </div>

            <div className="px-3 mt-5 text-xl font-semibold">
              <div className="text-left">
                <h2 className="text-lg italic text-slate-600">Blue Mirroring! Painting</h2>
                <h2 className="text-sm text-red-600">Pranab Phauzdar</h2>
                <h2 className="text-sm font-semibold text-gray-700">
                  India
                </h2>
              </div>
              <div className="py-3 space-y-1 text-sm text-left text-gray-700">
                <h2>Painting, Acrylic on Canvas</h2>
                <h2>Size: 101.6 W x 111.8 H x 2.5 D cm</h2>
                <div className="flex items-center space-x-6">
                  <h2 className="text-sm font-semibold text-gray-700">
                    Picture ID: AKP-2024
                  </h2>
                  <div className="flex items-center space-x-2">
                    <h2>Year:</h2>
                    <h2>2023</h2>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="py-5 text-base">Select Size: </div>
                  <Select
                    options={[
                      { label: "8 * 10 inches", value: "8*10 inches" },
                      { label: "16 * 20 inches", value: "16*20 inches" },
                      { label: "20 * 30 inches", value: "20*30 inches" },
                    ]}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl text-slate-900 font-thin">Price: USD 280</div>
                  <button className="w-40 px-5 py-3 text-white bg-slate-800 text-base">Add to Cart</button>
                </div>
                <div className="flex justify-end text-base text-green-700 font-semibold mr-6 mt-6 cursor-pointer">Make an Offer!</div>
              </div>
              <div className="flex items-center">
                <TiTick />
                <h2 className="text-sm">Shipping included</h2>

              </div>
              <div className="flex items-center">
                <TiTick />
                <h2 className="text-sm">14-day satisfaction guarantee

                </h2>
              </div>

              {/* <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div> */}
            </div>

            <div className="items-center justify-start px-3 pt-2 space-x-6">
              {/* <div className="flex items-center space-x-2">
                <div className="text-lg text-gray-700">Size:</div>
                {!isLoading ? (
                  <div className="text-base font-semibold text-stone-800 ">
                    {artDetail.height} * {artDetail.width} inches
                  </div>
                ) : (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </div> */}

            </div>



            <div className="flex items-center space-x-2">
              {/* {!isLoading ? (
                <div className="text-xl font-semibold">{artDetail.Price}</div>
              ) : (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )} */}
            </div>

            {/* <div className="pt-5 space-y-2">
              <div>
                <div className="px-2 py-2 font-semibold text-white uppercase bg-green-700 rounded-md cursor-pointer sm:w-1/2 md:w-2/3">
                  Buy Print Copy
                </div>
              </div>
              <div
                onClick={() => {
                  toast.warning("Select Size First");
                }}
                className="px-2 py-2 font-semibold text-white uppercase bg-green-700 rounded-md cursor-pointer sm:w-1/2 md:w-2/3"
              >
                Buy Print Copy
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtDetailPage;
