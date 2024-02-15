import { useState } from "react";
import Header from "../../components/Header";
import ArtistHeader from "./ArtistHeader"
import ArtWorkManager from "./ArtWorkManager"
const ArtistMainPage = () => {
  const [activeTab, setActiveTab] = useState("Manage Artworks");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <>
      <div className="">
        <Header />
        <div className="mt-10 lg:flex ">
          <div className="w-full py-24 lg:py-5 ">
            <div className="">
            <ArtistHeader activeTab={activeTab} handleTabClick={handleTabClick} />
              {activeTab === "Manage Artworks" && <ArtWorkManager />}
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default ArtistMainPage;
