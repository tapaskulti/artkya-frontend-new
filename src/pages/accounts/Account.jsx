import { useState } from "react";
import Header from "../../components/Header";
import AccountUserInformation from "./AccountUserInformation";
import OfferDashboard from "./OfferDashboard";
import Order from "./Order";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [ActiveTab, setActiveTab] = useState("Account_Info");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const{authUser} = useSelector((state)=>state.auth)
  const handleLogOut=()=>{
    // console.log("logout")
    dispatch({
      type:"LOGOUT_SAGA",
      payload:{
        email:authUser?.email,
        body:{
          navigate:navigate
        }
      }
    })
  }
  return (
    <div className="static">
      <Header />
      {/* ******************************************************** */}
      <div className="mt-14 px-60">
        <div className=" flex flex-1 space-x-[5%]">
          {/* SIDEBAR */}
          <div className="w-[30%] space-y-4">
            <div>
              <AccountButtons
                title={"Account Information"}
                onClick={() => {
                  setActiveTab("Account_Info");
                }}
                isCondition={ActiveTab === "Account_Info" ? true : false}
              />
            </div>
            <div>
              <AccountButtons
                title={"Offers Dashboard"}
                onClick={() => {
                  setActiveTab("Offer_Dashboard");
                }}
                isCondition={ActiveTab === "Offer_Dashboard" ? true : false}
              />
            </div>
            <div>
              <AccountButtons
                title={"Orders"}
                onClick={() => {
                  setActiveTab("Orders");
                }}
                isCondition={ActiveTab === "Orders" ? true : false}
              />
            </div>

            <div>
              <AccountButtons
                title={"Logout"}
                onClick={() => {handleLogOut()}}
                isCondition={ActiveTab === "Logout" ? true : false}
              />
            </div>
          </div>
          {/* BODY */}
          <div className="w-[65%]">
            {ActiveTab === "Account_Info" && (
              <>
                <AccountUserInformation />
              </>
            )}
            {ActiveTab === "Offer_Dashboard" && (
              <>
                <OfferDashboard />
              </>
            )}

            {ActiveTab === "Orders" && (
              <>
                <Order />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

// eslint-disable-next-line react/prop-types
export const AccountButtons = ({ title, onClick, isCondition }) => {
  return (
    <div
      className={`flex cursor-pointer w-full ${
        isCondition ? "bg-black text-white" : "bg-slate-200 text-black"
      }  font-semibold justify-center items-center py-4 text-2xl ${
        isCondition === false ? "hover:bg-slate-300" : ""
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
