import React, { useState } from "react";

const AddEditAddress = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      country: "",
      city: "",
      state: "",
      postalCode: "",
    });
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 opacity-50"></div>
        <div className="bg-white rounded-md overflow-hidden shadow-lg w-full max-w-lg relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mt-4 mr-4 modal-close cursor-pointer"
          >
            <svg
              className="w-6 h-6 fill-current text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
            >
              <path d="M6.41 6.41a.75.75 0 011.06 0L9 7.94l1.53-1.53a.75.75 0 111.06 1.06L10.06 9l1.53 1.53a.75.75 0 11-1.06 1.06L9 10.06l-1.53 1.53a.75.75 0 01-1.06-1.06L7.94 9 6.41 7.47a.75.75 0 010-1.06z"></path>
            </svg>
          </button>
          <div className="p-6">
            <div className="pb-3">
              <p className="text-2xl font-bold">Add New Address</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="input px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="input px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  placeholder="Address"
                  className="input px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  placeholder="Address 2"
                  className="input px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Select a Country"
                  className="input px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="input px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="input px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Zip / Postal Code"
                  className="input px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="btn bg-blue-500 text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditAddress;
