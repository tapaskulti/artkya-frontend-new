import React from 'react';
import { 
  Image, 
  TrendingUp, 
  Tag, 
  MapPin, 
  StickyNote, 
  UserCircle, 
  User 
} from 'lucide-react';

const ArtistHeader = ({ activeTab, handleTabClick }) => {
  const tabs = [
    {
      id: 'Manage Artworks',
      label: 'Manage Artworks',
      icon: Image,
    },
    {
      id: 'Sales Dashboard',
      label: 'Sales Dashboard',
      icon: TrendingUp,
    },
    {
      id: 'Addresses',
      label: 'Addresses',
      icon: MapPin,
    },
    {
      id: 'Curator Notes',
      label: 'Curator Notes',
      icon: StickyNote,
    },
    {
      id: 'Account',
      label: 'Account',
      icon: UserCircle,
    },
    {
      id: 'Profile Information',
      label: 'Profile Information',
      icon: User,
    },
  ];

  return (
    <div className="bg-black shadow-lg">
      <div className="hidden sm:block">
        <nav className="flex space-x-0">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  flex-1 flex flex-col items-center justify-center px-4 py-6 
                  border-2 border-white transition-all duration-200 hover:bg-gray-800
                  ${isActive 
                    ? 'bg-white text-black' 
                    : 'bg-black text-white hover:bg-gray-800'
                  }
                `}
              >
                <IconComponent className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium text-center leading-tight">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
      
      {/* Mobile dropdown version */}
      <div className="sm:hidden">
        <div className="relative">
          <select
            value={activeTab}
            onChange={(e) => handleTabClick(e.target.value)}
            className="w-full px-4 py-3 bg-black text-white border-2 border-white focus:outline-none"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id} className="bg-black text-white">
                {tab.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;