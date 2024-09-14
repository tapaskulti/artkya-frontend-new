import Header from "../components/Header";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import User from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MasonaryGridLayout from "../components/MasonaryGridLayout";
import { CircularLoader } from "../components/Loading";

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
  }, [authUser, dispatch]);

  return (
    <div className="static">
      <Header />
      <div className="flex space-x-4 items-center px-28 pt-10">
        {/* Icon */}
        <div
          className="w-24 h-24  rounded-full cursor-pointer"
          onClick={() => {
            navigate(`/artistProfilePage/${authUser?._id}`);
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
              navigate(`/artistProfilePage/${authUser?._id}`);
            }}
          >
            <IoChevronBackCircleSharp />
            <div>Back to profile</div>
          </div>
        </div>
      </div>

      {/* ******************************************************************************* */}

      <div className=" mt-14 px-40">
        {wishlistDetails?.arts?.length === 0 ? (
          <>
            <CircularLoader size={16} color="green-500" />
          </>
        ) : (
          <>
            <MasonaryGridLayout artDetails={wishlistDetails?.arts} />
          </>
        )}
      </div>
    </div>
  );
};

export default Favourites;
