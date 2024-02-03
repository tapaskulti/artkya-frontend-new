import {Route, Routes as RoutePath } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
// import ArtDetailPage from "./pages/ArtDetailPage";
import ArtistProfilePage from "./pages/ArtistProfilePage";
import Painting from "./pages/Painting";
import AboutUs from "./pages/AboutUs";
import Contacts from "./pages/Contacts";
import Favourites from "./pages/Favourites";
import Account from "./pages/accounts/Account";
import ArtDetailPage from "./pages/ArtDetailPage";
import Studio from "./pages/studio/Studio";

const Routes = () => {
  return (
    
      <RoutePath>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        {/* <Route path="/:id" element={<ArtDetailPage />} /> */}
        <Route path="/artistProfilePage" element={<ArtistProfilePage />} />
        <Route path="/artDetailPage" element={ <ArtDetailPage /> } />
        <Route path="/Painting" element={<Painting />} />
        <Route path="/favoutires" element={<Favourites />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Studio" element={<Studio/>} />
        <Route path="/Contacts" element={<Contacts />} />
        <Route path="/Accounts" element={<Account />} />
        {/* <Route path="/disclaimer" element={<Disclaimer />} /> */}
        {/* <Route path="/:id/checkout" element={<ChekoutPage />} /> */}
      </RoutePath>
  );
};

export default Routes;
