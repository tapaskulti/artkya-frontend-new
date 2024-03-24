import { useState, useEffect } from "react";
import Header from "../../components/Header";
import ArtistHeader from "./ArtistHeader";
import ArtWorkManager from "./ArtWorkManager";
import SalesDashboard from "./SalesDashboard";
import AddressManagement from "./Addresh/AddressManagement";
import ProfileInformation from "./Profile/ProfileInformation"
const ArtistMainPage = () => {
  const [activeTab, setActiveTab] = useState("Manage Artworks");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  useEffect(() => {
    console.log("ArtistMainPage tabName------", activeTab);
  }, [activeTab]);
  return (
    <>
      <div className="">
        <Header />
        <div className="mt-10 lg:flex ">
          <div className="w-full py-24 lg:py-5 ">
            <div className="">
              <ArtistHeader
                activeTab={activeTab}
                handleTabClick={handleTabClick}
              />
              {activeTab === "Manage Artworks" && <ArtWorkManager />}
              {activeTab === "Sales Dashboard" && <SalesDashboard />}
              {activeTab === "Manage Artworks" && <ArtWorkManager />}
              {activeTab === "Addresses" && <AddressManagement />}
              {activeTab === "Profile Information" && <ProfileInformation />}
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default ArtistMainPage;
