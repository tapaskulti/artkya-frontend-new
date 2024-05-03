import React, { useState } from "react";
import AddEditAddress from "./AddEditAddress";
import ListAddress from "./ListAddress";

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAddress = (addressData) => {
    setAddresses([...addresses, addressData]);
    setIsModalOpen(false); // Close the modal after adding address
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Address Management</h2>
    
      <ListAddress addresses={addresses} />
      {isModalOpen && (
        <AddEditAddress
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddAddress}
        />
      )}
        <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-4"
      >
        Add Address
      </button>
    </div>
  );
};

export default AddressManagement;
