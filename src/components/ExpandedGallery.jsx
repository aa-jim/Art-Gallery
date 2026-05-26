import React, { useRef, useState, useEffect } from "react";
import "./ExpandedGallery.css";
import { motion } from "framer-motion";

const StarSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(50,50)">
      <polygon points="0,-46 10.6,-14.5 44,-14.5 17.4,8.8 27.5,40 0,22 -27.5,40 -17.4,8.8 -44,-14.5 -10.6,-14.5" fill="black"/>
      <polygon points="0,-36 8.3,-11.3 34.4,-11.3 13.6,6.9 21.5,31.3 0,17.2 -21.5,31.3 -13.6,6.9 -34.4,-11.3 -8.3,-11.3" fill="white"/>
      <polygon points="0,-24 5.5,-7.6 23,-7.6 9.1,4.6 14.3,20.9 0,11.5 -14.3,20.9 -9.1,4.6 -23,-7.6 -5.5,-7.6" fill="black"/>
      <polygon points="0,-14 3.3,-4.4 13.3,-4.4 5.3,2.7 8.3,12.1 0,6.7 -8.3,12.1 -5.3,2.7 -13.3,-4.4 -3.3,-4.4" fill="white"/>
    </g>
  </svg>
);

// Fallbacks are removed to process directly from Sanity objects
const getImageUrl = (img) => (img ? img.url : "");
const getImageMonth = (img) => (img ? img.month : "");

const ExpandedGallery = ({ images = [], year, onClose }) => {
  const scrollRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);

  const scrollToImage = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = el.children[index];
    if (!target) return;
    const scrollTo = target.offsetLeft - el.offsetLeft - (el.clientWidth - target.clientWidth) / 2;
    el.scrollTo({ left: scrollTo, behavior: "smooth" });
    setCenterIndex(index);
  };

  const updateCenterIndex = () => {
    const el = scrollRef.current;
    if (!el) return;
    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(containerCenter - childCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setCenterIndex(closest);
  };

  // Mouse wheel — step one image at a time
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || images.length === 0) return;
    let ticking = false;
    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (ticking) return;
      ticking = true;
      const direction = e.deltaY > 0 ? 1 : -1;
      let next = centerIndex + direction;
      if (next >= images.length) next = 0;
      if (next < 0) next = images.length - 1;
      scrollToImage(next);
      setTimeout(() => { ticking = false; }, 400);
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [centerIndex, images.length]);

  // Touch scroll — update center after scroll settles
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let scrollTimer = null;
    const handleScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        updateCenterIndex();
      }, 80);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard controls
  useEffect(() => {
    if (images.length === 0) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        let next = centerIndex + (e.key === "ArrowRight" ? 1 : -1);
        if (next >= images.length) next = 0;
        if (next < 0) next = images.length - 1;
        scrollToImage(next);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [centerIndex, images.length, onClose]);

  const isMobile = window.innerWidth <= 768;
  const currentMonth = images.length > 0 && centerIndex !== null ? getImageMonth(images[centerIndex]) : "";

  return (
    <div className="expanded-gallery-wrapper">
      <div className="exp-border-white" />
      <div className="exp-border-red" />
      <StarSVG className="exp-star-tl" />

      <div className="year-badge">
        <span className="year-badge-text">{year}</span>
      </div>

      <button onClick={onClose} className="back-button">
        <span>‹</span>
      </button>

      <div
        ref={scrollRef}
        className="no-scrollbar"
        style={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          scrollBehavior: "smooth",
          scrollSnapType: "x mandatory",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "0 2rem",
          gap: "1.5rem",
          boxSizing: "border-box",
          maxHeight: "100%",
        }}
      >
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={getImageUrl(img)}
            alt={`Art ${index + 1}`}
            className="scroll-item"
            style={{
              minWidth: isMobile ? "auto" : "220px",
              maxWidth: isMobile ? "100%" : "340px",
              maxHeight: isMobile ? "45vh" : "340px",
              flexShrink: 0,
              objectFit: "contain",
              width: "auto",
              height: "auto",
              scrollSnapAlign: "center",
              opacity: index === centerIndex ? 1 : 0.5,
              transform: index === centerIndex ? "scale(1.08)" : "scale(0.95)",
              transition: "transform 0.3s ease, opacity 0.3s ease",
              cursor: "pointer",
            }}
            onClick={() => scrollToImage(index)}
          />
        ))}
      </div>

      {currentMonth && (
        <div className="bottom-month-label">
          <span>{currentMonth}</span>
        </div>
      )}

      <StarSVG className="exp-star-br" />
    </div>
  );
};

export default ExpandedGallery;