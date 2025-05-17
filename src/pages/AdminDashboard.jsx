import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";


const Admin = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Admin;