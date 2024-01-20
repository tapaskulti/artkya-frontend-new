import Header from "../../components/Header";
// import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faBuilding, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../assets/LoginImage.jpg";
import {
  faFacebook,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import googleIcon from "../../assets/google-icon.png";

const Register = () => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.user);
//   const [newUser, setnewUser] = useState({});

//   const handleSignup = () => {
//     const payload = {
//       name: newUser.firstName + " " + newUser.lastName,
//       email: newUser.email,
//       password: newUser.password,
//     };
//     dispatch({
//       type: "SIGNUP",
//       payload: {
//         body: payload,
//       },
//     });
//   };

  return (
    <div>
      <Header className="bg-black header fixed z-10" />
      <div className="overflow-y-auto scrollbar pt-20">
        <div className="px-32 md:px-20 lg:px-52 xl:px-64 2xl:px-96 3xl:px-[480px]">
          <div className="bg-white border border-slate-500 flex rounded-lg">
            <div className=" w-1/2 justify-start hidden md:flex">
              <img
                src={LoginImage}
                alt=""
                className="w-full h-auto text-left"
              />
            </div>
            <div className="w-full md:w-1/2 py-12 md:py-10 2xl:py-14 3xl:py-16">
              <div className=" h-full mr-8 md:mr-8 lg:mr-12 lg:px-2 3xl:px-6 3xl:py-8">
                <h1 className="root text-slate-800 text-left text-2xl md:text-[16px] lg:text-3xl">
                  Welcome to Logo!
                </h1>
                <h1 className="text-slate-600 text-left text-lg md:text-[16px] lg:text-lg -mt-1">
                  Register here
                </h1>
                <form className="mt-5">
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="absolute top-4 left-4 text-slate-400"
                    />
                    <input
                      type="text"
                      name="fname"
                      id="fname"
                      placeholder="Enter your first name"
                      className="w-full border border-slate-300 rounded-md pl-10 pr-4 py-3.5 text-sm active:bg-transparent focus:outline-none"
                    //   onChange={(e) => {
                    //     setnewUser({
                    //       ...newUser,
                    //       firstName: e.target.value,
                    //     });
                    //   }}
                    />
                  </div>

                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="absolute top-8 left-4 text-slate-400"
                    />
                    <input
                      type="text"
                      name="lname"
                      id="lname"
                      placeholder="Enter your last name"
                      className="w-full border border-slate-300 rounded-md pl-10 pr-4 py-3.5 text-sm my-4 active:bg-transparent focus:outline-none"
                    //   onChange={(e) => {
                    //     setnewUser({
                    //       ...newUser,
                    //       lastName: e.target.value,
                    //     });
                    //   }}
                    />
                  </div>

                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="absolute top-4 left-4 text-slate-400"
                    />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="w-full border border-slate-300 rounded-md pl-10 pr-4 py-3.5 text-sm active:bg-transparent focus:outline-none"
                      // onChange={(e) => {
                      //   setEmail(e.target.value);
                      // }}
                    />
                  </div>

                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="absolute top-8 left-4 text-slate-400"
                    />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Create your password"
                      className="w-full border border-slate-300 rounded-md pl-10 pr-4 py-3.5 text-sm mt-4 active:bg-transparent focus:outline-none"
                      // onChange={(e) => {
                      //   setPassword(e.target.value);
                      // }}
                    />
                  </div>

                  <div className="mt-5">
                    <button
                      type="submit"
                      className="w-full bg-slate-900 rounded-md px-4 py-2.5 text-lg font-semibold text-white"
                      // onClick={(e) => handleSubmit(e)}
                    >
                      REGISTER
                    </button>
                    <h2 className="py-3 text-center font-bold">OR</h2>
                    <button
                      type="submit"
                      className="w-full flex items-center space-x-2 justify-center bg-blue-900 rounded-md px-4 py-2.5 text-lg font-semibold text-white"
                      // onClick={(e) => handleSubmit(e)}
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="text-base w-6 h-5 font-thin"
                      />
                      <h2>Login with Facebook</h2>
                    </button>
                    <h2 className="py-3 text-center font-bold">OR</h2>
                    <button
                      type="submit"
                      className="w-full flex items-center space-x-2 justify-center bg-white border border-slate-300 rounded-md px-4 py-2.5 text-lg font-semibold text-white"
                      // onClick={(e) => handleSubmit(e)}
                    >
                      <img src={googleIcon} alt="" className="w-5 h-5" />
                      <h2 className="text-black">Login with Google</h2>
                    </button>
                  </div>
                  <h1 className="text-black text-base text-center mt-6">
                    have an account?{" "}
                    <Link
                      to="/login"
                      className="text-underline font-semibold"
                    >
                      Login
                    </Link>
                  </h1>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Register;
