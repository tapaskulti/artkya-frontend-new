import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  CheckCircleIcon,
  CreditCardIcon,
  MapPinIcon,
  TruckIcon,
} from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData, paymentResult } = location.state || {};

  useEffect(() => {
    if (!orderData) {
      navigate("/");
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            No order data found
          </h1>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-500 mt-4 inline-block"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link to="/" className="text-blue-600 hover:text-blue-500">
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been confirmed and will
            be processed soon.
          </p>
        </div>

        {/* Order Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Payment Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <CreditCardIcon className="h-6 w-6 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold">Payment Confirmed</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-mono text-xs">
                  {paymentResult?.paymentId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Method:</span>
                <span className="capitalize">{orderData.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-semibold">
                  {orderData.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">₹{orderData.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <TruckIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold">Shipping Details</h3>
            </div>
            <div className="text-sm">
              <div className="font-semibold mb-1">
                {orderData.shippingAddress.firstName}{" "}
                {orderData.shippingAddress.lastName}
              </div>
              <div className="text-gray-600 space-y-1">
                <div>{orderData.shippingAddress.address1}</div>
                {orderData.shippingAddress.address2 && (
                  <div>{orderData.shippingAddress.address2}</div>
                )}
                <div>
                  {orderData.shippingAddress.city},{" "}
                  {orderData.shippingAddress.state}{" "}
                  {orderData.shippingAddress.postalCode}
                </div>
                <div>{orderData.shippingAddress.country}</div>
                <div className="mt-2">
                  <div>📧 {orderData.shippingAddress.Email}</div>
                  <div>📱 {orderData.shippingAddress.PhoneNumber}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <MapPinIcon className="h-6 w-6 text-purple-500 mr-2" />
              <h3 className="text-lg font-semibold">Order Info</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Type:</span>
                <span className="capitalize">{orderData.orderType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span>
                  {orderData.totalItems} item
                  {orderData.totalItems > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span>{formatDate(new Date())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="text-green-600">5-7 business days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Address (if different) */}
        {!orderData.sameAsShipping && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
            <div className="text-sm text-gray-600">
              <div className="font-semibold mb-1">
                {orderData.billingAddress.firstName}{" "}
                {orderData.billingAddress.lastName}
              </div>
              <div className="space-y-1">
                <div>{orderData.billingAddress.address1}</div>
                {orderData.billingAddress.address2 && (
                  <div>{orderData.billingAddress.address2}</div>
                )}
                <div>
                  {orderData.billingAddress.city},{" "}
                  {orderData.billingAddress.state}{" "}
                  {orderData.billingAddress.postalCode}
                </div>
                <div>{orderData.billingAddress.country}</div>
              </div>
            </div>
          </div>
        )}

        {/* Purchased Items */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">
            Items Purchased ({orderData.artIds.length})
          </h3>
          <div className="space-y-4">
            {orderData.artIds.map((art, index) => (
              <div
                key={art._id || index}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <img
                    src={art.thumbnail?.secure_url || "/placeholder-art.jpg"}
                    alt={art.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-gray-900">{art.title}</h4>
                  <p className="text-sm text-gray-600">by Soo Beng Lim</p>
                  <p className="text-xs text-gray-500">{art.subject}</p>
                  <div className="mt-2">
                    <span className="text-sm text-gray-600">Price: </span>
                    <span className="font-semibold">{art.price}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-600 font-semibold">
                    ✓ Confirmed
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Shipping Included
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            What happens next?
          </h3>
          <div className="space-y-3 text-sm text-blue-800">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                1
              </div>
              <div>
                <div className="font-semibold">Order Processing</div>
                <div>{`We'll prepare your artwork for shipping within 1-2 business days.`}</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                2
              </div>
              <div>
                <div className="font-semibold">Quality Check</div>
                <div>
                  Each piece is carefully inspected and professionally packaged.
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                3
              </div>
              <div>
                <div className="font-semibold">Shipment & Tracking</div>
                <div>{`You'll receive tracking information once your order ships.`}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/orders"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Track Your Orders
          </Link>
          <Link
            to="/painting"
            className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-8 p-6 bg-gray-100 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
          <p className="text-sm text-gray-600 mb-4">
            Our customer support team is here to assist you with any questions
            about your order.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-500 text-sm font-semibold"
            >
              Contact Support
            </Link>
            <span className="hidden sm:inline text-gray-400">•</span>
            <Link
              to="/faq"
              className="text-blue-600 hover:text-blue-500 text-sm font-semibold"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
