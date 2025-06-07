import React from 'react';
import "./GalleryPreview.css";
import art1 from '../assets/preview/art1.webp';
import art2 from '../assets/preview/art2.webp';
import art3 from '../assets/preview/art3.webp';
import art4 from '../assets/preview/art4.webp';
import art5 from '../assets/preview/art5.webp';
import art6 from '../assets/preview/art6.webp';
import art7 from '../assets/preview/art7.webp';
import art8 from '../assets/preview/art8.webp';
import art9 from '../assets/preview/art9.webp';
import art10 from '../assets/preview/art10.webp';

const images = [art1, art2, art3, art4, art5, art6, art7, art8, art9, art10];

const GalleryPreview = () => {
  return (
    <div className="relative z-10 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-full pointer-events-none z-20">
        <div className="edge-blur red-left" />
        <div className="edge-blur red-right" />
      </div>

      <div className="pt-[80px] flex w-max animate-scroll border-t-4 border-red-600 z-10 relative">
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
