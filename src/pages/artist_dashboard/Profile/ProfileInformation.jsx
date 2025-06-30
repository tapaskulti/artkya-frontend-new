import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Save, User, MapPin, Globe, Calendar } from 'lucide-react';

const ProfileInformation = () => {
  const { authUser } = useSelector((state) => state.auth);
  const { artistDetails } = useSelector((state) => state.artist);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    aboutMe: artistDetails?.aboutMe || '',
    education: artistDetails?.education || '',
    events: artistDetails?.events || '',
    exibition: artistDetails?.exibition || '',
    customUrl: artistDetails?.customUrl || '',
    country: artistDetails?.country || '',
    state: artistDetails?.state || '',
    city: artistDetails?.city || '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Update form data when artistDetails changes
  useEffect(() => {
    if (artistDetails) {
      setFormData({
        aboutMe: artistDetails.aboutMe || '',
        education: artistDetails.education || '',
        events: artistDetails.events || '',
        exibition: artistDetails.exibition || '',
        customUrl: artistDetails.customUrl || '',
        country: artistDetails.country || '',
        state: artistDetails.state || '',
        city: artistDetails.city || '',
      });
    }
  }, [artistDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Profile data:', formData);
      
      // Dispatch the Redux action
      dispatch({
        type: "UPDATE_ARTIST_PROFILE",
        payload: {
          artistId: authUser?._id,
          body: formData,
        },
      });
      
      // You might want to handle success/error states from Redux store
      // For now, we'll use a timeout to simulate the async operation
      setTimeout(() => {
        setIsLoading(false);
        // You can add success notification here
      }, 1000);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsLoading(false);
      // Handle error state
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">PROFILE INFORMATION</h2>
          <p className="text-gray-600 mt-2">Update your artist profile and personal information</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-8">
            
            {/* About Me Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <User className="w-5 h-5 text-gray-500" />
                <label className="block text-lg font-medium text-gray-700">About Me</label>
              </div>
              <textarea
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleChange}
                rows={5}
                className="bg-white text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                placeholder="Tell us about yourself, your artistic journey, and what inspires your work..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Share your story, artistic background, and what drives your creativity.
              </p>
            </div>

            {/* Education Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <label className="block text-lg font-medium text-gray-700">Education</label>
              </div>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                rows={4}
                className="bg-white text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                placeholder="Include your formal art education, degrees, workshops, and relevant training..."
              />
              <p className="text-sm text-gray-500 mt-1">
                List your educational background, art schools, degrees, and any relevant certifications.
              </p>
            </div>

            {/* Events Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <label className="block text-lg font-medium text-gray-700">Events</label>
              </div>
              <textarea
                name="events"
                value={formData.events}
                onChange={handleChange}
                rows={4}
                className="bg-white text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                placeholder="Notable events, art fairs, competitions, or conferences you've participated in..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Include art fairs, competitions, workshops, conferences, and other notable events.
              </p>
            </div>

            {/* Exhibition Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-gray-500" />
                <label className="block text-lg font-medium text-gray-700">Exhibitions</label>
              </div>
              <textarea
                name="exibition"
                value={formData.exibition}
                onChange={handleChange}
                rows={4}
                className="bg-white text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                placeholder="Solo and group exhibitions, galleries where you've shown your work..."
              />
              <p className="text-sm text-gray-500 mt-1">
                List solo exhibitions, group shows, galleries, and museums where your work has been displayed.
              </p>
            </div>

            {/* Custom URL Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-gray-500" />
                <label className="block text-lg font-medium text-gray-700">Profile Custom URL</label>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 bg-gray-100 px-3 py-3 border border-gray-300 rounded-l-lg border-r-0">
                  artkya.com/artist/
                </span>
                <input
                  type="text"
                  name="customUrl"
                  value={formData.customUrl}
                  onChange={handleChange}
                  className="bg-white text-black flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="your-custom-url"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Create a custom URL for your artist profile. Use only lowercase letters, numbers, and hyphens.
              </p>
            </div>

            {/* Location Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-medium text-gray-700">Location</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="bg-white text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="United States"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="bg-white text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="California"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-white text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Los Angeles"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Your location helps collectors and galleries find local artists.
              </p>
            </div>

            {/* Character Counts */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Profile Completion</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">About Me:</span>
                  <span className={`ml-1 ${formData.aboutMe.length > 50 ? 'text-green-600' : 'text-red-500'}`}>
                    {formData.aboutMe.length} chars
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Education:</span>
                  <span className={`ml-1 ${formData.education.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                    {formData.education.length} chars
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Events:</span>
                  <span className={`ml-1 ${formData.events.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                    {formData.events.length} chars
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Exhibitions:</span>
                  <span className={`ml-1 ${formData.exibition.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                    {formData.exibition.length} chars
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Save className="w-4 h-4" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Changes will be reflected on your public artist profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
