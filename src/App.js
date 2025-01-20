import Footer from "./components/footer/Footer.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/assets/css/main.css";
import ContactScreen from "./pages/contact/ContactPage.jsx";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/navbar/Navbar.jsx";
import Newhome from "./components/homepagenew/homepage.jsx";
import Menubenefits from "./components/homepagenew/menubenifits.jsx";
import Steps from "./components/homepagenew/subdivisions/steps.jsx";
import Signup from "./pages/auth/SignupForm.jsx";
import Login from "./pages/auth/Login.jsx";
import { CartProvider } from "./store/ContextReducer.js";
import Cart from "./pages/order-online/order/Cart.jsx";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminRegistration from "./components/admin/AdminRegistration.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import Adminmenu from "./components/admin/Adminmenu.jsx";
import AddMenu from "./components/admin/AddMenu.jsx";
import ReceivedOrders from "./components/admin/ReceivedOrders.jsx";
import EachProduct from "./components/homepagenew/EachProduct.jsx";
import NewOnlineordermenu from "./pages/order-online/menu/NewOnlineordermenu.jsx";
import Newreceivedorders from "./components/admin/Newreceivedorders.jsx";

import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MilletPoducts from "./pages/order-online/products/MilletProducts.jsx";
// import TermsAndConditions from "./pages/policies/Terms.jsx";
import ReturnRefund from "./pages/policies/ReturnRefund.jsx";
import Shipping from "./pages/policies/Shipping.jsx";
import PrivacyPolicy from "./pages/policies/Privacy.jsx";
import TermsOfService from "./pages/policies/Terms.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./store/AuthContext.js";
import Profile from "./pages/profile/Profile.jsx";
import EditProfile from "./pages/profile/EditProfile.jsx";
import AddAddressScreen from "./pages/profile/AddAddress.jsx";
import OrderSummary from "./pages/order-online/order/OrderSummary.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import AboutPageNew from "./pages/about/AboutPageNew.jsx";
import Order from "./pages/order-online/history/Orders/Order.jsx";
import OrderDetails from "./pages/order-online/history/Orders/OrderDetails.jsx";
import Careers from "./pages/careers/Careers.jsx";
import JobDescription from "./pages/careers/components/JobDescription.jsx";
import Apply from "./pages/careers/components/Apply.jsx";
import Combos from "./pages/order-online/products/combos/Combos.jsx";
import SubcriptionPage from "./pages/subcription/SubcriptionPage.jsx";
import CustomizedSubscription from "./pages/subcription/components/CostomizedSubscription.jsx";
// import CardContainer from "./pages/newHome/components/newcard/CardContainer.jsx";


function App() {


  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [showCookiesMessage, setShowCookiesMessage] = useState(false);
  const [showPoster, setShowPoster] = useState(true);


  const createSessionId = () => {
    const website = window.location.hostname;
    const sessionKey = `sessionId_${website}`;
    let storedSessionId = localStorage.getItem(sessionKey);
    if (!storedSessionId) {
      storedSessionId = uuidv4();
      localStorage.setItem(sessionKey, storedSessionId);
    }
    setSessionId(storedSessionId);
    return storedSessionId;
  };

  const checkCookieConsent = () => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent !== 'true') {
      setShowCookiesMessage(true);
    }
  };

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowCookiesMessage(false);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowCookiesMessage(false);
  };


  const handlePosterClose = () => {
    setShowPoster(false);
  };

  return (
<div >
<AuthProvider>
<CartProvider>
  <Router>
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Newhome />} />
          <Route exact path="/about" element={<AboutPageNew />} />
          <Route exact path="/careers" element={<Careers/>} />
          <Route exact path="/job/:id" element={<JobDescription/>} />
          <Route exact path="/application/:jobTitle" element={<Apply />} />
          <Route exact path="/contact" element={<ContactScreen />} />
          <Route exact path="/OrderOnline" element={<NewOnlineordermenu />} />
          <Route exact path="/milletproducts" element={<MilletPoducts />} />
          <Route exact path="/Combos" element={<Combos />} />
          <Route exact path="/SubcriptionPage" element={<SubcriptionPage/>} />
          <Route exact path="/CustomizedSubscription" element={<CustomizedSubscription/>} />
          <Route exact path="/Cart" element={<Cart />} />
          <Route exact path="/order-summary" element={<OrderSummary/>} />
          <Route exact path="/Orders" element={<Order />} />
          <Route exact path="/order-details/:id" element={<OrderDetails />} />
          <Route exact path="/menubenefits/:id" element={<Steps />} />
          <Route exact path="/AuthPage" element={<AuthPage />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Profile" element={<Profile/>} />
          <Route exact path="/EditProfile" element={<EditProfile/>} />
          <Route exact path="/AddAddress" element={<AddAddressScreen/>} />

          <Route exact path="/adminlogin" element={<AdminLogin />} />
          <Route exact path="/adminregistration" element={<AdminRegistration />} />
          <Route exact path="/admindashboard/:email" element={<AdminDashboard />} />
          <Route exact path="/adminmenu/:adminEmail" element={<Adminmenu />} />
          <Route exact path="/addmenu/:adminEmail" element={<AddMenu />} />
          <Route exact path="/receivedorders" element={<ReceivedOrders />} />
          <Route exact path="/product/:productId" element={<EachProduct />} />
          <Route exact path="/new-recievedorders" element={<Newreceivedorders />} />

          <Route exact path="/terms-policy" element={<TermsOfService/>} />
          <Route exact path="/return-policy" element={<ReturnRefund/>} />
          <Route exact path="/shipping-policy" element={<Shipping/>} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy/>} />
        </Routes>
        <Footer />
        {showCookiesMessage && (
          <div
            className="toast show position-fixed bottom-0 end-0 m-3"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ backgroundColor: 'black', color: "white", opacity: 0.8, width: "80%", display: "flex", justifyContent: "", alignItems: "center" }}
          >
            <div className="toast-body">
              We use cookie data to enhance user experience and for analytics purposes. By clicking 'Accept All', you consent to our Privacy Notice and Cookie Policy.
              <br />
              Do you accept?
              <div className="mt-2 pt-2 border-top">
                <button
                  type="button"
                  className="btn btn-success btn-sm me-2"
                  onClick={handleAcceptCookies}
                >
                  <i className="bi bi-check-circle" style={{ verticalAlign: 'middle' }}></i> Accept
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={handleDeclineCookies}
                >
                  <i className="bi bi-x-circle" style={{ verticalAlign: 'middle' }}></i> Decline
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    {/* )} */}
  </Router>
</CartProvider>
</AuthProvider>
<ToastContainer position="bottom-right" />
</div>
  );
}

export default App;
