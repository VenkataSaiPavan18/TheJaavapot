// - 18/11/24
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../components/admin/styles/adminlogin.css";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import './AuthStyles.css';
import { ApiPath } from '../../config';  // Assuming you have ApiPath defined for your API base URL
import { myColors } from "../../contants/Colors";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // true for Login, false for Signup
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // For signup
  const [phone, setPhone] = useState(""); // For signup
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [otp, setOTP] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendOTPDisabled, setIsSendOTPDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);

  const toggleForgotPass = () => {
    setForgotPass(prevState => !prevState);
  };

  // Login API call logic
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ApiPath}jaavapotuser/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const json = await response.json();
      if (response.status === 200) {
        await login(json.user, json.token, email);
        toast.success("Success, You have successfully logged in");
        navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Server error, please try again later.");
    }
  };

  // Signup API call logic
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isEmailVerified) {
      toast.warning("Please verify your email before signing up.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);

      const response = await fetch(`${ApiPath}jaavapotuser/register`, {
        method: "POST",
        body: formData
      });

      if (response.status === 201) {
        toast.success("Successfully signed up! Logging you in...");
        handleLoginAfterRegistration(email, password);
      } else {
        toast.error("Email already exists or invalid data.");
      }
    } catch (error) {
      toast.error("Server error, please try again later.");
    }
  };

  const handleLoginAfterRegistration = async (email, password) => {
    try {
      const response = await fetch(`${ApiPath}jaavapotuser/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
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
      toast.error("Server error.");
    }
  };

  const generateRandomOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOTP = async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }

    const newOTP = generateRandomOTP();
    setGeneratedOTP(newOTP);
    setIsSendOTPDisabled(true);

    try {
      const response = await fetch(`${ApiPath}jaavapototp/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailid: email, otpnumber: newOTP })
      });

      if (response.ok) {
        toast.success("OTP sent to your email.");
      } else {
        toast.error("Error sending OTP.");
        setIsSendOTPDisabled(false);
      }
    } catch (error) {
      toast.error("Server error.");
      setIsSendOTPDisabled(false);
    }
  };

  const handleVerifyOTP = () => {
    if (otp === generatedOTP) {
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailVerified(false); // Set isEmailVerified to false when email changes
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetPasswordHandler = async () => {
    try {
      const response = await fetch(`${ApiPath}jaavapotuser/update-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ email, newPassword:password })
      });
      const json = await response.json();
      if (response.status === 200) {
        // await login(json.user, json.token, email);
        toast.success("You have Reset Password successfully");
        handleLoginAfterRegistration(email, password);
        // navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Server error.");
    }
  };


  return (
    <div className="login-signup-container" style={styles.container}>
      <div className="background-image" style={styles.backgroundImage}>
        {/* Category Toggle */}
        <div className="toggle-container" >
        {/* <div style={styles.toggleContainer}> */}
          <div
            onClick={() => setIsLogin(true)}
            style={isLogin ? styles.activeCategory : styles.inactiveCategory}
          >
            Log In
          </div>
          <div
            onClick={() => setIsLogin(false)}
            style={!isLogin ? styles.activeCategory : styles.inactiveCategory}
          >
            Sign Up
          </div>
        </div>

        {/* Form */}
        <div className="form-container" style={styles.formContainer}>
          {isLogin ? (
            <>
              {/* <div>
      <button onClick={toggleForgotPass}>
        {forgotPass ? 'Hide Forgot Password' : 'Show Forgot Password'}
      </button>
    </div> */}
                
            { !forgotPass &&
            
            <Form onSubmit={handleLogin}>
              {/* <h2 style={styles.formTitle}>User Login</h2> */}

              <Form.Group controlId="formBasicEmail" style={styles.inputField}>
                {/* <FaEnvelope style={styles.inputIcon} /> */}
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.valueStyle}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" style={styles.inputField}>
              <div style={styles.passwordInputContainer}>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.valueStyle}
                />
                <span onMouseDown={togglePasswordVisibility} onMouseUp={togglePasswordVisibility}>
                  {showPassword ? (
                    <FaEyeSlash style={styles.eyeIcon} />
                  ) : (
                    <FaEye style={styles.eyeIcon} />
                  )}
                </span>
              </div>
            </Form.Group>
            <div onClick={toggleForgotPass} style={styles.forgotPassword}>Forgot Password?</div>
             <Button variant="primary" type="submit" style={styles.button}>
                Login
              </Button>
            </Form>}
             {forgotPass &&  <div>
              <Form >
              {/* <Form onSubmit={handleSignup}> */}
              <div onClick={toggleForgotPass} style={styles.forgotPassword}>I know my passwrd</div>
              <Form.Group controlId="formBasicEmail" style={styles.inputField}>
                {/* <FaEnvelope style={styles.inputIcon} /> */}
                <Form.Control
                  type="email"
                  placeholder="Enter registered email create new pass"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  style={styles.valueStyle}
                />
              </Form.Group>
 {!isEmailVerified && (
              <Button
                onClick={handleSendOTP}
                disabled={isSendOTPDisabled}
                style={styles.button}
              >
                Send OTP
              </Button>
    )}
     {!isEmailVerified && (
              <Form.Group controlId="formOTP" style={styles.inputField}>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  required
                  style={styles.valueStyle}
                />
              </Form.Group>
                  )}
                    {!isEmailVerified && (
                <Button
                  onClick={handleVerifyOTP}
                  disabled={otp.length === 0}
                  style={styles.button}
                >
                  Verify OTP
                </Button>
            )}

<Form.Group controlId="formBasicPassword" style={styles.inputField}>
              <div style={styles.passwordInputContainer}>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.valueStyle}
                />
                <span onMouseDown={togglePasswordVisibility} onMouseUp={togglePasswordVisibility}>
                  {showPassword ? (
                    <FaEyeSlash style={styles.eyeIcon} />
                  ) : (
                    <FaEye style={styles.eyeIcon} />
                  )}
                </span>
              </div>
            </Form.Group>
              <Button variant="primary"  style={styles.button} onClick={resetPasswordHandler}>
                Reset
              </Button>
            </Form>
              </div>}
             </>
          ) : (
            <Form onSubmit={handleSignup}>
              {/* <h2 style={styles.formTitle}>User Signup</h2> */}

              <Form.Group controlId="formFullName" style={styles.inputField}>
                {/* <FaUser style={styles.inputIcon} /> */}
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  style={styles.valueStyle}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail" style={styles.inputField}>
                {/* <FaEnvelope style={styles.inputIcon} /> */}
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  style={styles.valueStyle}
                />
              </Form.Group>
 {!isEmailVerified && (
              <Button
                onClick={handleSendOTP}
                disabled={isSendOTPDisabled}
                style={styles.button}
              >
                Send OTP
              </Button>
    )}
     {!isEmailVerified && (
              <Form.Group controlId="formOTP" style={styles.inputField}>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  required
                  style={styles.valueStyle}
                />
              </Form.Group>
                  )}
                    {!isEmailVerified && (
                <Button
                  onClick={handleVerifyOTP}
                  disabled={otp.length === 0}
                  style={styles.button}
                >
                  Verify OTP
                </Button>
            )}

<Form.Group controlId="formBasicPassword" style={styles.inputField}>
              <div style={styles.passwordInputContainer}>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.valueStyle}
                />
                <span onMouseDown={togglePasswordVisibility} onMouseUp={togglePasswordVisibility}>
                  {showPassword ? (
                    <FaEyeSlash style={styles.eyeIcon} />
                  ) : (
                    <FaEye style={styles.eyeIcon} />
                  )}
                </span>
              </div>
            </Form.Group>
              <Button variant="primary" type="submit" style={styles.button}>
                Signup
              </Button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
  },
  backgroundImage: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    background: "url('your-image-url.jpg') no-repeat center center/cover",
  },
  activeCategory: {
    fontFamily: "Arial",
    fontSize: "44px",
    fontWeight: 700,
    lineHeight: "73.59px",
    textAlign: "left",
    color: "#FD7E4B",
    borderBottom: "2px solid #FD7E4B",
    marginRight: "40px",
    cursor: "pointer",
  },
  inactiveCategory: {
    fontFamily: "Arial",
    fontSize: "44px",
    fontWeight: 700,
    lineHeight: "73.59px",
    textAlign: "left",
    color: "#C8D5D2",
    marginRight: "40px",
    cursor: "pointer",
  },
  formContainer: {
    // backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px",
    // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "100%",
    // marginLeft:'50px'
  },
  formTitle: {
    marginBottom: "20px",
    fontSize: "32px",
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  inputField: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  inputIcon: {
    marginRight: "10px",
    color: "#999",
  },
  input: {
    flex: 1,
    borderRadius: "12px",
    border: "1px solid #CDCDCD",
    padding: "10px 15px",
    fontSize: "16px",
    color: "#000",
  },
  button: {
    width: "300px",
    height: "55px",
       marginBottom:"30px",
    // padding: "12px 64px",
    borderRadius: "25px",
    backgroundColor: "#FD7E4B",
    fontFamily: "Lufga",
    fontSize: "26px",
    fontWeight: 600,
    color: "#FFFFFF",
    cursor: "pointer",
    // backgroundColor: "#FD7E4B",
    // borderColor: "#FD7E4B",
    // padding: "10px 20px",
    // width: "100%",
    // marginTop: "20px",
    // fontSize: "18px",
    // fontWeight: "700",
    // color: "#fff",
    // borderRadius: "5px",
    // cursor: "pointer",
  },
  valueStyle : {
    fontFamily: "Arial",
    fontSize: "22px",
    fontWeight: "400",
    lineHeight: "42px",
    // letterSpacing: "0.05em",
    textAlign: "left",
    color: myColors.primaryNavy,
  },
    inputField: {
        marginBottom:"30px"
    },
    eyeIcon: {
      position: "absolute",
      top: "15px",
      right: "15px",
      cursor: "pointer",
      color: "#999",
      fontSize:'25px',
    },
    passwordInputContainer: {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    forgotPassword: {
      color: "#6A707C",
      textAlign: "right",
      marginBottom: 10,
      fontSize: 18,
    },
};

export default AuthPage;
