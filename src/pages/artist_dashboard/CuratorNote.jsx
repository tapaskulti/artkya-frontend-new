/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Save, ExternalLink } from 'lucide-react';

// Social Links Input Component
const InputSocialLinks = ({ label, value, onChange, placeholder }) => (
  <div className="flex items-center space-x-4">
    <div className="w-32 font-semibold text-lg flex items-center gap-2">
      <ExternalLink className="w-4 h-4 text-gray-500" />
      {label}
    </div>
    <div className="flex-1">
      <input
        type="url"
        placeholder={placeholder || `Enter ${label} URL`}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
      />
    </div>
  </div>
);

// Checkbox Field Component
const CheckboxField = ({ label, checked, onChange, name }) => (
  <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
    />
    <span className="text-sm">{label}</span>
  </label>
);

// Yes/No Question Component
const YesNoQuestion = ({ label, value, onChange, name }) => (
  <div className="mb-4">
    <p className="font-medium mb-3">{label}</p>
    <div className="flex space-x-6">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          value="yes"
          checked={value === 'yes'}
          onChange={onChange}
          className="w-4 h-4 text-black border-gray-300 focus:ring-black"
        />
        <span>Yes</span>
      </label>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          value="no"
          checked={value === 'no'}
          onChange={onChange}
          className="w-4 h-4 text-black border-gray-300 focus:ring-black"
        />
        <span>No</span>
      </label>
    </div>
  </div>
);

// Yes/No/N-A Question Component
const YesNoNAQuestion = ({ label, value, onChange, name }) => (
  <div className="mb-4">
    <p className="font-medium mb-3">{label}</p>
    <div className="flex space-x-6">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          value="yes"
          checked={value === 'yes'}
          onChange={onChange}
          className="w-4 h-4 text-black border-gray-300 focus:ring-black"
        />
        <span>Yes</span>
      </label>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          value="no"
          checked={value === 'no'}
          onChange={onChange}
          className="w-4 h-4 text-black border-gray-300 focus:ring-black"
        />
        <span>No</span>
      </label>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          value="na"
          checked={value === 'na'}
          onChange={onChange}
          className="w-4 h-4 text-black border-gray-300 focus:ring-black"
        />
        <span>N/A</span>
      </label>
    </div>
  </div>
);

// Main Curator Notes Component
const CuratorNotes = () => {
  const [formData, setFormData] = useState({
    // Social Links
    facebook: '',
    twitter: '',
    pinterest: '',
    tiktok: '',
    instagram: '',
    website: '',
    
    // Commissions
    privateCommissions: '',
    corporateCommissions: '',
    
    // Murals
    makesMurals: '',
    muralExperience: '',
    
    // Custom Prints
    customDimensions: '',
    oversizedPrints: '',
    customFraming: '',
    
    // Hotel Work
    hotelReproductions: '',
    royaltyPayments: '',
    hotelFraming: '',
    
    // Charity
    charitySales: '',
    supportedCharities: '',
    
    // Identity
    gender: {
      female: false,
      male: false,
      nonBinary: false,
      preferNotToSay: false,
      selfDescribe: false
    },
    ethnicity: {
      asian: false,
      black: false,
      caucasian: false,
      hispanic: false,
      nativeAmerican: false,
      pacificIslander: false,
      preferNotToAnswer: false,
      selfDescribe: false
    },
    
    // Themes
    themes: {
      accessibility: false,
      animalRights: false,
      blackIdentity: false,
      bodyImage: false,
      conflict: false,
      culturalDiversity: false,
      environmentalism: false,
      freedom: false,
      health: false,
      historical: false,
      heroes: false,
      identity: false,
      immigration: false,
      indigenous: false,
      latinx: false,
      lgbtqia: false,
      masculinity: false,
      mentalHealth: false,
      politics: false,
      refugee: false,
      spirituality: false,
      womensIssues: false
    }
  });

  const handleSocialLinkChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (category, field) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category][field]
      }
    }));
  };

  const handleSubmit = () => {
    console.log('Curator Notes Data:', formData);
    // Handle form submission here
    alert('Changes saved successfully!');
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Curator Notes</h2>
          <p className="text-gray-600 mb-8">
            Artkya curators and art advisors are often approached for special
            collections or projects that require artists to have a unique skill set
            or history in a specific practice area. By entering the information
            below, you are making it possible for curators to better identify you
            for these projects. Please note, we value your privacy.
          </p>

          {/* Social Links Section */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">Social Links</h3>
            <p className="text-gray-600 mb-6">
              {`Provide us with your social links. We'll use this information in our
              promotional marketing efforts.`}
            </p>
            <div className="space-y-6">
              <InputSocialLinks 
                label="Facebook" 
                value={formData.facebook}
                onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                placeholder="https://facebook.com/yourprofile"
              />
              <InputSocialLinks 
                label="Twitter" 
                value={formData.twitter}
                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                placeholder="https://twitter.com/yourusername"
              />
              <InputSocialLinks 
                label="Pinterest" 
                value={formData.pinterest}
                onChange={(e) => handleSocialLinkChange('pinterest', e.target.value)}
                placeholder="https://pinterest.com/yourprofile"
              />
              <InputSocialLinks 
                label="TikTok" 
                value={formData.tiktok}
                onChange={(e) => handleSocialLinkChange('tiktok', e.target.value)}
                placeholder="https://tiktok.com/@yourusername"
              />
              <InputSocialLinks 
                label="Instagram" 
                value={formData.instagram}
                onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                placeholder="https://instagram.com/yourusername"
              />
              <InputSocialLinks 
                label="Website" 
                value={formData.website}
                onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          {/* Commissions Section */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">Commissions</h3>
            <div className="space-y-6">
              <YesNoQuestion
                label="Are you willing to do commissions for private clients?"
                value={formData.privateCommissions}
                onChange={handleRadioChange}
                name="privateCommissions"
              />
              <YesNoQuestion
                label="Are you willing to do commissions for hotels and corporate customers?"
                value={formData.corporateCommissions}
                onChange={handleRadioChange}
                name="corporateCommissions"
              />
            </div>
          </div>

          {/* Murals and Public Art Section */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">Murals and Public Art</h3>
            <div className="space-y-6">
              <YesNoQuestion
                label="As part of your practice, do you make murals?"
                value={formData.makesMurals}
                onChange={handleRadioChange}
                name="makesMurals"
              />
              <YesNoQuestion
                label="If yes, do you have 2 or more years experience creating murals?"
                value={formData.muralExperience}
                onChange={handleRadioChange}
                name="muralExperience"
              />
            </div>
          </div>

          {/* Custom Prints Section */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">Custom Prints (Photographers/Printmakers)</h3>
            <div className="space-y-6">
              <YesNoNAQuestion
                label="Are you open to producing prints at custom dimensions?"
                value={formData.customDimensions}
                onChange={handleRadioChange}
                name="customDimensions"
              />
              <YesNoNAQuestion
                label="Are you able to print custom works at oversized dimensions (60+ inches)?"
                value={formData.oversizedPrints}
                onChange={handleRadioChange}
                name="oversizedPrints"
              />
              <YesNoNAQuestion
                label="Are you able to offer custom framing or mounted works?"
                value={formData.customFraming}
                onChange={handleRadioChange}
                name="customFraming"
              />
            </div>
          </div>

          {/* Work for Hotels Section */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">Work for Hotels and Hospitality Partners</h3>
            <div className="space-y-6">
              <YesNoQuestion
                label="Are you willing to allow print reproductions of your work specifically for hotel projects?"
                value={formData.hotelReproductions}
                onChange={handleRadioChange}
                name="hotelReproductions"
              />
              <YesNoQuestion
                label="Are you willing to negotiate a royalty payment for use of digital files of your work for hotel projects?"
                value={formData.royaltyPayments}
                onChange={handleRadioChange}
                name="royaltyPayments"
              />
            </div>
          </div>

          {/* Causes and Charities Section */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">Causes and Charities</h3>
            <div className="space-y-6">
              <YesNoQuestion
                label="Are you open to offering your work as a part of a charity sale, with some portion of your proceeds going to the fundraising organization?"
                value={formData.charitySales}
                onChange={handleRadioChange}
                name="charitySales"
              />
              <div>
                <label className="block font-medium mb-2">
                  Are there particular charities or causes that you personally support that you would like to let us know about?
                </label>
                <textarea
                  value={formData.supportedCharities}
                  onChange={(e) => setFormData(prev => ({ ...prev, supportedCharities: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                  placeholder="Please list the charities or causes you support..."
                />
              </div>
            </div>
          </div>

          {/* Identity Section */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">Identity</h3>
            
            <div className="mb-8">
              <h4 className="text-lg font-medium mb-4">How would you describe your gender?</h4>
              <div className="space-y-2">
                <CheckboxField 
                  label="Female" 
                  checked={formData.gender.female}
                  onChange={() => handleCheckboxChange('gender', 'female')}
                />
                <CheckboxField 
                  label="Male" 
                  checked={formData.gender.male}
                  onChange={() => handleCheckboxChange('gender', 'male')}
                />
                <CheckboxField 
                  label="Non-binary/third gender" 
                  checked={formData.gender.nonBinary}
                  onChange={() => handleCheckboxChange('gender', 'nonBinary')}
                />
                <CheckboxField 
                  label="Prefer not to say" 
                  checked={formData.gender.preferNotToSay}
                  onChange={() => handleCheckboxChange('gender', 'preferNotToSay')}
                />
                <CheckboxField 
                  label="Prefer to self-describe" 
                  checked={formData.gender.selfDescribe}
                  onChange={() => handleCheckboxChange('gender', 'selfDescribe')}
                />
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-medium mb-4">How do you identify your ethnicity? (select all that apply)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CheckboxField 
                  label="Asian" 
                  checked={formData.ethnicity.asian}
                  onChange={() => handleCheckboxChange('ethnicity', 'asian')}
                />
                <CheckboxField 
                  label="Black/African" 
                  checked={formData.ethnicity.black}
                  onChange={() => handleCheckboxChange('ethnicity', 'black')}
                />
                <CheckboxField 
                  label="Caucasian" 
                  checked={formData.ethnicity.caucasian}
                  onChange={() => handleCheckboxChange('ethnicity', 'caucasian')}
                />
                <CheckboxField 
                  label="Hispanic/Latinx" 
                  checked={formData.ethnicity.hispanic}
                  onChange={() => handleCheckboxChange('ethnicity', 'hispanic')}
                />
                <CheckboxField 
                  label="Native American" 
                  checked={formData.ethnicity.nativeAmerican}
                  onChange={() => handleCheckboxChange('ethnicity', 'nativeAmerican')}
                />
                <CheckboxField 
                  label="Pacific Islander" 
                  checked={formData.ethnicity.pacificIslander}
                  onChange={() => handleCheckboxChange('ethnicity', 'pacificIslander')}
                />
                <CheckboxField 
                  label="Prefer not to answer" 
                  checked={formData.ethnicity.preferNotToAnswer}
                  onChange={() => handleCheckboxChange('ethnicity', 'preferNotToAnswer')}
                />
                <CheckboxField 
                  label="Prefer to self-describe" 
                  checked={formData.ethnicity.selfDescribe}
                  onChange={() => handleCheckboxChange('ethnicity', 'selfDescribe')}
                />
              </div>
            </div>
          </div>

          {/* Artwork Themes Section */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">Artwork Themes</h3>
            <p className="mb-6">
              Does your artistic practice regularly engage with any of the following themes or issues? Select all that apply.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <CheckboxField 
                label="Accessibility and advocacy for persons with disabilities"
                checked={formData.themes.accessibility}
                onChange={() => handleCheckboxChange('themes', 'accessibility')}
              />
              <CheckboxField 
                label="Animal Rights and Protections"
                checked={formData.themes.animalRights}
                onChange={() => handleCheckboxChange('themes', 'animalRights')}
              />
              <CheckboxField 
                label="Black Identity, Culture, and Activism"
                checked={formData.themes.blackIdentity}
                onChange={() => handleCheckboxChange('themes', 'blackIdentity')}
              />
              <CheckboxField 
                label="Body Image and Self Esteem"
                checked={formData.themes.bodyImage}
                onChange={() => handleCheckboxChange('themes', 'bodyImage')}
              />
              <CheckboxField 
                label="Conflict and Adversity"
                checked={formData.themes.conflict}
                onChange={() => handleCheckboxChange('themes', 'conflict')}
              />
              <CheckboxField 
                label="Cultural Diversity"
                checked={formData.themes.culturalDiversity}
                onChange={() => handleCheckboxChange('themes', 'culturalDiversity')}
              />
              <CheckboxField 
                label="Environmentalism, Sustainability, and Climate Issues"
                checked={formData.themes.environmentalism}
                onChange={() => handleCheckboxChange('themes', 'environmentalism')}
              />
              <CheckboxField 
                label="Freedom and Social Change"
                checked={formData.themes.freedom}
                onChange={() => handleCheckboxChange('themes', 'freedom')}
              />
              <CheckboxField 
                label="Health and Wellness"
                checked={formData.themes.health}
                onChange={() => handleCheckboxChange('themes', 'health')}
              />
              <CheckboxField 
                label="Historical Subjects"
                checked={formData.themes.historical}
                onChange={() => handleCheckboxChange('themes', 'historical')}
              />
              <CheckboxField 
                label="Heroes and Leaders"
                checked={formData.themes.heroes}
                onChange={() => handleCheckboxChange('themes', 'heroes')}
              />
              <CheckboxField 
                label="Identity"
                checked={formData.themes.identity}
                onChange={() => handleCheckboxChange('themes', 'identity')}
              />
              <CheckboxField 
                label="Immigration and Migration"
                checked={formData.themes.immigration}
                onChange={() => handleCheckboxChange('themes', 'immigration')}
              />
              <CheckboxField 
                label="Indigenous identity, culture, and activism"
                checked={formData.themes.indigenous}
                onChange={() => handleCheckboxChange('themes', 'indigenous')}
              />
              <CheckboxField 
                label="Latinx"
                checked={formData.themes.latinx}
                onChange={() => handleCheckboxChange('themes', 'latinx')}
              />
              <CheckboxField 
                label="LGBTQIA+"
                checked={formData.themes.lgbtqia}
                onChange={() => handleCheckboxChange('themes', 'lgbtqia')}
              />
              <CheckboxField 
                label="Masculinity"
                checked={formData.themes.masculinity}
                onChange={() => handleCheckboxChange('themes', 'masculinity')}
              />
              <CheckboxField 
                label="Mental Health"
                checked={formData.themes.mentalHealth}
                onChange={() => handleCheckboxChange('themes', 'mentalHealth')}
              />
              <CheckboxField 
                label="Politics and Activism"
                checked={formData.themes.politics}
                onChange={() => handleCheckboxChange('themes', 'politics')}
              />
              <CheckboxField 
                label="Refugee Advocacy"
                checked={formData.themes.refugee}
                onChange={() => handleCheckboxChange('themes', 'refugee')}
              />
              <CheckboxField 
                label="Spirituality and Meditation"
                checked={formData.themes.spirituality}
                onChange={() => handleCheckboxChange('themes', 'spirituality')}
              />
              <CheckboxField 
                label="Women's Issues"
                checked={formData.themes.womensIssues}
                onChange={() => handleCheckboxChange('themes', 'womensIssues')}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuratorNotes;