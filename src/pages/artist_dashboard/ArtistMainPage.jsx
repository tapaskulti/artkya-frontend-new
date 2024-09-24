import { useState, useEffect } from "react";
import Header from "../../components/Header";
import ArtistHeader from "./ArtistHeader";
import ArtWorkManager from "./ArtWorkManager";
import SalesDashboard from "./SalesDashboard";
import AddressManagement from "./Addresh/AddressManagement";
import ProfileInformation from "./Profile/ProfileInformation";
import Account from "./Account";
import CuratorNote from "./CuratorNote";
import { useDispatch, useSelector } from "react-redux";
const ArtistMainPage = () => {
  const [activeTab, setActiveTab] = useState("Manage Artworks");
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  useEffect(() => {
    console.log("ArtistMainPage tabName------", activeTab);
  }, [activeTab]);

  useEffect(() => {
    dispatch({
      type: "GET_ARTIST_PROFILE_BY_ID",
      payload: {
        artistId: authUser?._id,
      },
    });
  }, [authUser]);

  return (
    <>
      <div className="overflow-hidden">
        <div className="">
          <Header />
          <ArtistHeader activeTab={activeTab} handleTabClick={handleTabClick} />
        </div>
        <div className="lg:flex">
          <div className="w-full h-screen overflow-y-auto stylish-scrollbar">
            {activeTab === "Manage Artworks" && <ArtWorkManager />}
            {activeTab === "Sales Dashboard" && <SalesDashboard />}
            {activeTab === "Account" && <Account />}
            {activeTab === "Curator Notes" && <CuratorNote />}
            {activeTab === "Addresses" && <AddressManagement />}
            {activeTab === "Profile Information" && <ProfileInformation />}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default ArtistMainPage;
