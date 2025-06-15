/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { TiLockClosed } from "react-icons/ti";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AccordionContinue } from "../components/Accordion";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { setAllCart } from "../redux/app/cart/cartSlice";

const Cart = () => {
  const { cartDetails } = useSelector((state) => state.cart);
  const { authUser } = useSelector((state) => state.auth);
  const { shippingAddress, billingAddress, sameAsShipping } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Payment states
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentToken, setPaymentToken] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const squareConfig = {
    applicationId: import.meta.env.VITE_BASE_SQUARE_APP_ID,
    locationId: import.meta.env.VITE_APP_SQUARE_LOCATION_ID,
  };

  // Validate addresses before payment
  const validateAddresses = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "address1",
      "country",
      "city",
      "state",
      "postalCode",
      "Email",
      "PhoneNumber",
    ];

    // Check shipping address
    const shippingValid = requiredFields.every(
      (field) =>
        shippingAddress[field] &&
        shippingAddress[field].toString().trim() !== ""
    );

    if (!shippingValid) {
      alert("Please complete all required shipping address fields");
      return false;
    }

    // Check billing address if not same as shipping
    if (!sameAsShipping) {
      const billingValid = requiredFields.every(
        (field) =>
          billingAddress[field] &&
          billingAddress[field].toString().trim() !== ""
      );

      if (!billingValid) {
        alert("Please complete all required billing address fields");
        return false;
      }
    }

    return true;
  };

  // Process payment function
  const processPayment = async (sourceId, amount) => {
    try {
      setIsProcessingPayment(true);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/pay/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sourceId: sourceId,
            amount: Math.round(amount * 100), // Convert to cents for Square
            currency: "USD",
            billingAddress: sameAsShipping ? shippingAddress : billingAddress,
          }),
        }
      );

      const result = await response.json();
      console.log("Payment result:", result);

      if (result.success) {
        // Create order after successful payment
        const orderData = {
          buyerId: authUser?._id,
          artIds: cartDetails?.arts || [],
          shippingAddress: shippingAddress,
          billingAddress: sameAsShipping ? shippingAddress : billingAddress,
          sameAsShipping: sameAsShipping,
          totalAmount: cartDetails?.totalPrice || 0,
          totalItems: cartDetails?.arts?.length || 0,
          paymentId: result.paymentId,
          paymentMethod: "square",
          paymentStatus: result.status,
          orderType: "original",
        };

        // Dispatch create order action
        dispatch({
          type: "CREATE_ORDER_BY_ID",
          payload: {
            body: orderData,
          },
        });

        // Clear cart after successful order
        dispatch({
          type: "CLEAR_CART",
          payload: {
            userId: authUser?._id,
          },
        });

        dispatch(setAllCart({ cartDetails: {} }))
        
        // Redirect to success page with order data
        navigate("/order-success", {
          state: {
            orderData,
            paymentResult: result,
          },
        });
      } else {
        alert(`Payment failed: ${result.message || "Unknown error"}`);
        console.error("Payment errors:", result.errors);
      }

      return result;
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Payment processing failed. Please try again.");
      throw error;
    } finally {
      setIsProcessingPayment(false);
      setShowPaymentForm(false);
    }
  };

  // Handle payment token received from Square
  const handlePaymentTokenReceived = async (token, buyer) => {
    console.log("Payment token received:", { token, buyer });
    setPaymentToken(token);

    // Process payment immediately when token is received
    await processPayment(token.token, cartDetails?.totalPrice || 0);
  };

  // Handle place order click
  const handlePlaceOrder = () => {
    if (!cartDetails?.arts?.length) {
      alert("Your cart is empty!");
      return;
    }

    if (!authUser) {
      alert("Please login to place order");
      return;
    }

    // Validate addresses before proceeding
    if (!validateAddresses()) {
      return;
    }

    // Show payment form
    setShowPaymentForm(true);
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className=" bg-white text-black">
        <div className="flex items-center justify-between py-6 mx-5 md:mx-10 md:flex md:justify-between hover:text-primary">
          <div className="flex items-center justify-center md:justify-start bg-white">
            <Link to="/">
              {/* <img src={logo} className="h-6 " alt="Artkya Logo" /> */}
            </Link>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Complete Payment</h2>
              <button
                onClick={() => setShowPaymentForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                disabled={isProcessingPayment}
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount:</span>
                <span>${cartDetails?.totalPrice}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Payment will be processed in USD
              </p>
            </div>

            {/* Address Summary */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
              <div className="font-semibold mb-2">Shipping to:</div>
              <div>
                {shippingAddress.firstName} {shippingAddress.lastName}
                <br />
                {shippingAddress.address1}
                <br />
                {shippingAddress.address2 && (
                  <>
                    {shippingAddress.address2}
                    <br />
                  </>
                )}
                {shippingAddress.city}, {shippingAddress.state}{" "}
                {shippingAddress.postalCode}
                <br />
                {shippingAddress.country}
              </div>
            </div>

            <PaymentForm
              applicationId={squareConfig.applicationId}
              cardTokenizeResponseReceived={handlePaymentTokenReceived}
              locationId={squareConfig.locationId}
            >
              <CreditCard />
            </PaymentForm>

            {isProcessingPayment && (
              <div className="mt-4 text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#80bc30]"></div>
                <p className="mt-2 text-sm text-gray-600">
                  Processing payment and creating order...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="my-10 bg-white min-h-screen">
        <div className="flex justify-center px-4 md:px-64 py-10 space-x-0 md:space-x-16 flex-col md:flex-row">
          <div className="w-full md:w-2/5 bg-slate-50 p-4 mb-6 md:mb-0">
            <div className="text-4xl font-semibold">Checkout</div>
            <div>
              <AccordionContinue />
            </div>
            <div className="mx-4">
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessingPayment || !cartDetails?.arts?.length}
                className={`flex w-full text-white text-xl font-semibold mt-5 px-10 py-4 justify-center ${
                  isProcessingPayment || !cartDetails?.arts?.length
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#80bc30] hover:bg-[#89c043]"
                }`}
              >
                {isProcessingPayment ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-slate-50 p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex text-xl justify-between font-semibold">
                <h1>Estimated Total</h1>
                <h1>₹{cartDetails?.totalPrice}</h1>
              </div>
              <h1 className="text-sm text-gray-600">
                All charges and refunds will be made in USD and may be subject
                to exchange rate fluctuations.
              </h1>
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessingPayment || !cartDetails?.arts?.length}
                className={`flex w-full text-white text-xl font-semibold mt-5 px-10 py-4 justify-center ${
                  isProcessingPayment || !cartDetails?.arts?.length
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#80bc30] hover:bg-[#89c043]"
                }`}
              >
                {isProcessingPayment ? "Processing..." : "Place Order"}
              </button>
            </div>

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

            <div className="text-xl">Need More Help?</div>

            <div className="flex space-x-3 flex-col md:flex-row">
              <Link className="flex cursor-pointer w-full md:w-64 text-black justify-center items-center py-2 text-base border border-black text-center mb-2 md:mb-0">
                Enjoy Complimentary Advisory
              </Link>

              <Link className="flex cursor-pointer w-full md:w-64 text-black justify-center items-center py-2 text-base border border-black text-center">
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
