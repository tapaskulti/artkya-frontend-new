import React, { useEffect, useState } from "react";
import { Textarea, Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

const ProfileInformation = () => {
  const { authUser } = useSelector((state) => state.auth);
  const { artistDetails } = useSelector((state) => state.artist);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    aboutMe: artistDetails?.aboutMe,
    education: artistDetails?.education,
    events: artistDetails?.events,
    exibition: artistDetails?.exibition,
    customUrl: artistDetails?.customUrl,
    country:artistDetails?.country,
    state: artistDetails?.state,
    city: artistDetails?.city,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // console.log("formData",formData)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle saving the form data here
    console.log(formData); // For demonstration, you can replace this with your save logic

    dispatch({
      type: "UPDATE_ARTIST_PROFILE",
      payload: {
        artistId: authUser?._id,
        body: formData,
      },
    });
  };

  return (
    <div className="px-64">
      <div className="text-2xl py-10">PROFILE INFORMATION</div>
      <div className="border-2 border-gray-300 px-60 mb-20">
        <div className="grid grid-cols-1 gap-4 py-8">
          <div className="form-group">
            <Textarea
              label="About Me"
              // placeholder="About Me"
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <Textarea
              label="Education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="input py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <Textarea
              label="Events"
              name="events"
              value={formData.events}
              onChange={handleChange}
              className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <Textarea
              label="exibition"
              name="exibition"
              value={formData.exibition}
              onChange={handleChange}
              className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <Input
              type="text"
              label="Profile Custom URL"
              name="customUrl"
              value={formData.customUrl}
              onChange={handleChange}
              className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <Input
              type="text"
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <Input
              type="text"
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <Input
              type="text"
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <Button className=" py-3 text-base" onClick={handleSubmit}>
            Save
          </Button>
          {/* <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Save
          </button> */}
        </div>
        {/* <div className="py-8">
          <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit}>
              
            </form>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileInformation;
