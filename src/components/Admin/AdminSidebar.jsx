// components/AdminSidebar.jsx
import { FaPalette, FaShoppingBag, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || 
           (location.pathname === '/admin' && path === '/admin/users');
  };

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Art Admin</h1>
      </div>
      <nav className="mt-4">
        <Link 
          to="/Admin/users" 
          className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
            isActive('/admin/users') ? 'bg-blue-50 text-blue-600' : ''
          }`}
        >
          <FaUsers className="w-5 h-5 mr-3" />
          Users
        </Link>
        <Link 
          to="/Admin/artists" 
          className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
            isActive('/admin/artists') ? 'bg-blue-50 text-blue-600' : ''
          }`}
        >
          <FaPalette className="w-5 h-5 mr-3" />
          Artists
        </Link>
        <Link 
          to="/Admin/paintings" 
          className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
            isActive('/admin/paintings') ? 'bg-blue-50 text-blue-600' : ''
          }`}
        >
          <FaPalette className="w-5 h-5 mr-3" />
          Paintings
        </Link>
        <Link 
          to="/Admin/orders" 
          className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
            isActive('/admin/orders') ? 'bg-blue-50 text-blue-600' : ''
          }`}
        >
          <FaShoppingBag className="w-5 h-5 mr-3" />
          Orders
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
