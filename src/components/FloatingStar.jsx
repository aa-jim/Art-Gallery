import React from "react";

const FloatingStar = ({ color = "red", top, left, size = 48 }) => {
  const starSrc =
    color === "red"
      ? process.env.PUBLIC_URL + "/assets/red_star.png"
      : process.env.PUBLIC_URL + "/assets/white_star.png";

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
    mixBlendMode: "screen",
    zIndex: 1,
  };

  return <div style={style}></div>;
};

export default FloatingStar;