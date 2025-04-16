import { FaPalette, FaShoppingBag, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Art Admin</h1>
      </div>
      <nav className="mt-4">
        <Link
          to="/Admin/users"
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
        >
          <FaUsers className="w-5 h-5 mr-3" />
          Users
        </Link>
        <Link
          to="/Admin/paintings"np
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
        >
          <FaPalette className="w-5 h-5 mr-3" />
          Paintings
        </Link>
        <Link
          to="/Admin/orders"
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
        >
          <FaShoppingBag className="w-5 h-5 mr-3" />
          Orders
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
