import { Link } from "react-router-dom";

import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { TiLockClosed } from "react-icons/ti";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AccordionContinue } from "../components/Accordion";

const Cart = () => {
  const { cartDetails } = useSelector((state) => state.cart);
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-100 h-screen">
      <div className="bg-slate-50">
        <div className="flex items-center justify-between py-6 mx-5 md:mx-10 md:flex md:justify-between hover:text-primary">
          <div className="flex items-center justify-center md:justify-start">
            <Link to="/">
              {/* <img src={logo} className="h-6 " alt="Artkya Logo" /> */}
            </Link>
          </div>
        </div>
      </div>
      {/* *************************************************** */}
      <div className="my-10">
        <div className="flex justify-center px-64 py-10 space-x-16">
          <div className="w-2/5 bg-slate-50  p-4">
            <div className="text-4xl font-semibold">Checkout</div>
            <div>
              <AccordionContinue className="block" />
            </div>
            <div className="mx-4">
              <Link to="/ShippingBilling">
                <button className="flex w-full bg-[#80bc30] hover:bg-[#89c043] text-white text-xl font-semibold mt-5 px-10 py-4 justify-center">
                  Place Order
                </button>
              </Link>
            </div>
          </div>
          {/* ************************************************************************************************************** */}
          <div className="w-1/3 bg-slate-50 p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex text-xl justify-between font-semibold">
                <h1>Estimated Total</h1>
                <h1>₹{cartDetails?.totalPrice}</h1>
              </div>
              <h1>
                All charges and refunds will be made in USD ($106,615) and may
                be subject to exchange rate fluctuations.
              </h1>
              <Link to="/paymentPage">
                <button className="flex w-full bg-[#80bc30] hover:bg-[#89c043] text-white text-xl font-semibold mt-5 px-10 py-4 justify-center">
                  Place Order
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
            <div className="text-xl">Need More Help?</div>
            {/* ************************************************************************************************************** */}
            <div className="flex space-x-3">
              <Link
                className={`flex cursor-pointer w-64  text-black justify-center items-center py-2 text-base border border-black text-center `}
              >
                Enjoy Complimentary Advisory
              </Link>

              <Link
                className={`flex cursor-pointer w-64  text-black justify-center items-center py-2 text-l border border-black text-center`}
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
        <div className="text-4xl">{icon}</div>
        <div>
          <h1 className="text-lg">{mainText}</h1>
          <h1 className="text-sm">{subText}</h1>
        </div>
      </div>
    </div>
  );
};
