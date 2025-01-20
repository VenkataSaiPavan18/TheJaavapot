
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import './navbar.css'
import Badge from "react-bootstrap/Badge";
import logo from '../../assets/img/logo-tjp.png'
import { useCart } from '../../store/ContextReducer';
import { useNavigate } from 'react-router-dom'
import LocationModal from '../../pages/general/location/Location';
import { useAuth } from '../../store/AuthContext';
import { Button } from '@mui/material';
import { AiOutlineShoppingCart,AiOutlineLogin, AiOutlineLogout, AiOutlineUser  } from 'react-icons/ai';
import { MdPersonAdd  } from 'react-icons/md';
import { IoPersonOutline } from "react-icons/io5";


const Navbar = () => {
  let navigate = useNavigate()
  const { logout,isAuthenticated } = useAuth(); 
  const data = useCart();
  const [cartView, setCarView] = useState(false);
    const [showMediaIcons, setShowMediaIcons] = useState(false);
    const [offeringsDropdown, setOfferingsDropdown] = useState(false);
    const [dropdownActive, setDropdownActive] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [myCity, setMyCity] = useState('');

    const closeDropdown = () => {
        setShowMediaIcons(!showMediaIcons);
      };
    
      // console.log(localStorage.getItem("token"));
    const handleDropdownClick = () => {
        setDropdownActive((prev) => !prev);
      };
    
      const handleLogout = async() => {
        await logout();
        navigate("/AuthPage");
      };

      const handleCloseModal = () => {
        setIsLocationModalOpen(false);
      };
      const handleOpenModal = () => {
        setIsLocationModalOpen(true);
      };
    
      useEffect(() => {
        const fetchSelectedCity = async () => {
          const city = localStorage.getItem("myCity");
          if (city) {
            setMyCity(city);
          } else {
            setIsLocationModalOpen(true); // Open modal if no city is found
          }
          // console.log('city', city); 
        };
        fetchSelectedCity();
      }, []);
    
      const handleCityChange = (city) => {
        setMyCity(city); // Ensure this updates the city state
        localStorage.setItem("myCity", city); // Store in localStorage for persistence
        setIsLocationModalOpen(false);
      };

    return (
      <div className="new-navbar-container">
        <div className="new-logo d-flex">
          <Link  to="/">
          <img src={logo} alt="Logo" style={{marginRight:'15px'}} />
          </Link>
          <div
  className="location-part"
>
  <LocationModal
  />
</div>
        </div>
  
        <nav id="new-navbar" className={showMediaIcons ? 'new-navbar active' : 'new-navbar'}>
          <ul>
            <li>
              <Link to="/" className="new-nav-link"  onClick={() => {window.scrollTo(0, 0);closeDropdown();}}>HOME</Link>
            </li>
            <li>
              <Link to="/about" className="new-nav-link" onClick={() => {window.scrollTo(0, 0);closeDropdown();}} >ABOUT</Link>
            </li>
<li className="new-dropdown" onClick={handleDropdownClick} >
              <Link to="/milletproducts" className="new-nav-link"  onClick={() => window.scrollTo(0, 0)}>
                <span>ORDER NOW &nbsp;</span> 
              </Link>
              <ul className={dropdownActive ? 'active' : ''}>
                <li><Link to="/milletproducts" className="new-nav-link" onClick={() => {window.scrollTo(0, 0);closeDropdown();}}>Ready To Cook</Link></li>
                <li><Link to="/OrderOnline" className="new-nav-link" onClick={() => {window.scrollTo(0, 0);closeDropdown();}} >Ready To Eat</Link></li>
           </ul>
            </li>

            <li>
              <Link to="/Combos" className="new-nav-link" onClick={() => {window.scrollTo(0, 0);closeDropdown();}} >COMBOS</Link>
            </li>
            {/* <li>
              <Link to="/SubcriptionPage" className="new-nav-link" onClick={() => {window.scrollTo(0, 0);closeDropdown();}} >SUBCRIPTION</Link>
            </li> */}
            <li>
              <Link to="/contact" className="new-nav-link" onClick={() => {window.scrollTo(0, 0);closeDropdown();}} >CONTACT US</Link>
            </li>
            {localStorage.getItem("token") ? (
            <li>
              <Link to="/orders" className="new-nav-link" onClick={() => {window.scrollTo(0, 0);closeDropdown();}} >MY ORDERS</Link>
            </li>):null}
            { !localStorage.getItem("token") ? (
                <div className="d-flex">
            <li>
            <Link
  to="/Cart"
  className="new-nav-link"
  onClick={() => {
    window.scrollTo(0, 0);
    closeDropdown();
  }}
>
  <div style={{ position: "relative", display: "inline-block" }}>
    <AiOutlineShoppingCart size={24} color="gray" />
    <Badge
      pill
      bg="danger"
      style={{
        position: "absolute",
        top: "-5px", // Adjust to move upward
        right: "-10px", // Adjust to move closer to the cart
        transform: "translate(50%, -50%)",
      }}
    >
      {data.length}
    </Badge>
  </div>
</Link>
            </li>
            <li>
            <Link className="new-nav-link" to="/AuthPage" onClick={() => window.scrollTo(0, 0)}>
            <MdPersonAdd size={24} color="gray" />
           {/* SIGNIN */}
         </Link>
            </li>
            </div>
                 ) : (
                  <div className="d-flex">
                     <div className="d-flex">
                      <li>
                      <Link
  to="/Cart"
  className="new-nav-link"
  onClick={() => {
    window.scrollTo(0, 0);
    closeDropdown();
  }}
>
  <div style={{ position: "relative", display: "inline-block" }}>
    <AiOutlineShoppingCart size={24} color="gray" />
    <Badge
      pill
      bg="danger"
      style={{
        position: "absolute",
        top: "-5px", // Adjust to move upward
        right: "-10px", // Adjust to move closer to the cart
        transform: "translate(50%, -50%)",
      }}
    >
      {data.length}
    </Badge>
  </div>
</Link>
                  </li>
                  </div>
                  <li>
                    <Link
                      className="new-nav-link "
                      aria-current="page"
                      to="/Profile"
                    >
                    <IoPersonOutline size={24} color="gray" />
                    </Link>
                  </li>
                  <li>
                  <div
                    className="new-nav-link "
                    onClick={() => {window.scrollTo(0, 0);handleLogout();}}
                  >
                    <AiOutlineLogout size={24} color="gray" />
                  </div>
                  </li>
                  <div>
                    {" "}      
                  </div>
                  </div>
                  )}
          </ul>
        </nav>
  
        <div className="new-hamburger-menu">
          <a onClick={() => setShowMediaIcons(!showMediaIcons)}>
            <GiHamburgerMenu className="hamburger-icon"/>
          </a>
        </div>
      </div>
    );
  };
  
  export default Navbar;