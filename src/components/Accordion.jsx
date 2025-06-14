/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import paypal from "../assets/paypal-logo.png";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { toast } from "react-toastify";
import SquareLogoPoweredBy from "../assets/powered-by-square-logo.png";

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
                  <div className="my-0.5 cursor-pointer">{singleElement}</div>
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


export const SecondAccordion = ({ element, onCheckChange, name }) => {
  const [accordionOpen, setAccordionOpen] = useState(true); // Accordion starts open
  const [showAll, setShowAll] = useState(false); // Controls 'Show More' functionality

  // Split the elements into two parts: first 5 elements and the rest
  const firstFiveElements = element[0]?.element?.slice(0, 6);
  const remainingElements = element[0]?.element?.slice(5);

  return (
    <div className="py-2">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full"
      >
        <span>{element[0]?.title}</span>
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
          {firstFiveElements?.map((singleElement, index) => (
            <div key={index}>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="border border-slate-50"
                  name={name}
                  value={singleElement}
                  onChange={onCheckChange}
                />
                <div className="my-0.5 cursor-pointer">{singleElement}</div>
              </div>
            </div>
          ))}

          {/* Display remaining elements if 'showAll' is true */}
          {showAll &&
            remainingElements?.map((singleElement, index) => (
              <div key={index + 5}>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="border border-slate-50"
                    name={name}
                    value={singleElement}
                    onChange={onCheckChange}
                  />
                  <div className="my-0.5 cursor-pointer">{singleElement}</div>
                </div>
              </div>
            ))}

          {/* Show 'Show More' button only if there are more than 5 elements */}
          {remainingElements?.length > 0 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-700 mt-2 focus:outline-none"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const AccordionContinue = ({ onAddressUpdate }) => {
  const dispatch = useDispatch();
  const { cartDetails } = useSelector((state) => state.cart);
  const { authUser } = useSelector((state) => state.auth);
  const [showSavedAddress, setShowSavedAddress] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(undefined);
  const [sameAsBilling, setSameAsBilling] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
    Email: "",
    PhoneNumber: "",
  });
  
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
    Email: "",
    PhoneNumber: "",
  });

  const handleSaveShippingAddress = () => {
    dispatch({
      type: "ADD_SHIPPING_ADDRESS",
      payload: {
        userId: authUser?._id,
        body: {
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          address1: shippingAddress.address1,
          address2: shippingAddress.address2,
          country: shippingAddress.country,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postalCode: shippingAddress.postalCode,
          Email: shippingAddress.Email,
          PhoneNumber: shippingAddress.PhoneNumber,
        },
      },
    });
    setShowSavedAddress(true);
    
    // Update parent component with addresses
    if (onAddressUpdate) {
      onAddressUpdate({
        shipping: shippingAddress,
        billing: sameAsBilling ? shippingAddress : billingAddress
      });
    }
  };

  const handleBillingAddressChange = (field, value) => {
    setBillingAddress(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Update parent component
    if (onAddressUpdate) {
      onAddressUpdate({
        shipping: shippingAddress,
        billing: sameAsBilling ? shippingAddress : { ...billingAddress, [field]: value }
      });
    }
  };

  const handleSameAsBillingChange = (checked) => {
    setSameAsBilling(checked);
    
    if (checked) {
      setBillingAddress(shippingAddress);
    }
    
    // Update parent component
    if (onAddressUpdate) {
      onAddressUpdate({
        shipping: shippingAddress,
        billing: checked ? shippingAddress : billingAddress
      });
    }
  };

  return (
    <div className="bg-white">
      <div className="collapse collapse-arrow bg-white border-b border-t border-slate-200 rounded-none my-2">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-base font-medium bg-white text-black">
          Your Cart
        </div>
        <div className="collapse-content bg-white">
          {cartDetails?.arts?.map((singleArt) => {
            return (
              <div className="space-y-3 bg-white" key={singleArt?._id}>
                <div className="bg-white border-t-2 flex p-3">
                  <div className="w-[30%]">
                    <img src={singleArt?.thumbnail?.secure_url} alt="" />
                  </div>
                  <div className="w-[70%] px-3 space-y-1">
                    <div className="flex justify-between">
                      <div>
                        <h1 className="text-base italic text-black">{singleArt?.title}</h1>
                        <h1 className="text-sm text-black">Soo Beng Lim</h1>
                        <h1 className="text-xs text-black">{singleArt?.subject}</h1>
                      </div>
                      <button
                        className="bg-gray-300 text-white font-semibold rounded-full h-6 p-2 flex items-center"
                        onClick={() => {
                          dispatch({
                            type: "REMOVE_ART_FROM_CART",
                            payload: {
                              userId: authUser?._id,
                              artId: singleArt?._id,
                              artPrice: singleArt?.totalPrice,
                            },
                          });
                        }}
                      >
                        X
                      </button>
                    </div>
                    <div className="flex justify-between text-xs">
                      <h1 className="text-black">Shipping</h1>
                      <h1 className="text-black">Included</h1>
                    </div>
                    <div className="flex justify-between text-sm font-semibold">
                      <h1 className="text-black">Artwork Total</h1>
                      <h1 className="text-black">{singleArt?.price}</h1>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="collapse collapse-arrow bg-white border-b border-t border-slate-200 rounded-none my-2">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-base font-medium bg-white text-black">
          Shipping Address
        </div>
        <div className="collapse-content bg-white">
          <div className="flex text-sm pr-5 my-4 text-black">
            Kolkata Station Road
            <br />
            Kolkata, West Bengal 700004
          </div>
          {!showSavedAddress ? (
            <>
              <div className="space-y-5">
                <div className="flex items-center space-x-5">
                  <input
                    type="text"
                    placeholder="First Name*"
                    className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={shippingAddress.firstName}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        firstName: e.target.value,
                      });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name*"
                    className="w-full border border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={shippingAddress.lastName}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address1*"
                  className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                  value={shippingAddress.address1}
                  onChange={(e) => {
                    setShippingAddress({
                      ...shippingAddress,
                      address1: e.target.value,
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder="Address2"
                  className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                  value={shippingAddress.address2}
                  onChange={(e) => {
                    setShippingAddress({
                      ...shippingAddress,
                      address2: e.target.value,
                    });
                  }}
                />
                <div className="flex items-center space-x-5">
                  <input
                    type="text"
                    placeholder="Country*"
                    className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={shippingAddress.country}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        country: e.target.value,
                      });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="City*"
                    className="w-full border border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={shippingAddress.city}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <input
                    type="text"
                    placeholder="State/Region*"
                    className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={shippingAddress.state}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        state: e.target.value,
                      });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Zip/Postal Code*"
                    className="w-full border border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={shippingAddress.postalCode}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        postalCode: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <input
                    type="text"
                    placeholder="Email*"
                    className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={shippingAddress.Email}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        Email: e.target.value,
                      });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Phone Number*"
                    className="w-full border border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={shippingAddress.PhoneNumber}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        PhoneNumber: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="space-y-3">
                  <button
                    className="flex w-full bg-slate-800 hover:bg-slate-700 text-white text-xl font-semibold mt-5 px-10 py-4 justify-center"
                    onClick={handleSaveShippingAddress}
                  >
                    Add Shipping Address
                  </button>

                  <div
                    className="flex justify-center text-sm cursor-pointer text-black"
                    onClick={() => setShowSavedAddress(true)}
                  >
                    Cancel
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {!authUser?.shippingAddress?.length === 0 ? (
                <>
                  <h1 className="flex justify-center text-black">No Saved Address</h1>
                </>
              ) : (
                <>
                  {authUser?.shippingAddress?.map((singleeAddress) => {
                    return (
                      <div key={singleeAddress._id}>
                        <div className="mt-5 space-y-1">
                          <div className="flex items-start relative">
                            <input
                              type="checkbox"
                              className="w-[5%] mt-1.5"
                              onClick={(e) => {
                                console.log(e.target.checked);
                              }}
                            />
                            <div className="w-[75%] px-3 text-sm text-black">
                              <div>
                                <span>
                                  {` ${
                                    singleeAddress?.firstName
                                      ? singleeAddress?.firstName
                                      : ""
                                  } 
                                  ${
                                    singleeAddress?.lastName
                                      ? singleeAddress?.lastName
                                      : ""
                                  }`}
                                </span>
                              </div>

                              <div>
                                <div>
                                  {singleeAddress?.address1
                                    ? singleeAddress?.address1
                                    : ""}
                                </div>
                                <div>
                                  {singleeAddress?.address2
                                    ? singleeAddress?.address2
                                    : ""}
                                </div>
                                <div>{singleeAddress?.city}</div>
                              </div>

                              <div className="flex space-x-1">
                                <div>{singleeAddress?.state}</div>
                                <div> {singleeAddress?.postalCode}</div>
                                <div>{singleeAddress?.country} </div>
                              </div>

                              <div>{singleeAddress?.PhoneNumber}</div>
                            </div>
                            <h2 className="text-slate-900 text-base hover:no-underline underline cursor-pointer">
                              Delete
                            </h2>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

              <div
                className="flex justify-center text-sm mt-3 cursor-pointer text-black"
                onClick={() => setShowSavedAddress(false)}
              >
                Add New Address
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="collapse collapse-arrow bg-white border-b border-t border-slate-200 rounded-none my-2">
        <input type="radio" name="my-accordion-2" className="" />
        <div className="collapse-title text-base font-medium bg-white text-black">
          Billing Address
        </div>
        <div className="collapse-content bg-white">
          <div className="space-y-5">
            <div className="flex space-x-3 items-center">
              <input 
                type="checkbox" 
                checked={sameAsBilling}
                onChange={(e) => handleSameAsBillingChange(e.target.checked)}
              />
              <h2 className="text-base text-black">Same as shipping address</h2>
            </div>
            
            {!sameAsBilling && (
              <div className="space-y-5">
                <div className="flex items-center space-x-5">
                  <input
                    type="text"
                    placeholder="First Name*"
                    className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={billingAddress.firstName}
                    onChange={(e) => handleBillingAddressChange('firstName', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name*"
                    className="w-full border border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={billingAddress.lastName}
                    onChange={(e) => handleBillingAddressChange('lastName', e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address1*"
                  className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                  value={billingAddress.address1}
                  onChange={(e) => handleBillingAddressChange('address1', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Address2"
                  className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                  value={billingAddress.address2}
                  onChange={(e) => handleBillingAddressChange('address2', e.target.value)}
                />
                <div className="flex items-center space-x-5">
                  <input
                    type="text"
                    placeholder="Country*"
                    className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={billingAddress.country}
                    onChange={(e) => handleBillingAddressChange('country', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="City*"
                    className="w-full border border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={billingAddress.city}
                    onChange={(e) => handleBillingAddressChange('city', e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <input
                    type="text"
                    placeholder="State/Region*"
                    className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={billingAddress.state}
                    onChange={(e) => handleBillingAddressChange('state', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Zip/Postal Code*"
                    className="w-full border border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={billingAddress.postalCode}
                    onChange={(e) => handleBillingAddressChange('postalCode', e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-5">
                  <input
                    type="text"
                    placeholder="Email*"
                    className="w-full border text-slate-400 border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={billingAddress.Email}
                    onChange={(e) => handleBillingAddressChange('Email', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Phone Number*"
                    className="w-full border border-slate-200 rounded-md px-3 py-3 focus:border-none focus:outline-slate-400 focus:outline-1 bg-white"
                    value={billingAddress.PhoneNumber}
                    onChange={(e) => handleBillingAddressChange('PhoneNumber', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
