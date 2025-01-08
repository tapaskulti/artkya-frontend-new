// import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { TiTick } from "react-icons/ti";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import ProductCarousel from "../components/ProductCarousel";
import TextAccordion from "../components/TextAccordion";

const ArtDetailPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({
      type: "ART_DETAIL",
      payload: id,
    });
  }, [id]);

  const [selectedImage, setSelectedImage] = useState();
  const [activeTab, setActiveTab] = useState("original");

  const { artDetail } = useSelector((state) => state.art);

  useEffect(() => {
    if (artDetail) {
      setSelectedImage(artDetail?.thumbnail?.secure_url);
    }
  }, [artDetail]);

  return (
    <div className="w-screen">
      <Header />
      <div className="w-full px-32 py-10">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} className="pb-5 w-7 h-7" />
        </Link>

        <div className="w-full md:flex md:justify-between md:space-x-16">
          {/* image */}
          <div className="space-y-2">
            {artDetail?.art?.map((singleArt) => {
              return (
                <div
                  key={singleArt?.id}
                  onClick={() => {
                    setSelectedImage(singleArt?.secure_url);
                  }}
                >
                  <img
                    src={singleArt?.secure_url}
                    alt=""
                    className="w-16 h-16 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
          <div className="w-1/2">
            <img
              src={selectedImage}
              alt={"here is the text"}
              className="rounded-md shadow-xl md:w-full "
            />
          </div>

          {/* image detail */}
          <div className="w-1/3 text-center bg-slate-50">
            <div className="flex justify-between text-xl font-semibold text-left">
              <button
                onClick={() => setActiveTab("original")}
                className={`${
                  activeTab === "original" ? "bg-gray-400" : ""
                } text-base w-1/2 py-2.5`}
              >
                Original Art
              </button>
              <button
                onClick={() => setActiveTab("print")}
                className={`${
                  activeTab === "print" ? "bg-gray-400" : ""
                } w-1/2 py-2.5 text-base`}
              >
                Print Copy
              </button>
            </div>

            <div className="px-3 mt-5 text-xl font-semibold">
              <div className="text-left">
                <h2 className="text-lg italic text-slate-600">
                  {artDetail?.title}
                </h2>
                {/* <h2 className="text-sm text-red-600">Pranab Phauzdar</h2> */}
                {/* <h2 className="text-sm font-semibold text-gray-700">India</h2> */}
              </div>

              <div className="py-3 space-y-1 text-sm text-left text-gray-700">
                {/* <h2>Painting, Acrylic on Canvas</h2> */}
                <h2>
                  Size:{" "}
                  {`${artDetail?.width} W x ${artDetail?.height} H x ${artDetail?.depth} D cm`}
                </h2>
                <div className="flex items-center space-x-6">
                  {/* <h2 className="text-sm font-semibold text-gray-700">
                    Picture ID: AKP-2024
                  </h2> */}
                  <div className="flex items-center space-x-2">
                    <h2>Year:</h2>
                    <h2> {artDetail?.year}</h2>
                  </div>
                </div>
                {activeTab === "print" && (
                  <>
                    <div className="">
                      <div className="flex items-center space-x-2">
                        <div className="py-5 text-base">Select Size: </div>
                        <Select
                          options={[
                            { label: "8 * 10 inches", value: "8*10 inches" },
                            { label: "16 * 20 inches", value: "16*20 inches" },
                            { label: "20 * 30 inches", value: "20*30 inches" },
                          ]}
                        />
                      </div>
                      <div className="text-2xl text-slate-900 font-thin">
                        Price: USD 280
                      </div>
                    </div>
                  </>
                )}
                <div className="py-4">
                  {activeTab === "original" ? (
                    <>
                      <div className="space-y-2">
                        <div className="text-2xl text-slate-900 font-thin">
                          Price: {artDetail?.priceDetails?.price} USD
                        </div>
                        <button
                          className="w-full bg-black hover:bg-blue-900 text-white py-4"
                          onClick={() => {}}
                        >
                          ADD TO CART
                        </button>

                        <button
                          className="w-full bg-black hover:bg-blue-900 text-white py-4"
                          onClick={() => {
                            navigate(`/artDetailPage/${id}/original`);
                          }}
                        >
                          MAKE AN OFFER
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button className="w-full bg-black hover:bg-blue-900 text-white py-4">
                        BUY PRINT COPY
                      </button>
                    </>
                  )}
                </div>
                {/* <div className="flex items-center justify-between">
                  <button className="w-40 px-5 py-3 text-white bg-slate-800 text-base">
                    Add to Cart
                  </button>
                </div> */}
              </div>
              <div className="flex items-center">
                <TiTick />
                <h2 className="text-sm">Shipping included</h2>
              </div>
              <div className="flex items-center">
                <TiTick />
                <h2 className="text-sm">14-day satisfaction guarantee</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div>
            <h2 className="pl-32 text-xl">More From Richard Kattman</h2>
            <div>
              <ProductCarousel />
            </div>
            <div className="max-w-md mx-auto p-4">
              <TextAccordion
                title="Section 1"
                content={
                  <div>
                    <p>This is the first line of content for section 1.</p>
                    <p>This is the second line of content for section 1.</p>
                    <p>This is the third line of content for section 1.</p>
                  </div>
                }
              />
              <TextAccordion
                title="Section 2"
                content={
                  <div>
                    <p>This is the first line of content for section 2.</p>
                    <p>This is the second line of content for section 2.</p>
                    <p>This is the third line of content for section 2.</p>
                  </div>
                }
              />
              <TextAccordion
                title="Section 3"
                content={
                  <div>
                    <p>This is the first line of content for section 3.</p>
                    <p>This is the second line of content for section 3.</p>
                    <p>This is the third line of content for section 3.</p>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtDetailPage;
