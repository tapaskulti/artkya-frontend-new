import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
// import { setBuyOriginalType } from "../redux/art-slice";

const ArtItem = ({
  text,
  artId,
  artsizeHeight,
  artsizewidth,
  art,
  price,
  id,
  onclickedit,
  isNonSelect,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [isDelete, setisDelete] = useState(false);

  const deleteArt = () => {};
  console.log(location, "location");
  return (
    <>
      <div className="relative block mx-5 lg:mx-0 xl:mx-3 group">
        <Link to={`/${artId}`}>
          <div className="group relative mb-4 before:content-[''] before:absolute before:inset-0 bg-white">
            <div className="mb-40 -translate-y-[60px] sm:-translate-y-16 md:-translate-y-16 lg:-translate-y-24 xl:-translate-y-[112px]">
              <img className="w-full" src={art} alt="art" />
            </div>
            {/* <div className="absolute bottom-0 w-full h-20 px-2 text-white duration-300 opacity-0 group-hover:opacity-100 group-hover:ease-in bg-gradient-to-t from-black via-black to-black/5 rounded-b-md"></div> */}

            <div className="absolute w-full text-black -bottom-2 md:bottom-px">
              <div className="flex items-center justify-between text-sm font-normal lg:text-base xl:text-lg lg:items-start lg:justify-normal lg:flex-col">
                <div className="text-gray-500 lg:text-base xl:text-base">
                  ID: {artId}
                </div>
                <div className="my-1 text-sm font-semibold text-gray-500 lg:text-base xl:text-base md:text-sm">
                  <span className="lg:text-base xl:text-base">Size:</span> W{" "}
                  {artsizewidth} * H {artsizeHeight} inches
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-500 xl:text-base md:text-sm">
                <span className="">Price:</span> Print Copy $75{" "}
                <span className="text-xs">(Starting from)</span>
              </div>
            </div>
          </div>
        </Link>
        <div className="w-auto mt-5 -translate-y-[276px]">
          {location.pathname === "/admin" && (
            <>
              {!isDelete ? (
                <div className="flex space-x-3">
                  {/* <div
                    onClick={onclickedit}
                    className="bg-green-600  cursor-pointer text-xs md:text-sm   text-white rounded-sm font-bold px-2 my-2 py-0.5"
                  >
                    Edit
                  </div> */}
                  <div
                    onClick={() => {
                      setisDelete(true);
                    }}
                    className="border-red-600 border cursor-pointer text-xs md:text-sm  text-amber-700 rounded-sm font-bold px-2 my-2 py-0.5"
                  >
                    Delete
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>Do you want to delete ?</div>
                    <div className="flex space-x-5">
                      <div
                        onClick={() => {
                          setisDelete(false);
                        }}
                        className="cursor-pointer "
                      >
                        No
                      </div>
                      <div
                        onClick={() => {
                          if (!isNonSelect) {
                            dispatch({
                              type: "DELETE_ART",
                              payload: {
                                token,
                                id: id,
                              },
                            });
                          }
                          if (isNonSelect) {
                            dispatch({
                              type: "DELETE_NONSELECT_ART",
                              payload: {
                                token,
                                id: id,
                              },
                            });
                          }
                          setisDelete(false);
                        }}
                        className="text-white px-2 py-0.5 rounded-sm cursor-pointer bg-red-600"
                      >
                        Yes
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ArtItem;
