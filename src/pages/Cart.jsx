import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { TiLockClosed } from "react-icons/ti";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Cart = () => {
  const { cartDetails } = useSelector((state) => state.cart);
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "GET_CART_BY_ID",
      payload: authUser?._id,
    });
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between py-6 mx-5 md:mx-10 md:flex md:justify-between hover:text-primary">
          <div className="flex items-center justify-center md:justify-start">
            <Link to="/">
              <img src={logo} className="h-6 " alt="Artkya Logo" />
            </Link>
          </div>
        </div>
      </div>
      {/* *************************************************** */}
      <div className="my-10">
        <div className="flex justify-center px-64 py-10 space-x-6">
          <div className="w-2/5 bg-gray-50 dark:bg-gray-800 p-4">
            <div className="text-4xl font-semibold text-gray-900 dark:text-white">Cart</div>
            {cartDetails?.arts?.length === 0 ? (
              <div className="flex flex-col items-center space-y-5">
                <HiOutlineShoppingCart className="text-[16rem] text-slate-300 dark:text-gray-600" />
                <h1 className="text-xl text-gray-900 dark:text-white">Your Cart Is Empty</h1>
                <Link
                  to="/Painting"
                  className={`flex cursor-pointer w-72 bg-black dark:bg-gray-700 text-white font-semibold justify-center items-center py-4 text-2xl hover:bg-gray-800 dark:hover:bg-gray-600`}
                >
                  Browse Art
                </Link>
              </div>
            ) : (
              <>
                {cartDetails?.arts?.map((singleArt) => {
                  return (
                    <div className="space-y-3" key={singleArt?._id}>
                      <div className="bg-white dark:bg-gray-700 border-t-2 border-gray-200 dark:border-gray-600 flex p-3">
                        <div className="w-[30%]">
                          <img src={singleArt?.thumbnail?.secure_url} alt="" />
                        </div>
                        <div className="w-[70%] px-3 space-y-1">
                          <div className="flex justify-between">
                            <div>
                              <h1 className="text-base italic text-gray-900 dark:text-white">
                                {singleArt?.title}
                              </h1>
                              <h1 className="text-sm text-gray-700 dark:text-gray-300">Soo Beng Lim</h1>
                              <h1 className="text-xs text-gray-600 dark:text-gray-400">{singleArt?.subject}</h1>
                            </div>
                            <button
                              className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white font-semibold rounded-full h-6 p-2 flex items-center hover:bg-gray-400 dark:hover:bg-gray-500"
                              onClick={() => {
                                dispatch({
                                  type: "REMOVE_ART_FROM_CART",
                                  payload: {
                                    userId: authUser?._id,
                                    artId: singleArt?._id,
                                    artPrice: parseInt(singleArt?.priceDetails?.price),
                                  },
                                });                                
                              }}
                            >
                              X
                            </button>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                            <h1>Shipping</h1>
                            <h1>Included</h1>
                          </div>
                          <div className="flex justify-between text-sm font-semibold text-gray-900 dark:text-white">
                            <h1>Artwork Total</h1>
                            <h1>{singleArt?.price}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          {/* ************************************************************************************************************** */}
          <div className="w-1/3 bg-gray-50 dark:bg-gray-800 p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex text-xl justify-between font-semibold text-gray-900 dark:text-white">
                <h1>Estimated Total</h1>
                <h1>₹{cartDetails?.totalPrice}</h1>
              </div>
              <h1 className="text-gray-700 dark:text-gray-300">
                All charges and refunds will be made in USD ($106,615) and may
                be subject to exchange rate fluctuations.
              </h1>
              <Link to="/ShippingBilling">
                <button className="flex w-full bg-[#80bc30] hover:bg-[#89c043] dark:bg-green-600 dark:hover:bg-green-500 text-white text-xl font-semibold mt-5 px-10 py-4 justify-center">
                  Checkout
                </button>
              </Link>
            </div>
            {/* ************************************************************************************************************** */}
            <div>
              <CartCardComponent
                icon={<FaStar />}
                mainText={"Thousands Of Five-Star Reviews"}
                subText={
                  "We deliver world-class customer service to all of our art buyers."
                }
              />
              <CartCardComponent
                icon={<IoShieldCheckmarkSharp />}
                mainText={"Satisfaction Guaranteed"}
                subText={
                  "Our 14-day satisfaction guarantee allows you to buy with confidence."
                }
              />
              <CartCardComponent
                icon={<AiFillDollarCircle />}
                mainText={"Safe & Secure Shopping"}
                subText={
                  "All payments and transactions are secure and encrypted."
                }
              />
              <CartCardComponent
                icon={<TiLockClosed />}
                mainText={"Support An Artist With Every Purchase"}
                subText={
                  "We pay our artists more on every sale than other galleries."
                }
              />
            </div>
            {/* ************************************************************************************************************** */}
            <div className="text-xl text-gray-900 dark:text-white">Need More Help?</div>
            {/* ************************************************************************************************************** */}
            <div className="flex space-x-3">
              <Link
                className={`flex cursor-pointer w-64 text-black dark:text-white justify-center items-center py-2 text-base border border-black dark:border-white text-center hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                Enjoy Complimentary Advisory
              </Link>

              <Link
                className={`flex cursor-pointer w-64 text-black dark:text-white justify-center items-center py-2 text-l border border-black dark:border-white text-center hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                Contact customer Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

export const CartCardComponent = ({ icon, mainText, subText }) => {
  return (
    <div className="">
      <div className="flex caret-lime-400 px-4 space-x-6 py-3 items-center">
        <div className="text-4xl text-gray-700 dark:text-gray-300">{icon}</div>
        <div>
          <h1 className="text-lg text-gray-900 dark:text-white">{mainText}</h1>
          <h1 className="text-sm text-gray-600 dark:text-gray-400">{subText}</h1>
        </div>
      </div>
    </div>
  );
};