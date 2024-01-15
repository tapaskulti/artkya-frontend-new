import { useState } from "react";
import logo from "../assets/logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [dropDownOpen, setdropDownOpen] = useState(false);
  return (
    <>
      <div className="items-center w-full scroll ">
        <div className={`${dropDownOpen ? "visible" : "hidden"}`}>
          <div
            className={`h-full  bg-gray-100 absolute w-52 z-10 ease-in-out transition delay-150   ${
              dropDownOpen
                ? " duration-500  z-20 translate-x-0 scale-100"
                : "duration-300 ease-out translate-x-0 "
            } `}
          >
            <ul className="md:flex font-sans text-base space-y-2 cursor-pointer text-[#000000] p-5">
              <li className="hover:text-amber-800 ">
                <NavLink to="/">Artworks</NavLink>
              </li>
              <li className="hover:text-amber-800 ">
                <NavLink to="/Album">Album</NavLink>
              </li>
              <li className="hover:text-amber-800 ">
                <NavLink to="/Contact">Contact</NavLink>
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
        <div className="bg-slate-50">
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
                <img src={logo} className="h-6 " alt="Artkya Logo" />
              </Link>
            </div>
            <ul className="hidden md:flex space-x-10 font-sans text-base cursor-pointer  text-[#000000] ">
              <li className="hover:text-amber-800 ">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-black " : ""
                  }
                  to="/"
                >
                  Artworks
                </NavLink>
              </li>
              <li className="hover:text-amber-800 ">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-black " : ""
                  }
                  to="/Album"
                >
                  Album
                </NavLink>
              </li>
              <li className="hover:text-amber-800 ">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-black " : ""
                  }
                  to="/Contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
