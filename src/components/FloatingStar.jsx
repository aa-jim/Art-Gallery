import React from "react";

const FloatingStar = ({ color = "red", top, left, size = 48, delay = 0 }) => {
  const starSrc =
    color === "red"
      ? "/assets/red_star.png"
      : "/assets/white_star.png";

  const style = {
    position: "absolute",
    top,
    left,
    width: `${size}px`,
    height: `${size}px`,
    backgroundImage: `url(${starSrc})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    pointerEvents: "none",
    animation: `float 6s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    zIndex: 1,
  };

  return <div style={style}></div>;
};

export default FloatingStar;
