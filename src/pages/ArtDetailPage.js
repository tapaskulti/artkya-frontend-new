import React, { useEffect, useSatate, useState } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { setBuyOriginalType, setPriceTobeCheckout } from "../redux/art-slice";
import Select from "react-select";
import { toast } from "react-toastify";

const ArtDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setPriceTobeCheckout({
        priceToBeChekout: "",
      })
    );
  }, []);

  const { artDetail, isLoading, priceToBeChekout } = useSelector(
    (state) => state.art
  );
  const [customerDetailForArtCopy, setcustomerDetailForArtCopy] =
    useState(true);

  const [artModes, setartModes] = useState({
    artCopy: true,
    artOrigin: false,
  });

  console.log(priceToBeChekout, "priceToBeChekout");
  const [ticket, setticket] = useState();

  useEffect(() => {
    dispatch(
      setBuyOriginalType({
        buyOriginalType: false,
      })
    );
    dispatch({
      type: "ART_DETAIL",
      payload: {
        artId: id,
      },
    });
  }, []);

  return (
    <div className="w-screen">
      <Header />
      <div className="w-screen px-10 py-10">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} className="pb-5 w-7 h-7" />
        </Link>

        <div className="md:flex ">
          {/* image */}
          {!isLoading ? (
            <div>
              <img
                src={artDetail?.picture?.secure_url}
                alt={"here is the text"}
                className="rounded-md shadow-xl md:w-[90%] lg:w-[80%] xl:w-[80%]  "
              />
            </div>
          ) : (
            <div role="status" className="w-52">
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

          {/* image detail */}
          <div className="flex-col pt-10 text-center">
            <div className="flex justify-between w-full py-5 mb-2 space-x-4 text-base font-medium border-b-2 sm:justify-start ">
              <div
                onClick={() => {
                  setartModes({
                    artCopy: true,
                    artOrigin: false,
                  });
                }}
                className={`cursor-pointer ${
                  artModes?.artCopy
                    ? " bg-teal-700 text-white rounded-md px-5 py-1"
                    : "border-teal-700 border text-teal-700 px-5 rounded-md  py-1"
                }`}
              >
                Print Copy
              </div>
              <div
                onClick={() => {
                  setartModes({
                    artCopy: false,
                    artOrigin: true,
                  });
                }}
                className={`cursor-pointer ${
                  artModes?.artOrigin
                    ? "bg-teal-700 text-white rounded-md px-5 py-1"
                    : "border-teal-700 border text-teal-700 px-5 rounded-md  py-1"
                } `}
              >
                Original Art
              </div>
            </div>

            <div className="flex space-x-2 text-xl font-semibold md:text-2xl md:w-80 w-72">
              <div className="text-gray-700">Picture ID&nbsp;:</div>
              {!isLoading ? (
                <div>{artDetail?.artId}</div>
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
            </div>
            <div className="text-justify text-stone-700 pt-2 lg:w-80 xl:w-[500px]">
              {artDetail?.description}
            </div>
            <div className="items-center justify-start pt-2 space-x-6">
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
              <div className="flex items-center space-x-2">
                <div className="text-lg text-gray-700">Year:</div>
                <div className="text-base ">{artDetail.year}</div>
              </div>
            </div>
            {!artModes?.artOrigin && (
              <div className="flex items-center space-x-2">
                <div className="py-5 text-lg">Select Size : </div>
                <Select
                  options={[
                    { label: "8 * 10 inches", value: "8*10 inches" },
                    { label: "16 * 20 inches", value: "16*20 inches" },
                    { label: "20 * 30 inches", value: "20*30 inches" },
                  ]}
                  onChange={(e) => {
                    setticket(e.value);
                    if (e.value === "8*10 inches") {
                      dispatch(
                        setPriceTobeCheckout({
                          priceToBeChekout: 75,
                        })
                      );
                    } else if (e.value === "16*20 inches") {
                      dispatch(
                        setPriceTobeCheckout({
                          priceToBeChekout: 175,
                        })
                      );
                    } else if (e.value === "20*30 inches") {
                      dispatch(
                        setPriceTobeCheckout({
                          priceToBeChekout: 195,
                        })
                      );
                    }
                  }}
                />
              </div>
            )}

            {!artModes?.artOrigin && (
              <div className="flex items-center space-x-2">
                <div className="text-lg text-gray-700">Price:</div>
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
                <div className="font-bold">
                  {ticket === "8*10 inches" && <div>$ 75</div>}
                </div>
                <div className="font-bold">
                  {ticket === "16*20 inches" && <div>$ 175</div>}
                </div>
                <div className="font-bold">
                  {ticket === "20*30 inches" && <div>$ 195</div>}
                </div>
                <div></div>
              </div>
            )}

            <div className="pt-5 space-y-2">
              {artModes.artCopy && (
                <>
                  {priceToBeChekout ? (
                    <div>
                      <Link to={`/${artDetail?.artId}/checkout`}>
                        <div className="px-2 py-2 font-semibold text-white uppercase bg-green-700 rounded-md cursor-pointer sm:w-1/2 md:w-2/3">
                          Buy Print Copy
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        toast.warning("Select Size First");
                      }}
                      className="px-2 py-2 font-semibold text-white uppercase bg-green-700 rounded-md cursor-pointer sm:w-1/2 md:w-2/3"
                    >
                      Buy Print Copy
                    </div>
                  )}
                </>
              )}
              {artModes.artOrigin && (
                <div>
                  <Link
                    to={`/${artDetail?.artId}/checkout`}
                    onClick={() => {
                      dispatch(
                        setBuyOriginalType({
                          buyOriginalType: true,
                        })
                      );
                    }}
                  >
                    <div className="border-amber-700 border px-2 py-1.5 rounded-md text-amber-700 font-semibold ursor-pointer sm:w-1/2 md:w-2/3 uppercase">
                      Make an offer
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtDetailPage;
