import React from 'react';
import "./GalleryPreview.css";

// Using public folder via PUBLIC_URL — works both locally and on GitHub Pages
const BASE = process.env.PUBLIC_URL + "/assets/preview/";
const images = Array.from({ length: 10 }, (_, i) => `${BASE}art${i + 1}.webp`);

const GalleryPreview = () => {
  return (
    <div className="relative z-10 bg-black overflow-hidden">
      {/* Red edge fades */}
      <div className="absolute top-0 left-0 h-full w-full pointer-events-none z-20">
        <div className="edge-blur red-left" />
        <div className="edge-blur red-right" />
      </div>

      {/* Scrolling strip - doubled for seamless loop */}
      <div className="pt-[76px] flex w-max animate-scroll border-t-4 border-red-600 z-10 relative">
        {[...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`art-${index}`}
            className="h-60 object-contain mx-[2px]"
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryPreview;
