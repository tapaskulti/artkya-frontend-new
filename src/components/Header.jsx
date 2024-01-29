import { useState } from "react";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHeart,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { faOpencart } from "@fortawesome/free-brands-svg-icons";
import { AiOutlineUser } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Select from "react-select";

const Header = () => {
  // const {token, user} = useSelector((state) => state.user);
  const [dropDownOpen, setdropDownOpen] = useState(false);
  const options = [
    { value: "art", label: "Art" },
    { value: "artist", label: "Artist" },
  ];
  return (
    <>
      <div className="items-center w-full scroll ">
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
            <div className="flex items-center space-x-24">
              <ul className="hidden md:flex space-x-10 font-sans text-base cursor-pointer  text-[#000000] ">
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
                <li className="hover:text-amber-800 ">
                  <NavLink className="border-black" to="/Login">
                    Login
                  </NavLink>
                </li>
                <span>|</span>
                <li className="hover:text-amber-800 ">
                  <NavLink className="border-black" to="/Register">
                    Register
                  </NavLink>
                </li>
                <li className="hover:text-amber-800">
                  <CiHeart className="w-5 h-6" />
                </li>
                <li className="hover:text-amber-800 ">
                  <IoBagHandleOutline className="w-5 h-6" />
                </li>
                <li className="hover:text-amber-800 ">
                  <AiOutlineUser className="w-5 h-6" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-end px-10 py-2 border-b border-slate-200">
          <div className=" flex items-center">
          <Select
              options={options}
              className="rounded-none absolute -right-6 w-32 px-3 py-1.5 focus:outline-none focus:border-slate-300"
            />
          <input type="text" className="relative border border-l-transparent border-slate-300 py-1.5" />
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
