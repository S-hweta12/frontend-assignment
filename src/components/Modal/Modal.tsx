import React, { useEffect } from "react";

import { ModalProps } from "../../interfaces/common";
import './Modal.css';

const Modal: React.FC<ModalProps> = ({ data, onClose }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div >
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img className="modal-image" src={`/assets/${data.type}.jpg`} alt={data.title} />
      </div>
    </div>
  );
};

export default Modal;
