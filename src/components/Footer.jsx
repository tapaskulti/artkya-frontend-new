import React from "react";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className=" bg-slate-900">
        <div className="flex items-center justify-between py-6 mx-10 md:flex md:justify-between hover:text-primary">
          <div className="">
            <Link to="/">
              <img src={logo} className="h-6 " alt="Phouzdar Logo" />
            </Link>
          </div>
          <div className="md:hidden"></div>
          <ul className="hidden space-x-10 font-sans text-sm cursor-pointer md:flex text-slate-200">
            <li className="hover:text-[#dddddd]">
              <Link to="/">Home01</Link>
            </li>
            <li className="hover:text-[#dddddd]">
              <Link to="/painting">Painting</Link>
            </li>
            <li className="hover:text-[#dddddd]">
              <Link to="/aboutus">About Us</Link>
            </li>
            <li className="hover:text-[#dddddd]">
              <Link to="/Contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-baseline justify-between py-10 mx-5 md:mx-10">
          <div>
            <h2 className="pb-5 text-xl text-slate-200">Contact Us</h2>
            <h2 className="text-sm text-slate-400">
              4425 Fortran Drive,
              <br />
              Suite 112-P,
              <br />
              San Jose, CA 95134
            </h2>
          </div>
          <div className="text-right">
            <h2 className="pb-5 text-xl text-slate-200">Touch With Us</h2>
            <ul className="flex items-center justify-between space-x-2">
              <li className="text-base text-slate-400 hover:text-slate-200">
                <a href="#" alt="Facebook">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </li>
              <li className="text-base text-slate-400 hover:text-slate-200">
                <a href="" alt="Twitter">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="text-base text-slate-400 hover:text-slate-200">
                <a href="" alt="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t-[1px] border-slate-700">
          <div className="py-3 mx-5 sm:flex sm:items-center sm:justify-between md:mx-10">
            <h2 className="text-sm text-slate-400">
              &copy;2025 Artkya.com. All Rights Reserved.
            </h2>
            <div className="flex items-center mt-1 space-x-3 text-sm text-slate-400 md:mt-0">
              <h2>
                <Link to="/Disclaimer">Disclaimer</Link>
              </h2>
              <h2> | </h2>
              <h2>
                <Link to="/TermsAndCondition">Terms of Use</Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
