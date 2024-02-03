import Header from "../components/Header";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import User from "../assets/user.png";
import { ArtDetails } from "./Painting";
import { useSelector } from "react-redux";

const Favourites = () => {
  const { allArt } = useSelector((state) => state.art);
  const navigate = useNavigate();
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
          <div className="text-xl font-bold">Abhisek Biswas's Favorites</div>
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
              {allArt?.map((singleArt) => {
                return (
                  <div key={singleArt._id}>
                    <img src={singleArt?.thumbnail?.secure_url} alt="" />
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
