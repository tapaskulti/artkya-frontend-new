/* eslint-disable react/jsx-no-duplicate-props */
import Header from "../../components/Header";
// import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../assets/LoginImage.jpg";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import googleIcon from "../../assets/google-icon.png";

const Login = () => {
  const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isPasswordVisible, setisPasswordVisible] = useState(false);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (token) {
  //     navigate("/", { replace: true });
  //   } else {
  //     navigate("/login", { replace: true });
  //   }
  // }, [token]);

  const handleLogin = (e) => {
    e.preventDefault();
    const loginPayload = {
      email: userLogin?.email,
      password: userLogin?.password,
    };

    dispatch({
      type: "LOGIN",
      payload: {
        body: loginPayload,
        navigate,
      },
    });
  };

  return (
    <div>
      <Header className="fixed z-10 bg-black header" />
      <div className="py-20 overflow-y-auto scrollbar">
        <div className="px-32 pt-10 md:px-20 lg:px-52 xl:px-64 2xl:px-96 3xl:px-[480px]">
          <div className="flex bg-white border rounded-lg border-slate-500">
            <div className="justify-start hidden w-1/2 md:flex">
              <img
                src={LoginImage}
                alt=""
                className="w-full h-auto text-left"
              />
            </div>
            <div className="w-full py-12 md:w-1/2 md:py-10 2xl:py-14 3xl:py-16">
              <div className="h-full mr-8 md:mr-8 lg:mr-12 lg:px-2 3xl:px-6 3xl:py-8">
                <h1 className="root text-slate-800 text-left text-2xl md:text-[16px] lg:text-3xl">
                  Welcome back to Logo!
                </h1>
                <h1 className="text-slate-600 text-left text-lg md:text-[16px] lg:text-lg -mt-1">
                  Login to your account
                </h1>
                <form className="mt-5">
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
                      value={userLogin.email}
                      onChange={(e) => {
                        setUserLogin({ ...userLogin, email: e.target.value });
                      }}
                    />
                  </div>

                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="absolute top-8 left-4 text-slate-400"
                    />
                    <input
                      // type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      className="w-full border border-slate-300 rounded-md pl-10 pr-4 py-3.5 text-sm mt-4 active:bg-transparent focus:outline-none"
                      value={userLogin.password}
                      onChange={(e) => {
                        setUserLogin({
                          ...userLogin,
                          password: e.target.value,
                        });
                      }}
                      type={isPasswordVisible ? "text" : "password"}
                    />
                    <div className="absolute top-7 right-3">
                      {!isPasswordVisible ? (
                        <FontAwesomeIcon
                          className="cursor-pointer text-slate-400"
                          icon={faEye}
                          onClick={() => {
                            setisPasswordVisible(!isPasswordVisible);
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="cursor-pointer text-slate-400"
                          icon={faEyeSlash}
                          onClick={() => {
                            setisPasswordVisible(!isPasswordVisible);
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <Link to="/forgotpassword">
                    <h1 className="mt-1 text-base text-right text-black">
                      Forgot Password?
                    </h1>
                  </Link>

                  <div className="mt-5">
                    <button
                      type="submit"
                      className="w-full bg-black rounded-md px-4 py-2.5 text-lg font-semibold text-white"
                      onClick={handleLogin}
                    >
                      LOGIN
                    </button>
                    <h2 className="py-3 font-bold text-center">OR</h2>
                    <button
                      type="submit"
                      className="w-full flex items-center space-x-2 justify-center bg-blue-900 rounded-md px-4 py-2.5 text-lg font-semibold text-white"
                      // onClick={(e) => handleSubmit(e)}
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="w-6 h-5 text-base font-thin"
                      />
                      <h2>Login with Facebook</h2>
                    </button>
                    <h2 className="py-3 font-bold text-center">OR</h2>
                    <button
                      type="submit"
                      className="w-full flex items-center space-x-2 justify-center bg-white border border-slate-300 rounded-md px-4 py-2.5 text-lg font-semibold text-white"
                      // onClick={(e) => handleSubmit(e)}
                    >
                      <img src={googleIcon} alt="" className="w-5 h-5" />
                      <h2 className="text-black">Login with Google</h2>
                    </button>
                  </div>
                  <h1 className="mt-6 text-base text-center text-black">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-semibold text-underline"
                    >
                      Register.
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

export default Login;
