import React, { useState, useEffect } from "react";
import "./ToggleOne.css";

const ToggleOne = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <nav className="toggle-one-nav">
      <ul className="toggle-one-nav__list">
        {items.map((item, index) => (
          <li className="toggle-one-nav__item" key={index}>
            <a
              href="#"
              className={`toggle-one-nav__link ${activeIndex === index ? "toggle-one-nav__link_active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(index);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="toggle-one-nav__slider">
        <div
          className="toggle-one-nav__slider-rect"
          style={{
            transform: `translateX(${(100 / items.length) * activeIndex}%)`,
            width: `calc(100% / ${items.length})`,
          }}
        />
      </div>
    </nav>
  );
};

export default ToggleOne;
