// src/components/Modal.jsx

import React from "react";

const Modal = ({ imageUrl, onClose }) => {
  const handleOpenInNewTab = () => {
    window.open(imageUrl, "_blank");
  };
  return (
    <div className="modal">
      <div className="modal__background">
        <div className="modal__window">
          <h2 className="modal__title">
            <span>Screenshot</span>
            <span className="modal__close fa fa-close" onClick={onClose}>
              ✖
            </span>
          </h2>
          <div className="modal__content">
            <div className="attachment">
              <div className="attachment__media-container attachment__media-container_fullscreen">
                <img
                  className="attachment__media"
                  src={imageUrl}
                  alt="Screenshot"
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <button
              onClick={handleOpenInNewTab}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "var(--button-bg)",
                color: "#222",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "background-color 0.3s ease",
                textAlign: "center !important",
              }}
            >
              Open Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
