import { useState } from "react";
import Header from "../../components/Header";
import AccountUserInformation from "./AccountUserInformation";
import OfferDashboard from "./OfferDashboard";
import Order from "./Order";

const Account = () => {
  const [ActiveTab, setActiveTab] = useState("Account_Info");
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
            <div
              className={`flex w-full bg-slate-200 text-black font-semibold justify-center items-center py-4 text-2xl hover:bg-black hover:text-white`}
              onClick={() => {}}
            >
              Logout
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
      className={`flex w-full ${
        isCondition ? "bg-black text-white" : "bg-slate-200 text-black"
      }  font-semibold justify-center items-center py-4 text-2xl hover:bg-black hover:text-white`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
