import Header from "../../components/Header";
// import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../assets/LoginImage.jpg";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  // const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [companyId, setCompanyId] = useState("");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (token) {
  //     navigate("/", { replace: true });
  //   } else {
  //     navigate("/login", { replace: true });
  //   }
  // }, [token]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const loginPayload = { companyId, email, password };
  //   // console.log("LOGIN PAGE", loginPayload);
  //   dispatch({
  //     type: "LOGIN",
  //     payload: {
  //       body: loginPayload,
  //       navigate,
  //     },
  //   });
  // };

  return (
    <div>
      <Header className="bg-black header fixed z-10" />
      <div className="overflow-y-auto scrollbar pt-20">
        <div className="px-32 md:px-20 lg:px-52 xl:px-64 2xl:px-96 3xl:px-[480px]">
          <div className="bg-white border border-slate-500 flex rounded-lg">
            <div className=" w-1/2 justify-start hidden md:flex border-r border-[#161616]">
              <img
                  src={LoginImage}
                  alt=""
                  className="w-full h-auto text-left"
                />
            </div>
            <div className="w-full md:w-1/2 py-12 md:py-10 2xl:py-14 3xl:py-16">
              <div className=" h-full mx-8 md:mx-8 lg:mx-12 lg:px-2 3xl:px-6 3xl:py-8">
                <h1 className="text-white text-center my-2 lg:my-4 text-lg md:text-[16px] lg:text-lg">
                  Welcome to Logo!
                </h1>
                <h1 className="text-white text-center my-2 lg:my-4 text-lg md:text-[16px] lg:text-lg">
                  Login to your account
                </h1>
                <form>
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="absolute top-8 left-4 text-slate-400"
                    />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className=" w-full border border-slate-300 rounded-md pl-10 pr-4 py-3 text-sm my-4"
                      // onChange={(e) => {
                      //   setEmail(e.target.value);
                      // }}
                    />
                  </div>

                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="absolute top-3.5 left-4"
                    />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      className="w-full border border-slate-300 rounded-md pl-10 pr-4 py-3 text-sm mb-4"
                      // onChange={(e) => {
                      //   setPassword(e.target.value);
                      // }}
                    />
                  </div>

                  <div className="">
                    <button
                      type="submit"
                      className="w-full bg-slate-900 rounded-md px-4 py-2 text-lg font-semibold text-white"
                      // onClick={(e) => handleSubmit(e)}
                    >
                      LOGIN
                    </button>
                    <h2>OR</h2>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center bg-blue-900 rounded-md px-4 py-2 text-lg font-semibold text-white"
                      // onClick={(e) => handleSubmit(e)}
                    >
                      <FontAwesomeIcon icon={faFacebookF} className="font-thin" />
                      <h2>LOGIN</h2>
                    </button>
                  </div>
                  <Link to="/forgotpassword">
                    <h1 className="text-[#FE9401] text-left mt-1">
                      Forgot Password?
                    </h1>
                  </Link>
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
