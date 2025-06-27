import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OriginalArtCheckout = () => {
  const { artDetail } = useSelector((state) => state.art);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    contactNumber: "",
    contactEmail: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <FaArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          <h1 className="text-2xl font-semibold text-center">Checkout</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <img
              src={artDetail?.thumbnail?.secure_url}
              alt="Artwork"
              width={400}
              height={400}
              className="rounded-lg shadow-sm"
            />
            <div>
              <p className="text-gray-600">Product Name</p>
              <p className="font-medium">{artDetail?.title}</p>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Customer Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="text-gray-700 block text-sm font-medium  mb-1"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="bg-gray-100 border-gray-800 text-gray-800 w-full p-2 border rounded"
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
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="bg-gray-100 border-gray-800 text-gray-800 w-full p-2 border rounded min-h-[100px]"
                />
              </div>

              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Number
                </label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className="bg-gray-100 border-gray-800 text-gray-800 w-full p-2 border rounded"
                />
              </div>

              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Email
                </label>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  className="bg-gray-100 border-gray-800 text-gray-800 w-full p-2 border rounded"
                />
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-4">
                  Powered by <span className="font-medium">□ Square</span>
                </p>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                >
                  SEND DETAILS
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OriginalArtCheckout;
