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

const Routes = () => {
  return (
    
      <RoutePath>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        {/* <Route path="/:id" element={<ArtDetailPage />} /> */}
        <Route path="/artistProfilePage" element={<ArtistProfilePage />} />
        <Route path="/Painting" element={<Painting />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Contacts" element={<Contacts />} />
        {/* <Route path="/termsandcondition" element={<TermsAndCondition />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/:id/checkout" element={<ChekoutPage />} /> */}
      </RoutePath>
  );
};

export default Routes;
