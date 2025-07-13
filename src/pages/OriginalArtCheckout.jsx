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
    description: "", // Added optional description field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare data for email API
      const orderData = {
        fullName: formData.fullName,
        address: formData.address,
        contactNumber: formData.contactNumber,
        contactEmail: formData.contactEmail,
        description: formData.description,
        artworkTitle: artDetail?.title,
        artworkImage: artDetail?.thumbnail?.secure_url,
        artworkId: artDetail?._id,
      };

      // Call your email API
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/send_order_details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      console.log("response",response)
      if (response.ok) {
        alert("Order details sent successfully!");
        // Optionally redirect or reset form
        setFormData({
          fullName: "",
          address: "",
          contactNumber: "",
          contactEmail: "",
          description: "",
        });
      } else {
        throw new Error("Failed to send order details");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send order details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                  className="text-gray-700 block text-sm font-medium mb-1"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="bg-white border-gray-300 text-gray-800 w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="bg-white border-gray-300 text-gray-800 w-full p-3 border rounded-md min-h-[100px] focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your complete address"
                />
              </div>

              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className="bg-white border-gray-300 text-gray-800 w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your contact number"
                />
              </div>

              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  className="bg-white border-gray-300 text-gray-800 w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email address"
                />
              </div>

              {/* New Description Field - Optional */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Additional Notes{" "}
                  <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-white border-gray-300 text-gray-800 w-full p-3 border rounded-md min-h-[80px] focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Any special instructions or additional information..."
                />
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-4">
                  Powered by <span className="font-medium">□ Square</span>
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full p-3 rounded-md text-white font-medium transition-colors ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isSubmitting ? "SENDING..." : "SEND DETAILS"}
                </button>
              </div>

              <div className="text-xs text-gray-500 mt-2">
                <span className="text-red-500">*</span> Required fields
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OriginalArtCheckout;
