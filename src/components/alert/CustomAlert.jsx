import React from "react";
import './customAlert.css';

const CustomAlert = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert-container">
        <p className="custom-alert-message">{message}</p>
        <div className="custom-alert-buttons">
          <button className="custom-alert-button confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="custom-alert-button cancel" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
