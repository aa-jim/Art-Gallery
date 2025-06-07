import React, { useRef, useState, useEffect } from "react";
import "./ExpandedGallery.css";
import { motion } from "framer-motion";

const getMonthFromPath = (path) => {
  const parts = path.split("/");
  const monthMap = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    June: "June",
    July: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };

  for (let part of parts) {
    const formatted = part.slice(0, 3);
    if (monthMap[formatted]) {
      return monthMap[formatted];
    }
  }

  return "";
};
const ExpandedGallery = ({ images, year, onClose }) => {
  const scrollRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollToImage = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const children = el.children;
    const target = children[index];
    const offsetLeft = target.offsetLeft - el.offsetLeft;
    const scrollTo =
      offsetLeft - (el.clientWidth - target.clientWidth) / 2;
    el.scrollTo({ left: scrollTo, behavior: "smooth" });
    setCenterIndex(index);
  };
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let ticking = false;

    const handleWheel = (e) => {
      e.preventDefault();
      if (ticking) return;
      ticking = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      let nextIndex = centerIndex + direction;

      if (nextIndex >= images.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = images.length - 1;

      scrollToImage(nextIndex);
      setTimeout(() => {
        ticking = false;
      }, 400);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [centerIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        let nextIndex = centerIndex + (e.key === "ArrowRight" ? 1 : -1);

        if (nextIndex >= images.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = images.length - 1;

        scrollToImage(nextIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [centerIndex, images.length]);

  return (
    <div className="w-full mt-6 relative">
      <button onClick={onClose} className="back-button">
        BACK
      </button>
       <div className="year-badge">
         <span className="year-badge-text">
         <span className="badge-icon">≡</span> {year}
        </span>
       </div>
       <div
        ref={scrollRef}
        className="flex overflow-x-scroll no-scrollbar snap-x snap-mandatory px-10 space-x-6 py-12"
        style={{ scrollBehavior: "smooth", maxWidth: "100vw", overflowX: "auto" }}
        >
        {images.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Art ${index + 1}`}
            className={`scroll-item transition-all duration-500 snap-center rounded-lg shadow-xl ${
              index === centerIndex ? "focused scale-110 opacity-100 z-10" : "scale-95 opacity-50 z-0"
            }`}
            style={{
              minWidth: "260px",
              maxHeight: "360px",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {centerIndex !== null && (
        <div className="bottom-month-label">
          <span>{getMonthFromPath(images[centerIndex])}</span>
        </div>
      )}
    </div>
  );
};

export default ExpandedGallery;
