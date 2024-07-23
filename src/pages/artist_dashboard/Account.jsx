import React from "react";
import { Radio, Input, Button } from "@material-tailwind/react";

const Account = () => {
  return (
    <div className="px-64">
      <div className="text-xl py-10">ACCOUNT</div>
      <div className="border-2 border-gray-300 px-52 py-20 mb-20">
        <div className="text-xs font-bold">WHAT TYPE OF ARTIST ARE YOU?</div>
        <div className="">
          Most artists fall into the individual category. This information is
          needed for legal and tax compliance purposes.
        </div>
        <div className="flex gap-10 py-2">
          <Radio name="type" label="Individual" defaultChecked />
          <Radio name="type" label="Business/Sole Proprietor" />
        </div>
        <div>
          <div className="text-xs font-bold">RESIDENTIAL ADDRESS</div>
          <div className="py-3">
            This should match the address you use to file your taxes.
          </div>
          <div className="px-2 pt-2 pb-10 space-y-8 border-b-2">
            <Input label="Address*" />
            <Input label="Address 2" />
            <div className="flex gap-6">
              <Input label="Country" />
              <Input label="City" />
            </div>
            <div className="flex gap-6">
              <Input label="State/Region" />
              <Input label="Zip/PostalCode" />
            </div>
            <Button color="black" className="w-2/3 py-3 text-base">
              Save
            </Button>
          </div>
          <div className="pt-5">
            <div className="text-xs font-bold">ID VERIFICATION</div>
            <div className="py-3">
              In order to list your artworks for sale we need a digital copy of
              your government issued identification. This will help us ensure
              the integrity of our site and allow us to pay commissions in a
              timely manner.
            </div>
            <div className="pt-5">
              <Button variant="gradient" className="flex items-center gap-3  w-2/3 justify-center py-3 text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload ID
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
