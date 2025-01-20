import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../components/admin/styles/adminlogin.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ApiPath } from '../../config';
import { toast} from 'react-toastify';
import { useAuth } from '../../store/AuthContext';


function Login() {
const navigate=useNavigate();
const { login } = useAuth();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
    e.preventDefault();
    // const response = await fetch(`http://localhost:3000/jaavapotuser/login`, {
      const response = await fetch(`${ApiPath}jaavapotuser/login`, {
      // const response = await fetch("https://pagoanalytics.azurewebsites.net/jaavapotuser/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })

    });
    const json = await response.json()
 console.log('response',response.status);
    if (response.status===200) {
      await login(json.user, json.token, email);
      //save the auth toke to local storage and redirect
      // localStorage.setItem('userEmail', email)
      // localStorage.setItem('token', json.token)
      // console.log('response',response.oken);
      // console.log('json.authToken',json.token);
      navigate("/");
      // alert("Success, You have successfully logged in");
      toast.success("Success, You have successfully logged")
    }
    else {
      toast.error("Enter Valid Credentials")
      // alert("Enter Valid Credentials")
    }
  }

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
 
  return (
    <div className='login-container'>
    <Form  onSubmit={handleLogin} className='formbgnew'>
    <h2 style={{textAlign:"center"}}>User Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email </Form.Label>
        <Form.Control type="email"   id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
       
         id="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
        placeholder="Password" />
      </Form.Group>
   
      <Button variant="primary" type="submit">
        Login
      </Button>
 
      <p style={{textAlign:"center",}}>Please  SignUp before Login  
      <Link to="/signup"> Click Here</Link>
      </p>
 
    </Form>
   {/* <ToastContainer/> */}
    </div>
  );
}
 
export default Login;