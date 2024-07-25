import React from "react";

const AddressCard = ({ address, onDelete, onEdit }) => {
  const handleDelete = () => {
    onDelete(address.id); // Assuming each address has a unique id
  };

  const handleEdit = () => {
    onEdit(address); // Pass the address object to the edit function
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{`${address.firstName} ${address.lastName}`}</h2>
      <p>{`${address.address1}, ${address.address2}`}</p>
      <p>{`${address.city}, ${address.state}, ${address.postalCode}`}</p>
      <p>{`${address.country}`}</p>
      <div className="mt-4 ">
        <button onClick={handleEdit} className="btn bg-blue-500">
          <u>
          Edit
          </u>
        </button>
        </div>
        <div className="mt-1">
        <button onClick={handleDelete} className="btn btn-danger">
          <u>
          Delete
          </u>
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
