import { 
  Users, 
  Palette, 
  ShoppingBag, 
  Image, 
  // BarChart3,
  Settings,
  LogOut,
  ArrowBigLeftDashIcon
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    // Handle exact matches and default route
    if (path === '/admin/users' || path === '/Admin/users') {
      return location.pathname === '/admin/users' || 
             location.pathname === '/Admin/users' ||
             location.pathname === '/admin' ||
             location.pathname === '/Admin';
    }
    
    return location.pathname === path || 
           location.pathname.toLowerCase() === path.toLowerCase();
  };

  const navigationItems = [
    {
      name: "Users",
      path: "/Admin/users",
      icon: Users,
      description: "Manage user accounts"
    },
    {
      name: "Artists",
      path: "/Admin/artists",
      icon: Palette,
      description: "Artist management"
    },
    {
      name: "Paintings",
      path: "/Admin/paintings",
      icon: Image,
      description: "Artwork gallery"
    },
    {
      name: "Orders",
      path: "/Admin/orders",
      icon: ShoppingBag,
      description: "Order management"
    },
    // {
    //   name: "Analytics",
    //   path: "/Admin/analytics",
    //   icon: BarChart3,
    //   description: "Reports & insights"
    // }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-900 rounded-sm flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-light text-gray-900 tracking-tight">Art Admin</h1>
            <p className="text-xs text-gray-500 font-light">Management Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-sm transition-all duration-200 ${
                  active
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon 
                  className={`flex-shrink-0 w-5 h-5 mr-3 transition-colors duration-200 ${
                    active 
                      ? 'text-white' 
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className={`text-xs transition-colors duration-200 ${
                    active 
                      ? 'text-gray-300' 
                      : 'text-gray-500 group-hover:text-gray-600'
                  }`}>
                    {item.description}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-1">
          <Link
            to="/Painting"
            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-sm transition-all duration-200 ${
              isActive('/Painting')
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <ArrowBigLeftDashIcon 
              className={`flex-shrink-0 w-4 h-4 mr-3 transition-colors duration-200 ${
                isActive('/Painting')
                  ? 'text-white' 
                  : 'text-gray-400 group-hover:text-gray-600'
              }`}
            />
            Back To Painting
          </Link>
          
          <button
            onClick={() => {
              // Handle logout logic here
              console.log('Logout clicked');
            }}
            className="group w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-sm hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
          >
            <LogOut className="flex-shrink-0 w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
            Logout
          </button>
        </div>
        
        {/* User info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@artplatform.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;