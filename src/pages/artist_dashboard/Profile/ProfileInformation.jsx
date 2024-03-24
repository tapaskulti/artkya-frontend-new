import React, { useState } from "react";

const ProfileInformation = () => {
  const [formData, setFormData] = useState({
    aboutMe: "",
    education: "",
    events: "",
    exhibitions: "",
    customUrl: "",
    country: "",
    state: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle saving the form data here
    console.log(formData); // For demonstration, you can replace this with your save logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="form-group">
              <textarea
                placeholder="About Me"
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleChange}
                className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Events"
                name="events"
                value={formData.events}
                onChange={handleChange}
                className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Exhibitions"
                name="exhibitions"
                value={formData.exhibitions}
                onChange={handleChange}
                className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Profile Custom URL"
                name="customUrl"
                value={formData.customUrl}
                onChange={handleChange}
                className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInformation;
