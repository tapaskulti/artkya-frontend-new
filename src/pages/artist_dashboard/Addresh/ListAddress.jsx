import { useState } from "react";
import AddressCard from "./AddressCard";

const ListAddress = ({ onDelete, onEdit }) => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      address2: "Apt 2B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
    },
    {
      id: 2,
      firstName: "John 2",
      lastName: "Doe",
      address1: "123 Main St",
      address2: "Apt 2B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
    },
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {addresses &&
        addresses.map((address) => (
          <div key={address.id} className="">
            <AddressCard
              address={address}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        ))}
    </div>
  );
};

export default ListAddress;
