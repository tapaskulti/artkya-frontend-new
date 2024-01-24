import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import Lock from "../../assets/lock.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [mail, setMail] = useState("");

  const REACT_URL = import.meta.env.VITE_BASE_URL;

  const sendEmail = async (e) => {
    e.preventDefault()
    toast.loading("Sending email...");
    const response = await axios.post(`${REACT_URL}/user/forgotPassword`, {
      userName: mail,
    });
    console.log(response);
    console.log(response?.response?.status);

    if (response.data.success) {
      toast.dismiss();
      toast.success(
        "Email sent successfully. Check your mail for further process."
      );
    } else {
      toast.warning("Email not found.");
    }
  };

  return (
    <div>
      <Header className="bg-black header fixed" />
      <div className="overflow-y-auto scrollbar pt-20">
        <div className="py-32">
          <div className="px-32 md:px-20 lg:px-52 xl:px-64 2xl:px-96 3xl:px-[460px]">
            <div className="flex rounded-lg">
              {/* <div className="border-r border-[#161616] w-1/2 justify-center hidden md:flex ">
                <div className="rounded-full bg-[#0F0F0F] border border-[#2F2F2F] w-[230px] h-[230px] my-20 flex justify-center items-center">
                  <img src={Lock} alt="" className="w-[130px] h-[150px]" />
                </div>
              </div> */}
              <div className="w-full md:w-1/2 py-10">
                <div className=" h-full mx-8 md:mx-10 lg:mx-12 lg:px-2 3xl:px-6 3xl:py-8">
                  <h1 className="text-white text-center my-2 lg:my-4 text-lg md:text-[16px] lg:text-lg ">
                    Forgot Password?
                  </h1>
                  <div className="flex justify-center my-2 px-3">
                    <h1 className="text-[#595959] text-left text-[12px] 2xl:text-sm">
                      Please enter your registered email address <br />
                      You will recieve a link to create a new password via email
                    </h1>
                  </div>

                  <form>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="absolute top-7 left-4"
                      />
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        className="rounded-full pl-10 pr-4 py-3 text-sm my-4 w-full"
                        onChange={(e) => {
                          setMail(e.target.value);
                        }}
                      />
                    </div>

                    <div className="flex justify-center ">
                      <button
                        type="submit"
                        className="bg-grad rounded-full px-4 py-2 text-lg font-semibold w-full"
                        onClick={sendEmail}
                      >
                        SEND
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default ForgetPassword;
