import Header from "../../components/Header";
import ArtistHeader from "./ArtistHeader"
const ArtistMainPage = () => {
  // const navigate = useNavigate();

  return (
    <>
      <div className="">
        <Header />
        <div className="mt-10 lg:flex ">
          <div className="w-full py-24 lg:py-5 ">
            <div className="">
             <ArtistHeader/>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default ArtistMainPage;
