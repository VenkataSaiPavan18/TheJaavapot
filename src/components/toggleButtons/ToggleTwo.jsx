import React from "react";
import { styled } from "@mui/system";

const NavButton = styled("button")(({ active }) => ({
  backgroundColor: active ? "#FD7E4B" : "white",
  color: active ? "#fff" : "#333",
  border: "none",
  padding: "10px 20px",
  margin: "0 5px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "20px",
  fontWeight: active ? "bold" : "normal",
  "&:hover": {
    backgroundColor: active ? "#e06d43" : "#e6e6e6",
  },
}));

const ToggleTwo = ({ options, activeOption, onOptionChange, animationType }) => {
  return (
    <div className="d-flex justify-content-center m-3">
      {options.map((option, index) => (
        <NavButton
          key={index}
          data-aos={animationType[index] || "fade-up"}
          active={activeOption === option.value}
          onClick={() => onOptionChange(option.value)}
        >
          {option.label}
        </NavButton>
      ))}
    </div>
  );
};

export default ToggleTwo;
