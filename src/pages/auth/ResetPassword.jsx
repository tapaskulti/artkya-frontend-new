import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OpenLock from "../../assets/open_lock.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [forgotPasswordTokenValid, setForgotPasswordTokenValid] =
    useState(false);
  const [userName, setUserName] = useState("");
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const [isPasswordVisible2, setisPasswordVisible2] = useState(false);
  const REACT_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // const validateToken = async () => {
  //   const response = await axios.get(
  //     `${REACT_URL}/user/checkToken?token=${token}`
  //   );
  //   console.log("Response from validateToken------>", response);
  //   if (response.status === 200) {
  //     setForgotPasswordTokenValid(true);
  //     setUserName(response?.data?.userName);
  //   }
  // };

  // console.log("reset token.................>", token);
  // console.log(
  //   "forgotPasswordTokenValid.................>",
  //   forgotPasswordTokenValid
  // );

  useEffect(() => {
    validateToken();
  }, []);

  // useEffect(() => {
  //   validateToken();
  // }, [token]);

  // const resetPassword = async (e) => {
  //   e.preventDefault()
  //   if (forgotPasswordTokenValid === true) {
  //     if (password !== confirmPassword) {
  //       toast.warning("Password and Confirm password does not match!");
  //     } else {
  //       setloading(true);
  //       const response = await axios.post(
  //         `${REACT_URL}/user/resetPassword?token=${token}&userName=${userName}`,
  //         {password:password}
  //       );

  //       console.log("Response from Reset Password------>", response);

  //       if (response?.status === 200) {
  //         setloading(false);
  //         toast.success(response.data.message);
  //         navigate("/login");
  //         setForgotPasswordTokenValid(false);
  //       } else {
  //         setloading(false);
  //         toast.success(response.data.message);
  //       }
  //     }
  //   } else {
  //     // navigate(`${REACT_URL}/user/forgotPassword`);
  //     console.log("NOT VALID");
  //   }
  // };

  return (
    <div>
      <Header className="bg-black header fixed z-10" />
      <div className="overflow-y-auto scrollbar pt-20">
        <div className="bg-gradient-to-r from-[#e54000] via-[#f16a01] to-[#fe9700] py-32">
          <div className="px-32 md:px-20 lg:px-52 xl:px-64 2xl:px-96 3xl:px-[460px]">
            <div className="bg-black flex rounded-lg">
              <div className="border-r border-[#161616] w-1/2 justify-center hidden md:flex">
                <div className="rounded-full bg-[#0F0F0F] border border-[#2F2F2F] w-[230px] h-[230px] my-20 flex justify-center items-center">
                  <img src={OpenLock} alt="" className="w-[130px] h-[150px]" />
                </div>
              </div>
              <div className="w-full md:w-1/2 py-10">
                <div className=" h-full mx-8 md:mx-10 lg:mx-12 lg:px-2 3xl:px-6 3xl:py-8">
                  <h1 className="text-white text-center my-2 lg:my-4 text-lg md:text-[16px] lg:text-lg">
                    Reset Your Password
                  </h1>
                  <div>
                    <form onSubmit={resetPassword}>
                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="absolute top-7 left-4"
                        />
                        <input
                          placeholder="Enter password"
                          className="rounded-full pl-10 pr-4 py-3 text-sm my-4 w-full"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          type={isPasswordVisible ? "text" : "password"}
                        />
                        <div className="absolute top-6 right-3">
                          {!isPasswordVisible ? (
                            <FontAwesomeIcon
                              className="cursor-pointer"
                              icon={faEyeSlash}
                              onClick={() => {
                                setisPasswordVisible(!isPasswordVisible);
                              }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              className="cursor-pointer"
                              icon={faEye}
                              onClick={() => {
                                setisPasswordVisible(!isPasswordVisible);
                              }}
                            />
                          )}
                        </div>
                      </div>

                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faLock}
                          className="absolute top-3 left-4"
                        />
                        <input
                          placeholder="Enter confirm password"
                          className="w-full rounded-full pl-10 pr-4 py-3 text-sm mb-4 "
                          type={isPasswordVisible2 ? "text" : "password"}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="absolute top-3 right-3">
                          {!isPasswordVisible2 ? (
                            <FontAwesomeIcon
                              className="cursor-pointer"
                              icon={faEyeSlash}
                              onClick={() => {
                                setisPasswordVisible2(!isPasswordVisible2);
                              }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              className="cursor-pointer"
                              icon={faEye}
                              onClick={() => {
                                setisPasswordVisible2(!isPasswordVisible2);
                              }}
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <button
                          type="submit"
                          onClick={resetPassword}
                          className="bg-grad rounded-full px-4 py-2 text-lg text-center uppercase font-semibold w-full"
                        >
                          {loading ? "Resetting..." : "RESET"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ResetPassword;
