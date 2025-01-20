import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner, Image } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../store/AuthContext';
import { ApiPath } from '../../config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "./profile.css";
import { ArrowBackIosNew } from '@mui/icons-material';
import { myColors } from '../../contants/Colors';

export default function EditProfile() {
  const { user, updateUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  
  const [fullName, setFullName] = useState(user ? user.fullName : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [gender, setGender] = useState(user ? user.Gender : '');
  const [age, setAge] = useState(user ? user.age : '');
  const [profilePic, setProfilePic] = useState(user ? user.profile_picture : '');

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    setBtnLoading(true);
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('gender', gender);
      formData.append('age', age);
      formData.append('profile_picture', profilePic);

      const response = await axios.put(`${ApiPath}/jaavapotuser/update-user`, formData);
      if (response.status === 200) {
        const updatedUserData = { ...user, fullName, email, phone, Gender: gender, age, profile_picture: profilePic };
        await updateUser(updatedUserData);
        toast.success('Profile updated successfully');
        navigate('/Profile');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating the profile');
    } finally {
      setLoading(false);
      setBtnLoading(false);
    }
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
    !isAuthenticated ? (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "#FDF0DD",padding:"50px" }}>
        <h6 className="mb-3">You must be logged in to edit your profile.</h6>
        <Button variant="primary" onClick={() => navigate('/login')}>Go to Login</Button>
      </div>
    ) : (
      <div style={{padding:"50px" }}>
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
          Edit Profile
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
        <div className="d-flex justify-content-center mb-4">
          <div className="position-relative">
            <label htmlFor="profilePic" className="position-relative">
              <input hidden accept="image/*" type="file" id="profilePic" onChange={handleImageUpload} />
              {profilePic ? (
                <Image src={profilePic} alt="Profile" roundedCircle style={{ width: '150px', height: '150px' }} />
              ) : (
                <i className="bi bi-person-circle" style={{ fontSize: '120px', color: '#ABABAB' }}></i>
              )}
            </label>
            <i className="bi bi-camera-fill position-absolute bottom-0 end-0 rounded-circle p-2" style={{ backgroundColor: "#F67939", cursor: "pointer",color:'white'  }}></i>
          </div>
        </div>

        <Form>
          <Form.Group controlId="formFullName" className="mb-3">
            <Form.Label style={labelStyle}>Full Name</Form.Label>
            <Form.Control style={valueStyle} type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPhone" className="mb-3">
            <Form.Label style={labelStyle}>Phone Number</Form.Label>
            <Form.Control style={valueStyle} type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formAge" className="mb-3">
            <Form.Label style={labelStyle}>Age</Form.Label>
            <Form.Control style={valueStyle} type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formGender" className="mb-3">
            <Form.Label style={labelStyle}>Gender</Form.Label>
            <div style={valueStyle}>
              <Form.Check inline label="Male" name="gender" type="radio" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
              <Form.Check inline label="Female" name="gender" type="radio" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
              <Form.Check inline label="Other" name="gender" type="radio" value="Other" checked={gender === 'Other'} onChange={(e) => setGender(e.target.value)} />
            </div>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label style={labelStyle}>Email</Form.Label>
            <Form.Control style={valueStyle} type="email" placeholder="Email" value={email} disabled />
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
        <button
  type="button"
  className="btn custom-btn"
  onClick={handleUpdateProfile}
  disabled={btnLoading}
>
  {btnLoading ? (
    <>
      <Spinner animation="border" size="sm" /> Saving Changes...
    </>
  ) : (
    "Save Changes"
  )}
</button>
        </div>
        </Form>
      </div>
    )
  );
}

