// import React from 'react';
// import '../../assets/css/main.css';
// import "bootstrap-icons/font/bootstrap-icons.css";
// import Ticker from './Ticker';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <div>
//       <>
//         <div>
//           <footer id="footer" className="footer">
//             <div className="container">
//               <div className="row gy-3">
//                 <div className="col-lg-3 col-md-6 d-flex">
//                   <i className="bi bi-geo-alt icon"></i>
//                   <div>
//                     <h4>Address</h4>
//                     Resident of H No.:16-11-741/D/106,<br/>
//                     Shalivahana Nagar Malakpet,<br/>
//                     Hyderabad - 500036, Telangana.<br/>
//                     <Link to="/adminlogin" style={{ marginTop: "10px", textDecoration: "none", color: "white", cursor: "pointer", lineHeight: "1.6" }} onClick={() => window.scrollTo(0, 0)}>
//                       <button style={{ backgroundColor: "#f75f40", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px",marginTop:"20px" }}>Admin Dashboard</button>
//                       {/* <button style={{ backgroundColor: "#007bff", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}>Admin Dashboard</button> */}
//                     </Link>
//                   </div>
//                 </div>

//                 <div className="col-lg-3 col-md-6 footer-links d-flex">
//                   <i className="bi bi-telephone icon"></i>
//                   <div>
//                     <h4>Reservations</h4>
//                     <strong>Phone:</strong> +91 88851 88194<br/>
//                     <strong>Email:</strong> jaavapot@gmail.com<br/>
//                   </div>
//                 </div>

//                 {/* <div className="col-lg-3 col-md-6 footer-links d-flex">
//                   <i className="bi bi-clock icon"></i>
//                   <div>
//                     <h4>Opening Hours</h4>
//                     <p>
//                       <strong>Mon-Sat: 9AM - 9PM</strong><br/>
//                       Sunday: Closed
//                     </p>
//                   </div>
//                 </div> */}

//                 <div className="col-lg-3 col-md-6 footer-links d-flex">
//                   <i className="bi bi-file-text icon"></i>
//                   <div>
//                     <h4>Policies</h4>
//                     <p>
//                       <Link to="/privacy-policy" className="footer-link" style={{ textDecoration: "none", color: "white", cursor: "pointer", lineHeight: "1.6" }}>
//                         <i className="bi bi-shield-lock-fill" style={{ marginRight: "5px", display: "none" }}></i><strong>Privacy Policy</strong>
//                       </Link><br/>
//                       <Link to="/shipping-policy" className="footer-link" style={{ textDecoration: "none", color: "white", cursor: "pointer", lineHeight: "1.6" }}>
//                         <i className="bi bi-truck" style={{ marginRight: "5px", display: "none" }}></i><strong>Shipping & Delivery</strong>
//                       </Link><br/>
//                       <Link to="/return-policy" className="footer-link" style={{ textDecoration: "none", color: "white", cursor: "pointer", lineHeight: "1.6" }}>
//                         <i className="bi bi-arrow-return-left" style={{ marginRight: "5px", display: "none" }}></i><strong>Returns & Refund</strong>
//                       </Link><br/>
//                       <Link to="/terms-policy" className="footer-link" style={{ textDecoration: "none", color: "white", cursor: "pointer", lineHeight: "1.6" }}>
//                         <i className="bi bi-file-text" style={{ marginRight: "5px", display: "none" }}></i><strong>Terms & Conditions</strong>
//                       </Link><br/>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="col-lg-3 col-md-6 footer-links">
//                   <h4>Follow Us</h4>
//                   <div className="social-links d-flex">
//                     <a href="https://x.com/The_JaavaPot" className="twitter"><i className="bi bi-twitter"></i></a>
//                     <a href="https://www.facebook.com/JaavaPot/" className="facebook"><i className="bi bi-facebook"></i></a>
//                     <a href="https://www.instagram.com/the_jaavapot" className="instagram"><i className="bi bi-instagram"></i></a>
//                     <a href="https://in.linkedin.com/company/jaava-pot" className="linkedin"><i className="bi bi-linkedin"></i></a>
//                     <a href="https://www.youtube.com/@TheJaavaPot" className="linkedin"><i className="bi bi-youtube"></i></a>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="container">
//               <div className="copyright">
//                 &copy; Copyright <strong><span>Pago Food and Beverages</span></strong>. All Rights Reserved
//               </div>
//               <div className="credits">
//                 Designed by <a href="http://www.pagoanalytics.com/" style={{ textDecoration: "none", color: "white", cursor: "pointer" }}>JaavaPot</a>
//               </div>
//             </div>

//             <div>
//               <Ticker/>
//             </div>
//           </footer>
//         </div>
//       </>
//     </div>
//   )
// }

// export default Footer;

import React from 'react';
import '../../assets/css/main.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Ticker from './Ticker';
import { Link } from 'react-router-dom';
 
const Footer = () => {
  return (
    <div>
      <>
        <div>
          <footer id="footer" className="footer">
            <div className="container">
              <div className="row gy-3">
                <div className="col-lg-3 col-md-6 d-flex">
                  <i className="bi bi-geo-alt icon"></i>
                  <div>
                    <h4>Address</h4>
                   
                    Shalivahana Nagar Malakpet,<br/>
                    Hyderabad - 500036, Telangana.<br/>
                    {/* <Link to="/adminlogin" style={{ marginTop: "10px", textDecoration: "none", color: "white", cursor: "pointer", lineHeight: "1.6" }} onClick={() => window.scrollTo(0, 0)}> */}
                      {/* <button style={{ backgroundColor: "#f75f40", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px",marginTop:"20px" }}>Admin Dashboard</button> */}
                      {/* <button style={{ backgroundColor: "#007bff", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}>Admin Dashboard</button> */}
                    {/* </Link> */}
                  </div>
                </div>
 
                <div className="col-lg-3 col-md-6 footer-links d-flex">
                  <i className="bi bi-telephone icon"></i>
                  <div>
                    <h4>Reservations</h4>
                    <strong>Phone:</strong> +91 79893 55998<br/>
                    <strong>Email:</strong> help@thejaavapot.com<br/>
                  </div>
                </div>
 
                {/* <div className="col-lg-3 col-md-6 footer-links d-flex">
                  <i className="bi bi-clock icon"></i>
                  <div>
                    <h4>Opening Hours</h4>
                    <p>
                      <strong>Mon-Sat: 9AM - 9PM</strong><br/>
                      Sunday: Closed
                    </p>
                  </div>
                </div> */}
 
                <div className="col-lg-3 col-md-6 footer-links d-flex">
                  <i className="bi bi-file-text icon"></i>
                  <div>
                    <h4>Policies</h4>
                    <p>
                      <Link to="/privacy-policy" className="footer-link" style={{ textDecoration: "none", color: "white", cursor: "pointer", lineHeight: "1.6" }}>
                        <i className="bi bi-shield-lock-fill" style={{ marginRight: "5px", display: "none" }}></i><strong>Privacy Policy</strong>
                      </Link><br/>
                      <Link to="/shipping-policy" className="footer-link" style={{ textDecoration: "none", color: "white", cursor: "pointer", lineHeight: "1.6" }}>
                        <i className="bi bi-truck" style={{ marginRight: "5px", display: "none" }}></i><strong>Shipping & Delivery</strong>
                      </Link><br/>
                      <Link to="/return-policy" className="footer-link" style={{ textDecoration: "none", color: "white", cursor: "pointer", lineHeight: "1.6" }}>
                        <i className="bi bi-arrow-return-left" style={{ marginRight: "5px", display: "none" }}></i><strong>Returns & Refund</strong>
                      </Link><br/>
                      <Link to="/terms-policy" className="footer-link" style={{ textDecoration: "none", color: "white", cursor: "pointer", lineHeight: "1.6" }}>
                        <i className="bi bi-file-text" style={{ marginRight: "5px", display: "none" }}></i><strong>Terms & Conditions</strong>
                      </Link><br/>
                    </p>
                  </div>
                </div>
 
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>Follow Us</h4>
                  <div className="social-links d-flex">
                    <a href="https://x.com/The_JaavaPot" className="twitter"><i className="bi bi-twitter"></i></a>
                    <a href="https://www.facebook.com/JaavaPot/" className="facebook"><i className="bi bi-facebook"></i></a>
                    <a href="https://www.instagram.com/the_jaavapot" className="instagram"><i className="bi bi-instagram"></i></a>
                    <a href="https://in.linkedin.com/company/jaava-pot" className="linkedin"><i className="bi bi-linkedin"></i></a>
                    <a href="https://www.youtube.com/@TheJaavaPot" className="linkedin"><i className="bi bi-youtube"></i></a>
                  </div>
                </div>
              </div>
            </div>
 
            <div className="container">
              <div className="copyright">
                &copy; Copyright <strong><span>Pago Food and Beverages</span></strong>. All Rights Reserved
              </div>
              <div className="credits">
                Designed by <a href="http://www.pagoanalytics.com/" style={{ textDecoration: "none", color: "white", cursor: "pointer" }}>JaavaPot</a>
              </div>
            </div>
 
            <div>
              <Ticker/>
            </div>
          </footer>
        </div>
      </>
    </div>
  )
}
 
export default Footer;