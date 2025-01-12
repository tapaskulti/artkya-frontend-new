import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
// import { Heart, InfoIcon } from "lucide-react";

const PrintArtCheckout = () => {
  const { artDetail, printPrice } = useSelector((state) => state.art);
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-semibold text-center mb-8">Checkout</h1>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Product Details Section */}
        <div className="bg-white px-6 pt-6 rounded-lg shadow-sm">
          <div className="relative">
            <div className="relative  overflow-hidden rounded-lg mb-6 ">
              <img
                src={artDetail?.thumbnail?.secure_url}
                alt="Product Image"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {artDetail?.title}
                </h2>
                <p className="text-base text-gray-600">
                  {`${artDetail?.category} , ${artDetail?.subject}`}
                </p>
                <p className="text-base text-gray-600">
                  {`${artDetail?.year}`}
                </p>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-2xl font-semibold">${printPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Details Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Customer Details</h2>
          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your address"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Number
                </label>
                <input
                  id="contact"
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your contact number"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Product Price</span>
                <span>${printPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">Sales Tax</span>
                  <IoInformationCircleOutline className="w-4 h-4 text-gray-400" />
                </div>
                <span>$0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                <span>Total Price</span>
                <span>${printPrice}</span>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="text-sm text-gray-600">Secure Payment</div>
              <div className="space-y-4">
                <input
                  placeholder="Card number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    placeholder="CVV"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                Complete Purchase
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrintArtCheckout;
