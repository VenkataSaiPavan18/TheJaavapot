import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart, useDispatchCart } from "../../../store/ContextReducer";
import { useAuth } from "../../../store/AuthContext";
import Modal from "react-modal"; // For modal implementation
import "./cart.css";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { AddLocation, ArrowBackIosNew, Close, PlaylistAdd } from "@mui/icons-material";

Modal.setAppElement("#root"); // Set the app element to avoid accessibility issues

export default function Cart() {
  const { isAuthenticated, user, login } = useAuth();
  const navigate = useNavigate();
  const menuData = useCart();
  const dispatch = useDispatchCart();
  const [showSummary, setShowSummary] = useState(true);
  const [isAddress, setIsAddress] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [qty, setQty] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [address, setAddress] = useState({
    name: "",
    delivery_email: "",
    delivery_phone: "",
    Location: "",
    City: "",
    Pincode: "",
    Landmark: "",
    State: "",
  });

  const [subtotal, setSubtotal] = useState(0);
  const [GST, setGST] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const deliveryCharges = 0; // Example delivery charge
  const discount = 0; // Example discount

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
console.log('544',menuData);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      const storedEmail = localStorage.getItem("userEmail");
      if (storedUser && storedToken && storedEmail) {
        login(JSON.parse(storedUser), storedToken, storedEmail); // Log in using stored data
      }
    };
    checkLoginStatus();
  }, []);

  const onChange = (name, value) => {
    setAddress({ ...address, [name]: value });
  };
  const handleFormSubmit = (address) => {
    if (
      address.name &&
      address.Location &&
      address.City &&
      address.Pincode &&
      address.delivery_phone &&
      address.State
    ) {
      setSelectedAddress(address);
      navigateToSummaryManual(address); // Navigate to the summary screen
    } else {
      setErrorMsg("Please fill all the required fields.");
    }
  };

  // Function to fill address using Geolocation API
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position.coords);
          // Call reverse geocoding API to get address from coordinates
          axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAdkoYYorJ9XICIk4pcAKmvjc1dd1gMWgo`
            )
            .then((response) => {
              const { results } = response.data;
              if (results && results.length > 0) {
                const addressComponents = results[0].address_components;
                console.log("addressComponents", addressComponents);
                const formattedAddress = results[0].formatted_address;
                const city = addressComponents.find((component) =>
                  component.types.includes("locality")
                ).long_name;
                const pincode = addressComponents.find((component) =>
                  component.types.includes("postal_code")
                ).long_name;
                const landmark = addressComponents.find((component) =>
                  component.types.includes("sublocality")
                ).long_name;
                const state = addressComponents.find((component) =>
                  component.types.includes("administrative_area_level_1")
                ).long_name;
                setAddress({
                  ...address,
                  Location: formattedAddress,
                  City: city,
                  Pincode: pincode,
                  State: state,
                  Landmark: landmark,
                });
              }
            })
            .catch((error) => {
              console.error("Error fetching address from coordinates:", error);
            });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const calculateValues = () => {
      const newSubtotal = menuData.reduce(
        (total, food) => total + food.basicPrice * food.qty,
        0
      );
      const newGST = newSubtotal * 0.18;
      const newTotalAmount =
        Math.round((newSubtotal + newGST + deliveryCharges - discount) * 100) /
        100;
      setSubtotal(newSubtotal);
      setGST(newGST);
      setTotalAmount(newTotalAmount);
    };

    calculateValues();
  }, [menuData]);

  useEffect(() => {
    // console.log("isAuthenticated && user",isAuthenticated , user);
    if (isAuthenticated && user) {
      setDeliveryAddresses(user.delivery_Addresses || []);
    } else {
      setDeliveryAddresses([]); // Reset to an empty array if not authenticated
    }
  }, [isAuthenticated, user]);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setIsModalOpen(false); // Close the modal after selecting an address
    navigateToSummary(address); // Navigate to the summary screen
  };

  const navigateToSummary = (address) => {
    const selectedAddress = address.address;
    navigate("/order-summary", {
      state: {
        menuData,
        selectedAddress,
        totalAmount,
        subtotal,
        GST,
        discount,
      },
    });
  };

  const navigateToSummaryManual = (address) => {
    const selectedAddress = address;
    navigate("/order-summary", {
      state: {
        menuData,
        selectedAddress,
        totalAmount,
        subtotal,
        GST,
        discount,
      },
    });
  };

  const renderAddressItem = (item) => {
    if (!item.address) return null; // Early return if `address` is undefined.

    const {
      Id,
      name,
      City,
      Landmark,
      Location,
      Pincode,
      State,
      delivery_email,
      delivery_phone,
    } = item.address;

    return (
      <div key={Id} onClick={() => handleSelectAddress(item)}>
        <div className="address-item">
          <h4>{name}</h4>
          <p>{`${Location}, ${Landmark}`}</p>
          <p>{`${City}, ${State} - ${Pincode}`}</p>
          <p>{`Phone: ${delivery_phone}`}</p>
          {delivery_email && <p>{`Email: ${delivery_email}`}</p>}
        </div>
      </div>
    );
  };
  return (
    <div className="my">
      <div style={{display:'flex',justifyContent:'space-between'}}>
      <p
        style={{
          fontWeight: 700,
          fontFamily: "Arial",
          fontSize: "36px",
          fontStyle: "Arial, sans-serif",
          // color: "#fff",
          color: "#FD7E4B",
        }}
      >
        My Cart
      </p>  
      <div onClick={()=> navigate('/milletproducts')} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer',   backgroundColor:'#FF9A7233',padding:'10px',borderRadius:'15px'}}>
      <ArrowBackIosNew style={{ color: '#000', fontSize: '20px' }} />
      <span style={{ marginLeft: '8px', fontSize: '16px', color: '#0D0D0D',   fontWeight: 400,
          fontFamily: "Arial",}}>Continue Shopping</span>
    </div>
      </div>
      {menuData.length === 0 ? (
        <div className="empty-cart">
          <p>Your Cart is Empty!</p>
        </div>
      ) : (
        <div>
          <>
          <div>
  {menuData.length > 0 && (
    <div className="cart-headings">
      <div className="heading-image"><strong>Picture</strong></div>
      <div className="heading-name"><strong>Name</strong></div>
      <div className="heading-base-price"><strong>Base Price</strong></div>
      <div className="heading-quantity"><strong>Quantity</strong></div>
      <div className="heading-price"><strong>Price</strong></div>
      <div className="heading-tax"><strong>Other</strong></div>
      <div className="heading-total"><strong>Total</strong></div>
    </div>
  )}

  {menuData.map((item, index) => (
    <div className="cart-item" key={index}>
      <div className="heading-image">
        <img src={item.img} alt={item.name} className="item-image" />
      </div>
      <div className="heading-name">
        <h4 className="valueStylesName">{item.name}</h4>
      </div>
      <div className="heading-base-price">
        <p className="valueStyles">₹{item.basicPrice}</p>
      </div>
      <div className="heading-quantity">
        <IconButton onClick={() => dispatch({ type: "DECREMENT", index })}>
          <RemoveIcon sx={{ color: "#FD7E4B" }} />
        </IconButton>
        <input value={String(item.qty)} readOnly className="quantity-input-cart" />
        <IconButton onClick={() => dispatch({ type: "INCREMENT", index })}>
          <AddIcon sx={{ color: "#FD7E4B" }} />
        </IconButton>
      </div>
      <div className="heading-price">
        <p className="valueStyles">₹ {item.basicPrice * item.qty}</p>
      </div>
      <div className="heading-tax">
        <p className="valueStyles">₹ {(item.basicPrice * item.qty * 0.18).toFixed(2)}</p>
      </div>
      <div className="heading-total">
        <p className="valueStyles">₹ {(item.basicPrice * item.qty * 1.18).toFixed(2)}</p>
      </div>
    </div>
  ))}
</div>
            <div className="summary-box">
              <div className="summary-row">
                <p>Subtotal</p>
                <p>{subtotal.toFixed(2)} ₹</p>
              </div>
              <div className="summary-row">
                <p>Delivery Charge:</p>
                <p>Added after address</p>
              </div>
              <div className="summary-row">
                <p>Other</p>
                <p>{GST.toFixed(2)} ₹</p>
              </div>
              <div className="summary-row">
                <p>Discount</p>
                <p>Apply Coupon in Order Summary</p>
                {/* <p>{discount} ₹</p> */}
              </div>
              <hr />
              <div className="summary-row">
                <p>Total Amount</p>
                <p>{totalAmount.toFixed(2)} ₹</p>
              </div >
              <div style={{display:'flex',justifyContent:'center'}}>
              <button 
    style={{
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      fontSize: '24px', 
      fontWeight: '600', 
      borderRadius: '20px', 
      maxWidth: '490px', 
      padding: '10px 40px', 
      width: '100%'
    }} 
    onClick={() => setIsModalOpen(true)}
  >
    <span style={{ marginRight: 'auto' }}>Checkout</span>
    <span>₹{totalAmount.toFixed(2)}</span>
  </button>
  </div>
            </div>
            {/* Modal for address selection */}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              contentLabel="Checkout Modal"
              style={{
                overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
                content: {
                  color: "black",
                  padding: "20px",
                  borderRadius: "10px",
                  maxWidth: "500px",
                  margin: "auto",
                  marginTop: "40px",
                  backgroundColor:'#FDF0DD'
                },
              }}
            >
               <button className="cancel-button top-right" onClick={() => setIsModalOpen(false)}>
    <Close sx={{ fontSize: "16px" }} />
    Close
  </button>
              <p   style={{
          fontWeight: 700,
          fontFamily: "Arial",
          fontSize: "36px",
          fontStyle: "italic",
          color: "#FD7E4B",
        }}>Select a Delivery Address</p>
              <p 
              style={{
                fontWeight: 600,
                fontFamily: "Arial",
                fontSize: "24px",
                // fontStyle: "italic",
                color: "#FD7E4B",
              }}
              >Saved Addresses</p>
              {isAuthenticated && deliveryAddresses.length > 0 ? (
                <div>
                  {deliveryAddresses.map((addressItem, index) =>
                    addressItem.address ? renderAddressItem(addressItem) : null
                  )}
                </div>
              ) : (
                <p>No delivery addresses available</p>
              )}
              <div>
                <p 
                style={{
                  fontWeight: 600,
                  fontFamily: "Arial",
                  fontSize: "24px",
                  // fontStyle: "italic",
                  color: "#FD7E4B",
                }}>Deliver To New Address </p>
                <button onClick={fetchCurrentLocation} style={{backgroundColor:'#868686'}} className="location-button">
  <AddLocation sx={{ fontSize: "24px", marginRight: "8px" }} />
  Use my current location
</button>
                {errorMsg && <p className="error-msg">{errorMsg}</p>}
                <div>
                <input
                  className="custom-input"
                  placeholder="Name"
                  value={address.name}
                  onChange={(e) => onChange("name", e.target.value)}
                />
                <input
                 className="custom-input"
                  placeholder="Phone No."
                  value={address.delivery_phone}
                  onChange={(e) => onChange("delivery_phone", e.target.value)}
                />
                <input
                 className="custom-input"
                  placeholder="Address"
                  value={address.Location}
                  onChange={(e) => onChange("Location", e.target.value)}
                />
                <input
                 className="custom-input"
                  placeholder="City"
                  value={address.City}
                  onChange={(e) => onChange("City", e.target.value)}
                />
                <input
                 className="custom-input"
                  placeholder="Pincode"
                  value={address.Pincode}
                  onChange={(e) => onChange("Pincode", e.target.value)}
                />
                <input
                 className="custom-input"
                  placeholder="Landmark"
                  value={address.Landmark}
                  onChange={(e) => onChange("Landmark", e.target.value)}
                />
                <input
                 className="custom-input"
                  placeholder="State"
                  value={address.State}
                  onChange={(e) => onChange("State", e.target.value)}
                />
                <input
                 className="custom-input"
                  placeholder="Email"
                  value={address.delivery_email}
                  onChange={(e) => onChange("delivery_email", e.target.value)}
                />
                </div>
                {/* Add other input fields similarly */}
                <button onClick={() => handleFormSubmit(address)} className="location-button">
  <PlaylistAdd sx={{ fontSize: "24px", marginRight: "8px" }} />
 Submit
</button>
              </div>
            </Modal>
          </>
        </div>
      )}
    </div>
  );
}
