import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <div className="">
        <Header />
        <div className="mt-10 lg:flex ">
          {/* about phauzdar and banner */}

          <div className="w-full py-24 lg:py-5 ">
            <div className="">
              <div className="pb-5 text-3xl font-normal text-left text-gray-400">
                About <span className="text-black">Artkya</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
