import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { ApiPath } from "../../config";
import { toast } from "react-toastify";
import "./profile.css";
import { Spinner } from "react-bootstrap";
import { ArrowBackIosNew } from "@mui/icons-material";
import { myColors } from "../../contants/Colors";

const AddAddressScreen = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { email, delivery_Addresses } = user;

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryEmail, setEmail] = useState("");

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const generateRandomId = () => Math.floor(1000 + Math.random() * 9000).toString();

  const validateInputs = () => {
    if (!name || !city || !location || !state || !landmark || !pincode || !phone) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleUpdateProfile = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const newAddress = {
        Id: generateRandomId(),
        name,
        City: city,
        Location: location,
        State: state,
        Landmark: landmark,
        Pincode: pincode,
        delivery_phone: phone,
        delivery_email: deliveryEmail,
      };

      const requestBody = {
        email,
        newAddress,
      };

      const response = await axios.put(`${ApiPath}/jaavapotuser/add-address`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Address added successfully");
        const updatedAddresses = [...delivery_Addresses, { address: newAddress }];
        updateUser({ ...user, delivery_Addresses: updatedAddresses });
        navigate("/Profile");
      } else {
        toast.error("Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("An error occurred while adding the address");
    } finally {
      setLoading(false);
    }
  };

  const valueStyle = {
    fontFamily: "Arial",
    fontSize: "20px",
    fontWeight: "400",
    lineHeight: "42px",
    letterSpacing: "0.05em",
    textAlign: "left",
    color: myColors.primaryNavy,
  };

  return (
    <div style={{ padding:"50px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p
          style={{
            fontWeight: 700,
            fontFamily: "Arial",
            fontSize: "36px",
            fontStyle: "italic",
            color: "#FD7E4B",
          }}
        >
          Add Address
        </p>
        <div
          onClick={() => navigate(-1)}
          //  onClick={()=> navigate('/milletproducts')}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor: "#FF9A7233",
            padding: "10px",
            borderRadius: "15px",
          }}
        >
          <ArrowBackIosNew style={{ color: "#000", fontSize: "20px" }} />
          <span
            style={{
              marginLeft: "8px",
              fontSize: "16px",
              color: "#0D0D0D",
              fontWeight: 400,
              fontFamily: "Arial",
            }}
          >
            Back
          </span>
        </div>
      </div>
      {/* <h2 className="mb-4" style={{ fontWeight: "bold", color: "#FD7E4B" }}>Add Address</h2> */}
      <form>
        {/* Full Name and Email in a single row */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="name" style={labelStyle}>Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={valueStyle}
            />
          </div>
          <div className="col">
            <label htmlFor="email" style={labelStyle}>Email (Optional)</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={deliveryEmail}
              onChange={(e) => setEmail(e.target.value)}
              style={valueStyle}
            />
          </div>
        </div>

        {/* Phone Number and City in a single row */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="phone" style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={valueStyle}
            />
          </div>
          <div className="col">
            <label htmlFor="city" style={labelStyle}>City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={valueStyle}
            />
          </div>
        </div>

        {/* State, Pincode, and Landmark in a single row */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="state" style={labelStyle}>State</label>
            <input
              type="text"
              className="form-control"
              id="state"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              style={valueStyle}
            />
          </div>
          <div className="col">
            <label htmlFor="pincode" style={labelStyle}>Pincode</label>
            <input
              type="number"
              className="form-control"
              id="pincode"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              style={valueStyle}
            />
          </div>
          <div className="col">
            <label htmlFor="landmark" style={labelStyle}>Landmark</label>
            <input
              type="text"
              className="form-control"
              id="landmark"
              placeholder="Landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              style={valueStyle}
            />
          </div>
        </div>

        {/* Location (Address) */}
        <div className="form-group mb-3">
          <label htmlFor="location" style={labelStyle}>Address</label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={valueStyle}
          />
        </div>

        {/* Save Address Button */}
        <div className="d-flex justify-content-end mt-4">
        <button
  type="button"
  className="btn custom-btn"
  onClick={handleUpdateProfile}
  disabled={loading}
>
  {loading ? (
    <>
      <Spinner animation="border" size="sm" /> Saving Address...
    </>
  ) : (
    "Save Address"
  )}
</button>

        </div>
      </form>
    </div>
  );
};

const labelStyle = {
  fontFamily: "Arial",
  fontSize: "24px",
  fontWeight: "400",
  lineHeight: "42px",
  letterSpacing: "0.05em",
  textAlign: "left",
  color: "#5C5C5C",
};

export default AddAddressScreen;
