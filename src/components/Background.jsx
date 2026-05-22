import React from "react";
import "./Background.css";

const BASE = process.env.PUBLIC_URL + "/assets/";

export default function Background() {
  return (
    <>
      <div className="bg-fixed-left" style={{ backgroundImage: `url(${BASE}path_line.png)` }} />
      <div className="bg-scroll-right">
        <img src={`${BASE}path_line90.png`} alt="" className="bg-scroll-right-img" />
      </div>
      <div className="stars-container">
        <div className="star star-1" style={{ backgroundImage: `url(${BASE}white_star.png)` }} />
        <div className="star star-2" style={{ backgroundImage: `url(${BASE}red_star.png)` }} />
        <div className="star star-3" style={{ backgroundImage: `url(${BASE}red_star.png)` }} />
        <div className="star star-4" style={{ backgroundImage: `url(${BASE}white_star.png)` }} />
        <div className="star star-5" style={{ backgroundImage: `url(${BASE}red_star.png)` }} />
        <div className="star star-6" style={{ backgroundImage: `url(${BASE}white_star.png)` }} />
        {/* Mobile star clusters — hidden on desktop via CSS */}
        <div className="star star-m1" style={{ backgroundImage: `url(${BASE}white_star.png)` }} />
        <div className="star star-m2" style={{ backgroundImage: `url(${BASE}red_star.png)` }} />
        <div className="star star-m3" style={{ backgroundImage: `url(${BASE}red_star.png)` }} />
        <div className="star star-b1" style={{ backgroundImage: `url(${BASE}red_star.png)` }} />
        <div className="star star-b2" style={{ backgroundImage: `url(${BASE}white_star.png)` }} />
        <div className="star star-b3" style={{ backgroundImage: `url(${BASE}red_star.png)` }} />
      </div>
    </>
  );
}