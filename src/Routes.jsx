
import { BrowserRouter, Route, Routes as RoutePath } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import ArtDetailPage from "./pages/ArtDetailPage";
// import AboutUs from "./pages/AboutUs";
// import Contact from "./pages/Contact";

const Routes = () => {
  return (
    <BrowserRouter>
      <RoutePath>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/:id" element={<ArtDetailPage />} /> */}
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        {/* <Route path="/aboutus" element={<AboutUs />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/termsandcondition" element={<TermsAndCondition />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/:id/checkout" element={<ChekoutPage />} /> */}
      </RoutePath>
    </BrowserRouter>
  );
};

export default Routes;
