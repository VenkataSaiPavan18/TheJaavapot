import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../components/admin/styles/adminlogin.css";
import { Link, useNavigate } from "react-router-dom";
import { ApiPath } from "../../config";
import { toast } from "react-toastify";
import { useAuth } from "../../store/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false); // New state to track email verification
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [sendOTPTimer, setSendOTPTimer] = useState(null);
  const [isSendOTPDisabled, setIsSendOTPDisabled] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailVerified(false); // Set isEmailVerified to false when email changes
  };


  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!isEmailVerified) {
      toast.warning("Please verify your email before registering.");
      return;
    }

    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("location", address);

      const response = await fetch(`${ApiPath}jaavapotuser/register`, {
        method: "POST",
        body: formData, // Send formData directly in the body
      });

      if (response.status === 201) {
        toast.success(
          "Success, You have successfully registered. Please login."
        );
        handleLoginAfterRegistration(email, password);
        // navigate("/login");
      } else if (response.status === 400) {
        toast.error("Email already exists. Please provide a different email.");
      } else {
        toast.error("Enter valid credentials.");
        console.log();
      }
    } catch (error) {
      console.error("Error:", error.message || "Server error");
    }
  };

  const handleLoginAfterRegistration = async (email, password) => {
    try {
      const response = await fetch(`${ApiPath}jaavapotuser/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      if (response.status === 200) {
        await login(json.user, json.token, email);
        toast.success("You have successfully logged in!");
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.message || "Server error");
    }
  };


  const generateRandomNumber = () => {
    let result = "";
    for (let i = 0; i < 5; i++) {
      const digit = Math.floor(Math.random() * 10);
      result += digit;
    }
    return result;
  };

  const validateEmail = (email) => {
    // Simple email validation using a regular expression
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendOTP = async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid email format. Please enter a valid email address.");
      return;
    }

    const newOTP = generateRandomNumber(); // Generate a new OTP
    console.log(newOTP);
    setIsSendOTPDisabled(true);
    setGeneratedOTP(newOTP);

    // Set a timer to enable the "Send OTP" button after one minute
    const timer = setTimeout(() => {
      setIsSendOTPDisabled(false);
    }, 30000); // 60,000 milliseconds = 1 minute
    setSendOTPTimer(timer);

    try {
      const response = await fetch(`${ApiPath}jaavapototp/send-email`, {
        // const response = await fetch("https://pagoanalytics.azurewebsites.net/jaavapototp/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailid: email, otpnumber: newOTP }), // Send email to receive OTP
      });
      if (response.ok) {
        toast.success("OTP sent successfully to your email.");
        // Email sent successfully, enable register button
      } else {
        const data = await response.json();
        toast.error(data.message || "Error sending OTP");
      }
    } catch (error) {
      console.error("Error:", error.message || "Server error");
    }
  };

  useEffect(() => {
    return () => {
      // Clear the timer when the component unmounts to prevent memory leaks
      if (sendOTPTimer) {
        clearTimeout(sendOTPTimer);
      }
    };
  }, []);

  const checkOTP = () => {
    // const enteredOTP = otp.join('');
    // navigation.navigate("Welcome",{TempEmail});
    if (otp === generatedOTP) {
      // Compare with the stored OTP

      // setMessage('OTP matches. Navigating to the registration screen...');
      // navigation.navigate('Welcome',{email});
      setIsEmailVerified(true);
      setOTP("");
      setGeneratedOTP("SecuRinG");
      toast.success(
        "Success OTP matches. Please Fill other detail and Register..."
      );
    } else {
      toast.error(
        "OTP does not match. Please Genearte a new OTP and continue."
      );
      setOTP("");
      setGeneratedOTP("SecuRinG");
      // setMessage('OTP does not match. Please Genearte a new OTP and continue.');
    }
  };

  return (
    <div className="admin-container">
      <Form onSubmit={handleRegistration} className="formbgnew">
        <h2 style={{ textAlign: "center" }}>User SignUp</h2>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>
            Email address {isEmailVerified ? "Verified" : "Not Verified"}
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            required
            onChange={handleEmailChange}
          />
          {!isEmailVerified && (
            <Button
              onClick={handleSendOTP}
              disabled={!validateEmail(email) || isSendOTPDisabled}
            >
              {isSendOTPDisabled ? "Re-send OTP" : "Send OTP"}
            </Button>
          )}
        </Form.Group>
        {/* Input field to capture OTP */}
        {!isEmailVerified && (
          <Form.Group className="mb-3" controlId="otp">
            <Form.Label>OTP</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              // Disable if email is not verified
            />
            <Button
              onClick={checkOTP}
              disabled={!validateEmail(email)}
              // <Button onClick={checkOTP} disabled={!validateEmail(email) || isSendOTPDisabled}
            >
              Submit OTP
            </Button>
          </Form.Group>
        )}
        {/* <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your phone number"
                        value={phone}
                        required
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Group> */}
        {/* <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group> */}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {/* Enable register button only after email is verified */}
        {isEmailVerified ? (
          <Button variant="primary" type="submit" disabled={!isEmailVerified}>
            Register
          </Button>
        ) : (
          "Please Verify Email to Submit"
        )}

        <p style={{ textAlign: "center" }}>
          Already Signed Up? Please Login
          <Link to="/login"> Click Here</Link>
        </p>
      </Form>
    </div>
  );
}

export default Signup;
