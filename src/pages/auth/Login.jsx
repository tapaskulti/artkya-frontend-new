import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyId, setCompanyId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginPayload = { companyId, email, password };
    // console.log("LOGIN PAGE", loginPayload);
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
      <Header className="bg-black header fixed z-10" />
      <div className="overflow-y-auto scrollbar pt-20">
        <div className="bg-gradient-to-r from-[#e54000] via-[#f16a01] to-[#fe9700] py-32">
          <div className="px-32 md:px-20 lg:px-52 xl:px-64 2xl:px-96 3xl:px-[480px]">
            <div className="bg-black flex rounded-lg">
              <div className=" w-1/2 justify-start hidden md:flex border-r border-[#161616]">
                <img
                  src={LoginImage}
                  alt=""
                  className="w-full h-auto text-left"
                />
              </div>
              <div className="w-full md:w-1/2 py-12 md:py-10 2xl:py-14 3xl:py-16">
                <div className=" h-full mx-8 md:mx-8 lg:mx-12 lg:px-2  3xl:px-6 3xl:py-8">
                  <h1 className="text-white text-center my-2 lg:my-4 text-lg md:text-[16px] lg:text-lg">
                    Login to your account
                  </h1>
                  <form>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faBuilding}
                        className="absolute top-3 left-4"
                      />
                      <input
                        type="text"
                        name="companyId"
                        id="companyId"
                        value={companyId}
                        placeholder="Enter your Company ID"
                        className="rounded-full pl-10 pr-4 py-3 text-sm w-full"
                        onChange={(e) => {
                          setCompanyId(e.target.value);
                        }}
                      />
                    </div>

                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="absolute top-7 left-4"
                      />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your username"
                        className="rounded-full pl-10 pr-4 py-3 text-sm my-4 w-full"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>

                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="absolute top-3 left-4"
                      />
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full rounded-full pl-10 pr-4 py-3 text-sm mb-4"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>

                    <div className="flex justify-center ">
                      <button
                        type="submit"
                        className="bg-grad rounded-full px-4 py-2 text-lg font-semibold w-full"
                        onClick={(e) => handleSubmit(e)}
                      >
                        LOGIN
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
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
