import React, { useEffect, useState } from "react";
import { Form, Button, Spinner, Image } from "react-bootstrap";
import { useAuth } from "../../store/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./profile.css"; // Assuming we use the same profile.css for both components
import { ApiPath } from "../../config";
import { ArrowBackIosNew } from "@mui/icons-material";
import { myColors } from "../../contants/Colors";

export default function Profile() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user, login } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

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

  const deleteUser = async () => {
    const email = user.email;
    try {
      const response = await fetch(`${ApiPath}jaavapotuser/user/${email}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("User deleted successfully.");
        logout();
        navigate("/Login");
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the user.");
    }
  };

  // const confirmDelete = () => setModalVisible(true);
    const confirmDelete = () => {
    setModalVisible(true);  // Show confirmation modal
  };

  const renderRadioButton = (value, label) => (
    <label style={{ marginRight: 20, display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type="radio"
          checked={user.Gender === value}
          readOnly
          style={{
            appearance: 'none',
            width: 20, // slightly increased size for better visibility
            height: 20,
            borderRadius: '50%',
            border: '2px solid #F67939',
            marginRight: 8,
            display: 'inline-block',
            position: 'relative',
          }}
        />
        {user.Gender === value && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '40%',
              transform: 'translate(-50%, -50%)',
              width: 12,
              height: 12,
              backgroundColor: '#F67939',
              borderRadius: '50%',
            }}
          ></div>
        )}
      </div>
      {label}
    </label>
  );

  // const renderRadioButton = (value, label) => (
  //   <label style={{ marginRight: 20 }}>
  //     <input type="radio" color checked={user.Gender === value} readOnly />
  //     {label}
  //   </label>
  // );

  const renderAddressItem = (item) => {
    const {
      name,
      Location,
      Landmark,
      City,
      State,
      Pincode,
      delivery_phone,
      delivery_email,
    } = item.address;
    return (
      <div className="address-item" style={{ marginBottom: 16 }}>
        <h4>{name}</h4>
        <p>{`${Location}, ${Landmark}`}</p>
        <p>{`${City}, ${State} - ${Pincode}`}</p>
        <p>{`Phone: ${delivery_phone}`}</p>
        {delivery_email && <p>{`Email: ${delivery_email}`}</p>}
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-error-container">
        <h2>You are not logged in. Please log in to access your profile.</h2>
        <button className="custom-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    );
  }

  const labelStyle = {
    fontFamily: "Arial",
    fontSize: "24px",
    fontWeight: "400",
    lineHeight: "42px",
    letterSpacing: "0.05em",
    textAlign: "left",
    color: "#5C5C5C",
  };
  const valueStyle = {
    fontFamily: "Arial",
    fontSize: "24px",
    fontWeight: "400",
    lineHeight: "42px",
    letterSpacing: "0.05em",
    textAlign: "left",
    color: myColors.primaryNavy,
  };

  return (
    <div
      className="profile-container"
      style={{  padding: "50px" }}
    >
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
          My Profile
        </p>
        <div
          onClick={() => navigate('/')}
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

      <div className="d-flex justify-content-center mb-4">
        <div className="position-relative">
          <label htmlFor="profilePic" className="position-relative">
            {/* <input hidden accept="image/*" type="file" id="profilePic" onChange={handleImageUpload} /> */}
            {user.profile_picture ? (
              <Image
                src={user.profile_picture}
                alt="Profile"
                roundedCircle
                style={{ width: "150px", height: "150px" }}
              />
            ) : (
              <i
                className="bi bi-person-circle"
                style={{ fontSize: "120px", color: "#ABABAB" }}
              ></i>
            )}
          </label>
          <div onClick={() => navigate("/EditProfile")}>
            <i
              className="bi bi-pencil-fill position-absolute bottom-0 end-0 rounded-circle p-2"
              style={{ backgroundColor: "#F67939", cursor: "pointer",color:'white' }}
            ></i>
          </div>
        </div>
      </div>

      {/* <div className="profile-picture-container">
                {user.profile_picture ? (
                    <img src={user.profile_picture} alt="Profile" className="profile-img" />
                ) : (
                    <i className="bi bi-person-circle default-profile-icon"></i>
                )}
                <button onClick={() => navigate("/EditProfile")} className="edit-profile-btn">
                    <i className="bi bi-camera-fill"></i>
                </button>
            </div> */}
      <form>
        <div className="row mb-3">
          <label style={labelStyle}>Name</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={user.fullName}
              readOnly
              style={valueStyle}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label style={labelStyle}>Email</label>
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              value={user.email}
              readOnly
              style={valueStyle}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label style={labelStyle}>Phone</label>
          <div className="input-group">
            <input
              className="form-control"
              type="tel"
              value={user.phone}
              readOnly
              style={valueStyle}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label style={labelStyle}>Age</label>
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              value={user.age}
              readOnly
              style={valueStyle}
            />
          </div>
        </div>
<div className="row mb-3">
        <label style={labelStyle}>Gender</label>
        <div className="form-group gender-group" style={valueStyle}>
          
          {renderRadioButton("Male", "Male")}
          {renderRadioButton("Female", "Female")}
          {renderRadioButton("Other", "Other")}
        </div>
        </div>

        {user.delivery_Addresses.map((item) => renderAddressItem(item))}

        <div className="action-buttons">
          <button
            onClick={() => navigate("/EditProfile")}
            className="custom-btn"
          >
            
            Edit Profile
          </button>
          <button
            onClick={() => navigate("/AddAddress")}
            className="custom-btn"
          >
            Add Address
          </button>

        </div>
      </form>
      {/* <div style={{display:'block'}}> */}
      <button style={{ display: 'block', padding: 15, margin: '20px auto'}} onClick={confirmDelete} className="custom-dlt-btn">
          Delete Account
        </button>
      {/* </div> */}
   
      {/* {modalVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <button
              onClick={() => setModalVisible(false)}
              className="custom-btn"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setModalVisible(false);
                deleteUser();
              }}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      )} */}

{modalVisible && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 8 }}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <button onClick={() => setModalVisible(false)} style={{ marginRight: 10 }}>Cancel</button>
            <button onClick={() => { setModalVisible(false); deleteUser(); }}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
