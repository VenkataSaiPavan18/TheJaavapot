import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import "./Nav.css";

const ToggleNavIcon = ({ navLabels = [], handleMainCategoryChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(min-width:600px) and (max-width:1200px)");

  const handleClick = (evt, index, value) => {
    evt.preventDefault();
    setActiveIndex(index);
    if (handleMainCategoryChange) {
      handleMainCategoryChange(value);
    }
  };

  return (
    <nav className={`custom-nav ${isSmallScreen ? "small" : isMediumScreen ? "medium" : "large"}`}>
      <ul className="custom-nav__list">
        {navLabels.map((item, index) => (
          <li
            className={`custom-nav__item ${
              activeIndex !== index ? "custom-nav__item--inactive" : ""
            }`}
            key={index}
          >
            <a
              className={`custom-nav__link ${
                activeIndex === index ? "custom-nav__link--active" : ""
              }`}
              data-transform={index * 100}
              onClick={(evt) => handleClick(evt, index, item.value)}
            >
              <img
                src={item.icon}
                alt={`${item.label}-icon`}
                className="custom-nav__icon"
              />
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="custom-nav__slider">
        <div
          className="custom-nav__slider-rect"
          style={{
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        ></div>
      </div>
    </nav>
  );
};

export default ToggleNavIcon;
