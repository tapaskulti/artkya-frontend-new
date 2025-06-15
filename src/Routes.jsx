import { Route, Routes as RoutePath } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ArtistProfilePage from "./pages/ArtistProfilePage";
import Painting from "./pages/Painting";
import AboutUs from "./pages/AboutUs";
import Contacts from "./pages/Contacts";
import Favourites from "./pages/Favourites";
import Account from "./pages/accounts/Account";
import ArtDetailPage from "./pages/ArtDetailPage";
import Studio from "./pages/studio/Studio";
import Cart from "./pages/Cart";
import ShippingBilling from "./pages/ShippingBilling";
import ArtistMainPage from "./pages/artist_dashboard/ArtistMainPage";
import Homepage from "./pages/Homepage";
import UserProfilePage from "./pages/UserProfilePage";
import OriginalArtCheckout from "./pages/OriginalArtCheckout";
import Admin from "./pages/AdminDashboard";
import PaintingsManagement from "./components/Admin/PaintingsManagement";
import OrdersManagement from "./components/Admin/OrdersManagement";
import UsersManagement from "./components/Admin/UsersManagement";
import ArtistsManagement from "./components/Admin/ArtistsManagement";
import OrderSuccess from "./pages/OrderSuccessPage";
import OrderDetailsModal from "./pages/Orders";
import ResetPasswordPage from "./pages/auth/ResetPassword";

const Routes = () => {
  return (
    <RoutePath>
      <Route path="/" element={<Homepage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/Profile" element={<UserProfilePage />} />
      <Route path="/artistProfilePage/:id" element={<ArtistProfilePage />} />
      <Route path="/artDetailPage/:id" element={<ArtDetailPage />} />
      <Route path="/Painting" element={<Painting />} />
      <Route path="/favoutires" element={<Favourites />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/Studio" element={<Studio />} />
      <Route path="/Contacts" element={<Contacts />} />
      <Route path="/Accounts" element={<Account />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/ShippingBilling" element={<ShippingBilling />} />
      {/* <Route path="/:id/checkout" element={<ChekoutPage />} /> */}
      <Route path="/Artist" element={<ArtistMainPage />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/orders" element={<OrderDetailsModal />} />
      <Route
        path="/artDetailPage/:id/original"
        element={<OriginalArtCheckout />}
      />
      <Route
        path="/reset/:id"
        element={<ResetPasswordPage />}
      />
      {/* <Route path="/artDetailPage/:id/print" element={<PrintArtCheckout />} />
      <Route path="Admin/users" element={<UsersManagement />} />
      <Route path="Admin/paintings" element={<PaintingsManagement />} />
      <Route path="Admin/orders" element={<OrdersManagement />} /> */}

      {/* Admin Routes */}
      <Route path="/Admin" element={<Admin />}>
        <Route index element={<UsersManagement />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="artists" element={<ArtistsManagement />} />
        <Route path="paintings" element={<PaintingsManagement />} />
        <Route path="orders" element={<OrdersManagement />} />
      </Route>
    </RoutePath>
  );
};

export default Routes;
