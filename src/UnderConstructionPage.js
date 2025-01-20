import React, { useState, useEffect } from 'react';
import logo from "./assets/img/logo-tjp.png";
import cup from "./assets/img/newcup.png";


const UnderConstructionPage = () => {
  const [text, setText] = useState('');
  const originalText = "We are working on something awesome! Please check back later.";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index <= originalText.length) {
        setText(originalText.slice(0, index));
        index += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 50); // Adjust the interval for typing speed
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '100px', backgroundColor:"#f7e1cb",height:"100vh" }}>
     <img src={logo} alt="logo" style={{height:"120px",width:"260px"}}/>
      <h1>Under Construction</h1>
      <p style={{fontFamily:'revert-layer'}}>{text}</p>
      <img src={cup} alt="logo" style={{height:"260px",width:"260px"}}/>
    </div>
  );
};

export default UnderConstructionPage;
