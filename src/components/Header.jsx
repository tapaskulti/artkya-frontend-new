import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
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
import logo from "../assets/logo.jpeg";

const Header = () => {
  const { token, authUser } = useSelector((state) => state.auth);
  const { headerMenuOpen, createArtistAcc } = useSelector((state) => state.art);
  const { cartDetails } = useSelector((state) => state.cart);
  const [dropDownOpen, setdropDownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check if a nav item is active
  const isActiveNav = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {headerMenuOpen && (
        <>
          <div className="absolute right-1 top-[70px] w-56 h-80 bg-white z-20 shadow-lg border border-gray-200 rounded-sm">
            <div className="border-b border-gray-100">
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
            <div className="border-b border-gray-100">
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
                  // navigate("/Collections");
                }}
              />
              <InnerMenuComponent
                name={"Orders"}
                onClick={() => {
                  navigate("/orders");
                  dispatch(setHeaderMenuOpen({ headerMenuOpen: false }));
                }}
              />
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
              process. This action cannot be reversed`}
            </div>
          </Modal>
        </>
      )}

      <div className="items-center w-full scroll bg-white shadow-sm">
        {/* Mobile menu overlay */}
        <div className={`${dropDownOpen ? "visible" : "hidden"}`}>
          <div className="bg-white shadow-lg border-b border-gray-200">
            <ul className="md:flex font-sans text-base space-y-2 cursor-pointer text-gray-800 p-5">
              <li className="hover:text-amber-600 transition-colors duration-200">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive ? "text-amber-600 font-medium" : ""
                  }
                  onClick={() => setdropDownOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li className="hover:text-amber-600 transition-colors duration-200">
                <NavLink 
                  to="/Painting"
                  className={({ isActive }) => 
                    isActive ? "text-amber-600 font-medium" : ""
                  }
                  onClick={() => setdropDownOpen(false)}
                >
                  Painting
                </NavLink>
              </li>
              <li className="hover:text-amber-600 transition-colors duration-200">
                <NavLink 
                  to="/AboutUs"
                  className={({ isActive }) => 
                    isActive ? "text-amber-600 font-medium" : ""
                  }
                  onClick={() => setdropDownOpen(false)}
                >
                  About Us
                </NavLink>
              </li>
              <li className="hover:text-amber-600 transition-colors duration-200">
                <NavLink 
                  to="/Contacts"
                  className={({ isActive }) => 
                    isActive ? "text-amber-600 font-medium" : ""
                  }
                  onClick={() => setdropDownOpen(false)}
                >
                  Contacts
                </NavLink>
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

        {/* Main header */}
        <div className="bg-gray-50 shadow-sm border-b border-gray-100">
          <div className="flex items-center justify-between py-4 mx-5 md:mx-10 md:flex md:justify-between">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => {
                  setdropDownOpen(!dropDownOpen);
                }}
                className="p-2 rounded-sm hover:bg-gray-100 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faBars}
                  className="w-5 h-5 text-gray-700"
                />
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center md:justify-start">
              <Link to="/" className="flex items-center">
                <img src={logo} className="h-12" alt="Artkya Logo" />
              </Link>
            </div>

            <div className="flex items-center space-x-8">
              {/* Desktop Navigation */}
              <ul className="hidden md:flex space-x-8 font-sans text-base cursor-pointer text-gray-800">
                {token && authUser?.role === "ADMIN" && (
                  <li className="hover:text-amber-600 transition-colors duration-200">
                    <NavLink 
                      to="/Admin"
                      className={({ isActive }) => 
                        `pb-1 border-b-2 transition-colors duration-200 ${
                          isActive || isActiveNav('/Admin') 
                            ? "text-amber-600 border-amber-600 font-medium" 
                            : "border-transparent hover:border-amber-200"
                        }`
                      }
                    >
                      Admin
                    </NavLink>
                  </li>
                )}
                {token && authUser?.isArtist && (
                  <li className="hover:text-amber-600 transition-colors duration-200">
                    <NavLink 
                      to="/Artist"
                      className={({ isActive }) => 
                        `pb-1 border-b-2 transition-colors duration-200 ${
                          isActive || isActiveNav('/Artist')
                            ? "text-amber-600 border-amber-600 font-medium" 
                            : "border-transparent hover:border-amber-200"
                        }`
                      }
                    >
                      Sell Art
                    </NavLink>
                  </li>
                )}
                <li className="hover:text-amber-600 transition-colors duration-200">
                  <NavLink 
                    to="/"
                    className={({ isActive }) => 
                      `pb-1 border-b-2 transition-colors duration-200 ${
                        isActive && location.pathname === '/'
                          ? "text-amber-600 border-amber-600 font-medium" 
                          : "border-transparent hover:border-amber-200"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="hover:text-amber-600 transition-colors duration-200">
                  <NavLink 
                    to="/Painting"
                    className={({ isActive }) => 
                      `pb-1 border-b-2 transition-colors duration-200 ${
                        isActive || isActiveNav('/Painting')
                          ? "text-amber-600 border-amber-600 font-medium" 
                          : "border-transparent hover:border-amber-200"
                      }`
                    }
                  >
                    Painting
                  </NavLink>
                </li>
                <li className="hover:text-amber-600 transition-colors duration-200">
                  <NavLink 
                    to="/AboutUs"
                    className={({ isActive }) => 
                      `pb-1 border-b-2 transition-colors duration-200 ${
                        isActive || isActiveNav('/AboutUs')
                          ? "text-amber-600 border-amber-600 font-medium" 
                          : "border-transparent hover:border-amber-200"
                      }`
                    }
                  >
                    About Us
                  </NavLink>
                </li>
                <li className="hover:text-amber-600 transition-colors duration-200">
                  <NavLink 
                    to="/Contacts"
                    className={({ isActive }) => 
                      `pb-1 border-b-2 transition-colors duration-200 ${
                        isActive || isActiveNav('/Contacts')
                          ? "text-amber-600 border-amber-600 font-medium" 
                          : "border-transparent hover:border-amber-200"
                      }`
                    }
                  >
                    Contacts
                  </NavLink>
                </li>
              </ul>

              {/* Auth & User Actions */}
              <ul className="hidden md:flex space-x-4 font-sans text-base cursor-pointer font-medium text-gray-800">
                {token === "" && (
                  <li className="hover:text-amber-600 transition-colors duration-200">
                    <NavLink 
                      to="/Login"
                      className={({ isActive }) => 
                        `px-4 py-2 rounded-sm border transition-colors duration-200 ${
                          isActive || isActiveNav('/Login')
                            ? "bg-amber-600 text-white border-amber-600" 
                            : "border-gray-300 hover:border-amber-600 hover:text-amber-600"
                        }`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                )}
                {token && (
                  <>
                    <li
                      className="hover:text-amber-600 transition-colors duration-200 p-2 rounded-sm hover:bg-gray-100"
                      onClick={() => {
                        navigate("/favoutires");
                      }}
                    >
                      <CiHeart className="w-5 h-6" />
                    </li>
                    <li
                      className="hover:text-amber-600 transition-colors duration-200 relative p-2 rounded-sm hover:bg-gray-100"
                      onClick={() => {
                        navigate("/Cart");
                      }}
                    >
                      <BsCart3 className="w-5 h-6" />
                      {cartDetails?.arts?.length > 0 ? (
                        <span className="absolute -top-1 -right-1 bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                          {cartDetails?.arts?.length}
                        </span>
                      ) : (
                        <span className="absolute -top-1 -right-1 bg-gray-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                          0
                        </span>
                      )}
                    </li>
                    <li
                      className="hover:text-amber-600 transition-colors duration-200 p-2 rounded-sm hover:bg-gray-100 relative"
                      onClick={() => {
                        dispatch(
                          setHeaderMenuOpen({ headerMenuOpen: !headerMenuOpen })
                        );
                      }}
                    >
                      <AiOutlineUser className="w-5 h-6" />
                      {headerMenuOpen && (
                        <div className="absolute top-full right-0 w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45 translate-y-[-1px]"></div>
                      )}
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