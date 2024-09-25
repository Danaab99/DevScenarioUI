import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Alert = ({ message, type, onClose, onSave, onLeave, showOptions }) => {
  return (
    <div className="alert-overlay">
      <div className={`alert alert-${type} alert-dismissible fade show alert-centered`} role="alert">
        {message}
        {showOptions ? (
          <div className="alert-options">
            <button type="button" className="custom-btn save-btn" onClick={onSave}>Save and Leave</button>
            <button type="button" className="custom-btn leave-btn" onClick={onLeave}>Leave without Saving</button>
          </div>
        ) : (
          <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
        )}
      </div>
    </div>
  );
};

export default Alert;
