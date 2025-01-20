import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopSectionNew.css';
import img1 from "../../../../assets/home/posters/pongal/pongal01.png";
import img2 from "../../../../assets/home/posters/pongal/pongal02.png";
import img3 from "../../../../assets/home/posters/pongal/pongal03.png";
import img4 from "../../../../assets/home/posters/pongal/pongal04.png";
import img5 from "../../../../assets/home/posters/pongal/pongal05.png";
import bgOne from '../../../../assets/home/topSection/bgOne.png';

const slides = [
  {
    imgSrc: img1,
    heading: "Nutritional Benefits\nFor Your Health",
    paragraph: "Discover the power of millet nutrition.\nPacked with vitamins, minerals, and antioxidants.\nSupports overall well-being.",
    slideName: "HAPPY SANKRANTRI",
  },
  {
    imgSrc: img2,
    heading: "Regulate Blood Sugar\nNaturally",
    paragraph: "Millets are low-glycemic.\nIdeal for managing blood sugar levels.\nPrevents spikes effectively.",
    slideName: "BUY 2 GET 1 FREE",
  },
  {
    imgSrc: img3,
    heading: "Promote A Healthy\nHeart",
    paragraph: "Rich in fiber and essential nutrients.\nMillets contribute to improved heart health.\nStay heart-healthy naturally.",
    slideName: "JUMBO COMBO",
  },
  {
    imgSrc: img4,
    heading: "Support Weight\nManagement",
    paragraph: "High in fiber and protein.\nKeeps you fuller for longer.\nSupports a healthy weight.",
    slideName: "MAKE X 5",
  },
  {
    imgSrc: img5,
    heading: "Go Green with\nSustainability",
    paragraph: "Millets require less water.\nEnvironmentally friendly and sustainable.\nA step towards green living.",
    slideName: "TRIPLE DEAL",
  },
];

const TopSectionNew = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel" style={{ height: '90vh', width: '100vw', overflow: 'hidden',
    //  backgroundColor: "#FDF0DD"
      }}>
      <div
        className="slides"
        style={{
          display: 'flex',
          transform: `translateX(-${currentSlide * 100}vw)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slide"
            style={{
              // minWidth: '100%',
              minWidth: '100vw',
              height: '74vh',
              background: `url(${slide.imgSrc}) center/contain no-repeat`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              // objectFit:'contain',
            }}
            onClick={() => navigate('/milletproducts')}
          >
            {/* <div className="content">
              <p style={{fontFamily:'Karantina',fontSize:'50px',fontWeight:'700',color:'#FFFFFF'}}>{slide.heading}</p>
              <p style={{fontFamily:'Arial',fontSize:'25px',fontWeight:'400',color:'#FFFFFF'}}>{slide.paragraph}</p>
            </div> */}
          </div>
        ))}
      </div>
      <div
        className="slide-titles"
        style={{
          backgroundImage: `url(${bgOne})`,
          // backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide-title ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="circle"></div>
            <span style={{fontFamily:'Arial',fontSize:'16px',fontWeight:'400',color:'#FFFFFF'}}>{slide.slideName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSectionNew;

