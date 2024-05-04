import React from "react";

const TokenExpirationPopup = ({ onRefresh, onClose }) => {
  const popupStyle = {
    position: "fixed",
    top: "10px",
    right: "10px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    boxShadow: "0 3px 15px rgba(0, 0, 0, 0.2)",
    padding: "10px",
    width: '300px',
    borderRadius: '10px'
  };

  const contentStyle = {
    textAlign: "center",
    fontSize: "25px",
  };

  const buttonContainerStyle = {
    marginTop: "10px",
  };

  const buttonStyle = {
    margin: "0 10px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "20px",
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#1da1f2'
  };

  return (
    <div style={popupStyle}>
      <div style={contentStyle}>
        <p style={{fontSize: '20px', marginTop: '1px'}}>Token Expiring! Click to Refresh</p>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={onRefresh}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenExpirationPopup;
