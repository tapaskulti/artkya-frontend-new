import Header from "../components/Header";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import User from "../assets/user.png";
import { ArtDetails } from "./Painting";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart, FaPlus } from "react-icons/fa";

const Favourites = () => {
  // const { allArt } = useSelector((state) => state.art);
  const { authUser } = useSelector((state) => state.auth);
  const { wishlistDetails } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: "GET_WISHLIST_BY_ID",
      payload: authUser?._id,
    });
  }, []);
  return (
    <div className="static">
      <Header />
      <div className="flex space-x-4 items-center px-28 ">
        {/* Icon */}
        <div
          className="w-24 h-24  rounded-full cursor-pointer"
          onClick={() => {
            navigate("/artistProfilePage");
          }}
        >
          <img src={User} alt="" />
        </div>

        {/* text */}
        <div>
          <div className="text-xl font-bold">
            {`${authUser?.firstName ? authUser?.firstName : ""} ${
              authUser?.lastName ? authUser?.lastName : ""
            }${authUser?.firstName ? "'s" : ""}`}{" "}
            Favorites
          </div>
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => {
              navigate("/artistProfilePage");
            }}
          >
            <IoChevronBackCircleSharp />
            <div>Back to profile</div>
          </div>
        </div>
      </div>

      {/* ******************************************************************************* */}

      <div className=" mt-14 px-40">
        <div className="">
          {/* <div className="bg-gray-100 h-auto backdrop-blur-lg rounded-md w-full md:max-lg:max-w-screen-sm md:max-lg:mx-auto mt-6 px-3 py-2">Left</div> */}
          <div className="">
            <div className="h-auto gap-10 lg:gap-16 columns-1 md:columns-2 lg:columns-3 2xl:columns-3 gap-y-16 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-16">
              {/* {
                wishlistDetails?arts
              } */}
              {wishlistDetails?.arts?.length > 0 &&
                wishlistDetails?.arts?.map((singleArt) => {
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
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
