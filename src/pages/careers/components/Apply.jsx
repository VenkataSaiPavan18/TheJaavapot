import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import "./apply.css";
import career from '../../../assets/img/careers/Career.png'
function Apply() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [errors, setErrors] = useState({});
  const { jobTitle } = useParams();

  

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleCityChange = (event) => {
    setCity(event.target.value);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setResume(file);
  };

  const handleCoverLetterChange = (event) => {
    setCoverLetter(event.target.value);
  };

  const validateInputs = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!resume) {
      errors.resume = "Resume is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('city', city);
        formData.append('resume', resume);
        formData.append('coverLetter', coverLetter);
        formData.append('jobTitle', jobTitle);
        const response = await axios.post('https://pagoanalytics.azurewebsites.net//post-application', formData);
        console.log(response.data);
        alert('Application submitted successfully!');
        setName("");
        setPhone("");
        setEmail("");
        setCity("");
        setResume(null);
        setCoverLetter("");
        setErrors({});

        navigate('/careers');
        // Optionally, you can redirect the user to a success page
      } catch (error) {
        console.error('Error submitting application:', error);
        alert('Error submitting application. Please try again later.');
        // Handle error, show error message to the user, etc.
      }
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }



  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="applybg ">
        <div style={{display:'flex',justifyContent:'right'}}>
          <button onClick={handleBack} style={{ padding: '10px 20px', cursor: 'pointer' }}>Back</button>
        </div>
        <h3>{jobTitle}-Job Application</h3>
        <p style={{ fontSize: "12px" }}>Please Complete the application accurately</p>
        <div className="row" style={{ width: "100%" }}>
          <div className="col-12 col-md-6">
            <form onSubmit={handleSubmit}>
              <h5>Personal Information</h5>
              <label  style={{ marginRight: "50px" ,width:'100%'}}>
                Name
                <span style={{ color: 'red' }}>*</span>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  required
                  onChange={handleNameChange}
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </label>
              <label  style={{ marginRight: "50px",width:'100%' }}>
                Job Title
                <input
                  type="text"
                  className="form-control"
                  name="jobTitle"
                  value={jobTitle}
                  readOnly
                />
              </label>
              <label  style={{ marginRight: "50px",width:'100%' }}>
                Phone
                <span style={{ color: 'red' }}>*</span>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  value={phone}
                  required
                  onChange={handlePhoneChange}
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </label>
              <label className="col-12" style={{ marginRight: "50px",width:'100%' }}>
                Email
                <span style={{ color: 'red' }}>*</span>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  required
                  onChange={handleEmailChange}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </label>
              <label className="col-12" style={{ marginRight: "50px",width:'100%' }}>
                City
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={city}
                  onChange={handleCityChange}
                />
              </label>
              <hr />
              <h5>Resume</h5>
              <label style={{width:"100%"}}>
                Upload Resume
                <span style={{ color: 'red' }}>*</span>
                <input
                  type="file"
                  className="form-control"
                  name="resume"
                  required
                  accept=".pdf, .doc, .docx" // Specify the accepted file types
                  onChange={handleFileChange}
                />
                {errors.resume && <p className="error-message">{errors.resume}</p>}
              </label>
              <hr />
              <h5>Additional Details</h5>
              <label className="message" style={{width:"100%"}} >
                Cover Letter
                <br/>
                <textarea
                  rows="5"
                  cols="70"
                  className="form-control"
                  name="coverLetter"
                  value={coverLetter}
                  onChange={handleCoverLetterChange}
                />
              </label>
              <input type="submit" className="btn" style={{ color: "#4077bc", backgroundColor: "white", fontWeight: "bold" }} />
            </form>
          </div>
          <div className="col-md-5 d-none d-lg-block " style={{ display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center",width:'500px' }}>
            <img src={career} className="jobimg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Apply;
