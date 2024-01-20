
import { BrowserRouter, Route, Routes as RoutePath } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import ArtDetailPage from "./pages/ArtDetailPage";
import Painting from "./pages/Painting";
import AboutUs from "./pages/AboutUs";
import Contacts from "./pages/Contacts";

const Routes = () => {
  return (
    <BrowserRouter>
      <RoutePath>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        {/* <Route path="/:id" element={<ArtDetailPage />} /> */}
        <Route path="/Painting" element={<Painting />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Contacts" element={<Contacts />} />
        {/* <Route path="/termsandcondition" element={<TermsAndCondition />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/:id/checkout" element={<ChekoutPage />} /> */}
      </RoutePath>
    </BrowserRouter>
  );
};

export default Routes;
