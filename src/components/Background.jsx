import React from "react";
import "./Background.css";
import FloatingStar from "./FloatingStar";

export default function Background() {
  return (
    <div className="background">
      <div className="background-2"></div>
      <FloatingStar color="red" top="15%" left="20%" size={100} delay={0} />
      <FloatingStar color="white" top="25%" left="60%" size={80} delay={1} />
      <FloatingStar color="red" top="70%" left="80%" size={80} delay={2} />
      <FloatingStar color="white" top="63%" left="85%" size={80} delay={1} />
      <FloatingStar color="red" top="75%" left="87%" size={80} delay={2} />
<div className="path_line"></div>
    </div>
  );
}
