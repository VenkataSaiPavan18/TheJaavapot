import React, { useState } from "react";
import "./Nav.css";

const ToggleNav = ({ navLabels = [], handleMainCategoryChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (evt, index, label) => {
    evt.preventDefault();
    setActiveIndex(index);
    if (handleMainCategoryChange) {
      handleMainCategoryChange(label); // Trigger the passed function with the category name
    }
  };

  return (
    <nav className="custom-nav">
      <ul className="custom-nav__list">
        {navLabels.map((label, index) => (
          <li className="custom-nav__item" key={index}>
            <a
              className={`custom-nav__link ${
                activeIndex === index ? "custom-nav__link--active" : ""
              }`}
              data-transform={index * 100}
              onClick={(evt) => handleClick(evt, index, label)}
            >
              {label}
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

export default ToggleNav;
