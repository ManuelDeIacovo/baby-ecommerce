import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const ImageZoom = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => document.body.style.overflow = "";
  }, [isOpen]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <div className="image-zoom-wrapper" onClick={handleClick}>
      <img src={src} alt={alt} />
      {isOpen && createPortal(
        <div className="image-modal" onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={src} alt={alt} />
            <button className="image-modal-close" onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}>
              ✕
            </button>
          </div>
        </div>,
        document.getElementById("root")
      )}
    </div>
  );
};

export default ImageZoom;