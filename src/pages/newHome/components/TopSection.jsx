import React,{useState,useEffect} from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './sectionStyles.css'; 

import { useNavigate } from 'react-router-dom';




const TopSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  const slides = [
    // { imgSrc: indi1, title: 'One Meal a Day With Millets' },
    // { imgSrc: indi2, title: 'Products' },
    // { imgSrc: indi3, title: 'Franchisee Stores' },
    // { imgSrc: indi4, title: 'Franchisee Stores' },
    // { imgSrc: poster01, title: 'Franchisee Stores' },
    // { imgSrc: poster02, title: 'franchisee Stores' },
    // { imgSrc: "https://surveyappanswers.blob.core.windows.net/jaavapot/Poster%204.png", title: 'franchisee Stores' },
    { imgSrc: "https://surveyappanswers.blob.core.windows.net/jaavapot/duh.png", title: 'franchisee Stores' },
    
    { imgSrc: "https://surveyappanswers.blob.core.windows.net/jaavapot/Poster%202.png", title: 'franchisee Stores' },
    // { imgSrc: "https://surveyappanswers.blob.core.windows.net/jaavapot/poster%203.png", title: 'Franchisee Stores' },
    { imgSrc: "https://surveyappanswers.blob.core.windows.net/jaavapot/duh.png", title: 'franchisee Stores' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="carousel" style={{ height: '100vh', width: '100vw', overflow: 'hidden',backgroundColor:"#FDF0DD" }}>
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
            style={{
              minWidth: '100vw',
              height: '86vh',
              scale:"1",
              cursor: 'pointer', 
              background: `url(${slide.imgSrc}) center/cover no-repeat`,
            }}
            onClick={() => navigate('/milletproducts')} 
          >
             {/* <img
    src={slide.imgSrc} // Add the image source here
    alt={slide.title} // Add alt text for accessibility
    style={{
      position: 'absolute',
      bottom: '20%',
      left: '70%',
      width: '500px', // Adjust the size of the image as needed
      height: 'auto',
    }}
  /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSection;
