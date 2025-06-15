import { useState } from "react";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { InnerMenuComponent } from "./Menu";
import {
  setCreateArtistAcc,
  setHeaderMenuOpen,
} from "../redux/app/art/artSlice";
import Modal from "./Modal";

const Header = () => {
  const { token, authUser } = useSelector((state) => state.auth);
  const { headerMenuOpen, createArtistAcc } = useSelector((state) => state.art);
  const [dropDownOpen, setdropDownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartDetails } = useSelector((state) => state.cart);

  return (
    <>
      {headerMenuOpen && (
        <>
          <div className="absolute right-1 top-[70px] w-56 h-80 bg-white z-20">
            <div className="border-b">
              {authUser?.isArtist ? (
                <>
                  <InnerMenuComponent
                    name={"View Artist Profile"}
                    onClick={() => {
                      navigate(`/ArtistProfilePage/${authUser?._id}`);
                      dispatch(setHeaderMenuOpen({ headerMenuOpen: false }));
                    }}
                  />
                </>
              ) : (
                <>
                  <InnerMenuComponent
                    name={"Create Artist Account"}
                    onClick={() => {
                      dispatch(setCreateArtistAcc({ createArtistAcc: true }));
                      dispatch(setHeaderMenuOpen({ headerMenuOpen: false }));
                    }}
                  />
                </>
              )}
            </div>
            <div className="border-b">
              <InnerMenuComponent
                name={"View Profile"}
                onClick={() => {
                  navigate("/Profile");
                  dispatch(setHeaderMenuOpen({ headerMenuOpen: false }));
                }}
              />
              <InnerMenuComponent
                name={"Favourites"}
                onClick={() => {
                  navigate("/favoutires");
                  dispatch(setHeaderMenuOpen({ headerMenuOpen: false }));
                }}
              />
              <InnerMenuComponent
                name={"Collections"}
                onClick={() => {
                  // navigate("/Accounts");
                }}
              />
              <InnerMenuComponent
                name={"Orders"}
                onClick={() => {
                  navigate("/orders");
                }}
              />
              {/* <InnerMenuComponent
                name={"Offers"}
                onClick={() => {
                  // navigate("/Accounts");
                }}
              /> */}
              <InnerMenuComponent
                name={"Account"}
                onClick={() => {
                  navigate("/Accounts");
                  dispatch(setHeaderMenuOpen({ headerMenuOpen: false }));
                }}
              />
            </div>

            <div>
              <InnerMenuComponent
                name={"Logout"}
                onClick={() => {
                  dispatch({
                    type: "LOGOUT_SAGA",
                    payload: {
                      email: authUser?.email,
                      body: {
                        navigate: navigate,
                      },
                    },
                  });
                  dispatch(setHeaderMenuOpen({ headerMenuOpen: false }));
                }}
              />
            </div>
          </div>
        </>
      )}

      {createArtistAcc && (
        <>
          <Modal
            open={createArtistAcc}
            onClose={() => {
              dispatch(setCreateArtistAcc({ createArtistAcc: false }));
            }}
            title={"Create an artist account ?"}
            headerColour={"bg-blue-200"}
            headertextColour={"text-white"}
            buttonTwo={"Continue"}
            buttonTwoClick={() => {
              dispatch({
                type: "CREATE_ARTIST",
                payload: {
                  body: {
                    userId: authUser?._id,
                    isArtist: true,
                  },
                },
              });
            }}
            buttonOne={"Cancel"}
            buttonOneClick={() => {
              dispatch(setCreateArtistAcc({ createArtistAcc: false }));
              dispatch(setHeaderMenuOpen({ headerMenuOpen: false }));
            }}
            modalWidth={"w-[400px]"}
          >
            <div className="flex flex-col items-center text-xl py-2 font-semibold">
              <div>{`Are you Sure You Want to`}</div>
              <div>{`create an artist account ?`}</div>
            </div>
            <div className="">
              {`This action will create an "Artist" which will give you the
              ability to upload and sell art once you complete your verification
              process.This action cannot be reversed`}
            </div>
          </Modal>
        </>
      )}

      <div className="items-center w-full scroll bg-gray-50">
        <div className={`${dropDownOpen ? "visible" : "hidden"}`}>
          <div>
            <ul className="md:flex font-sans text-base space-y-2 cursor-pointer text-[#000000] p-5">
              <li className="hover:text-amber-800 ">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="hover:text-amber-800 ">
                <NavLink to="/Painting">Painting</NavLink>
              </li>
              <li className="hover:text-amber-800 ">
                <NavLink to="/AboutUs">About Us</NavLink>
              </li>
              <li className="hover:text-amber-800 ">
                <NavLink to="/Contacts">Contacts</NavLink>
              </li>
            </ul>
          </div>
          <div
            className="absolute z-10 w-full h-full transition-opacity bg-black opacity-30"
            onClick={() => {
              setdropDownOpen(!dropDownOpen);
            }}
          ></div>
        </div>
        <div className="bg-slate-100 shadow-md">
          <div className="flex items-center justify-between py-6 mx-5 md:mx-10 md:flex md:justify-between hover:text-primary">
            <div className="md:hidden">
              <FontAwesomeIcon
                onClick={() => {
                  setdropDownOpen(!dropDownOpen);
                }}
                icon={faBars}
                className="w-5 h-5 md:hidden"
              />
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Link to="/">
                <img src={logo} className="h-12 " alt="Artkya Logo" />
              </Link>
            </div>
            <div className="flex items-center space-x-24">
              <ul className="hidden md:flex space-x-10 font-sans text-base cursor-pointer  text-[#000000] ">
                {token && authUser?.role === "ADMIN" && (
                  <>
                    <li className="hover:text-amber-800 ">
                      <NavLink className="border-black" to="/Admin">
                        Admin
                      </NavLink>
                    </li>
                  </>
                )}
                {token && authUser?.isArtist && (
                  <>
                    <li className="hover:text-amber-800 ">
                      <NavLink className="border-black" to="/Artist">
                        Sell Art
                      </NavLink>
                    </li>
                  </>
                )}

                <li className="hover:text-amber-800 ">
                  <NavLink className="border-black" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="hover:text-amber-800 ">
                  <NavLink className="border-black" to="/Painting">
                    Painting
                  </NavLink>
                </li>
                <li className="hover:text-amber-800 ">
                  <NavLink className="border-black" to="/AboutUs">
                    About Us
                  </NavLink>
                </li>
                <li className="hover:text-amber-800 ">
                  <NavLink className="border-black" to="/Contacts">
                    Contacts
                  </NavLink>
                </li>
              </ul>
              <ul className="hidden md:flex space-x-3 font-sans text-base cursor-pointer font-medium  text-[#000000] ">
                {token === "" && (
                  <>
                    <li className="hover:text-amber-800 ">
                      <NavLink className="border-black" to="/Login">
                        Login
                      </NavLink>
                    </li>
                    {/* <span>|</span> */}
                    {/* <li className="hover:text-amber-800 ">
                      <NavLink className="border-black" to="/Register">
                        Register
                      </NavLink>
                    </li> */}
                  </>
                )}
                {token && (
                  <>
                    <li
                      className="hover:text-amber-800"
                      onClick={() => {
                        navigate("/favoutires");
                      }}
                    >
                      <CiHeart className="w-5 h-6" />
                    </li>
                    <li
                      className="hover:text-amber-800 relative"
                      onClick={() => {
                        navigate("/Cart");
                      }}
                    >
                      <BsCart3 className="w-5 h-6" />
                      {cartDetails?.arts?.length > 0 ? (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {cartDetails?.arts?.length}
                        </span>
                      ) : (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          0
                        </span>
                      )}
                    </li>
                    <li
                      className="hover:text-amber-800 "
                      onClick={() => {
                        // navigate("/Accounts");
                        dispatch(
                          setHeaderMenuOpen({ headerMenuOpen: !headerMenuOpen })
                        );
                      }}
                    >
                      {/* <MenuDefault buttonIcon={<AiOutlineUser  /> }/> */}
                      <AiOutlineUser className="w-5 h-6" />
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
