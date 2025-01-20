import React from "react";
import "./styles.css";
import img from "../../../assets/img/about/Image04.png";
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function Things() {
  return (
    <div className="responsive-container" style={{paddingBottom:'250px'}}>
      <div>
        <p className="storyHeading">
          Our <span className="highlight">Things</span>
        </p>
      </div>
      
      {/* Centralized Image */}
      <div className="image-container">
        <img src={img} alt="Central Image" className="responsive-image" />
      </div>

      <div className="responsive-card mission-card">
        <div className="icon-text-container">
          <div className="icon-background">
            <FlagIcon size={24} />
          </div>
          <p className="card-title">Our Mission</p>
        </div>
        <p className="about-card-description">
          Our mission is to provide the best solutions to meet our customers' needs and drive innovation in the industry.
        </p>
      </div>

      <div className="responsive-card vision-card">
        <div className="icon-text-container">
          <div className="icon-background">
            <VisibilityIcon size={24} />
          </div>
          <p className="card-title">Our Vision</p>
        </div>
        <p className="about-card-description">
          Our vision is to create a sustainable future where everyone has access to the best resources and services.
        </p>
      </div>

      <div className="responsive-card promise-card">
        <div className="icon-text-container">
          <div className="icon-background">
            <ThumbUpIcon size={24} />
          </div>
          <p className="card-title">Our Promise</p>
        </div>
        <p className="about-card-description">
          We promise to maintain excellence and continuously improve in all aspects of our business.
        </p>
      </div>
    </div>
  );
}

export default Things;

