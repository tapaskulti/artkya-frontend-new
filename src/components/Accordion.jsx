/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const Accordion = ({ element, onCheckChange, name }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <div className="py-2">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full"
      >
        <span>{element[0]?.title}</span>
        {/* {accordionOpen ? <span>-</span> : <span>+</span>} */}
        <svg
          className="fill-slate-500 shrink-0 ml-8 mt-1.5"
          width="12"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="12"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="12"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {element[0]?.element?.map((singleElement, index) => {
            return (
              <div key={index}>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="border border-slate-50"
                    name={name}
                    value={singleElement}
                    onChange={onCheckChange}
                  ></input>
                  <div className="my-0.5">{singleElement}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Accordion;

export const AccordionContinue = () => {
  const { cartDetails } = useSelector((state) => state.cart);
  return (
    <div>
      <div className="collapse collapse-arrow bg-white/90 border-b border-t border-slate-200 rounded-none my-2">
        <input type="radio" name="my-accordion-2"/>
        <div className="collapse collapse-title text-base font-medium">
          Your Cart
        </div>
        <div className="collapse-content">
        {cartDetails?.arts?.map((singleArt) => {
                  return (
                    <div className="space-y-3" key={singleArt?._id}>
                      <div className=" bg-white border-t-2 flex p-3">
                        <div className="w-[30%]">
                          <img src={singleArt?.thumbnail?.secure_url} alt="" />
                        </div>
                        <div className="w-[70%] px-3 space-y-1">
                          <div className="flex justify-between">
                            <div>
                              <h1 className="text-base italic">
                                {singleArt?.title}
                              </h1>
                              <h1 className=" text-sm">Soo Beng Lim</h1>
                              <h1 className=" text-xs">{singleArt?.subject}</h1>
                            </div>
                            <button
                              className="bg-gray-300 text-white font-semibold rounded-full h-6 p-2 flex items-center"
                              onClick={() => {
                                dispatch({
                                  type: "REMOVE_ART_FROM_CART",
                                  payload: {
                                    userId: authUser?._id,
                                    artId: singleArt?._id,
                                    artPrice: singleArt?.price,
                                  },
                                });
                              }}
                            >
                              X
                            </button>
                          </div>
                          <div className="flex justify-between text-xs">
                            <h1>Shipping</h1>
                            <h1>Included</h1>
                          </div>
                          <div className="flex justify-between text-sm font-semibold">
                            <h1>Artwork Total</h1>
                            <h1>{singleArt?.price}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
        </div>
      </div>
      <div className="collapse collapse-arrow bg-white/90 border-b border-t border-slate-200 rounded-none my-2">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-base font-medium">
          Shipping Address
        </div>
        <div className="collapse-content">
          <div className="space-y-5">
            <div className="flex items-center space-x-5">
              <input type="text" placeholder="First Name*" className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1" />
              <input type="text" placeholder="Last Name*" className="w-full border border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1" />
            </div>
            <input type="text" placeholder="Address1*" className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1" />
            <input type="text" placeholder="Address2" className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1" />
            <div className="flex items-center space-x-5">
              <input type="text" placeholder="Country*" className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1" />
              <input type="text" placeholder="City*" className="w-full border border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1" />
            </div>
            <div className="flex items-center space-x-5">
              <input type="text" placeholder="State/Region*" className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1" />
              <input type="text" placeholder="Zip/Postal Code*" className="w-full border border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1" />
            </div>
            <div className="flex items-center space-x-5">
              <input type="text" placeholder="Email*" className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1" />
              <input type="text" placeholder="Phone Number*" className="w-full border border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1" />
            </div>
          </div>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-white/90 border-b border-t border-slate-200 rounded-none my-2">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-base font-medium">
          Payment Method
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
    </div>
  );
};
