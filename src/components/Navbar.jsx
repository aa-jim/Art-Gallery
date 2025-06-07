import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar-container">
      <div className="logo">A A JIM</div>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>
      <ul className={`nav-links ${isOpen ? "show" : ""}`}>
        <li><a href="#home" onClick={() => setIsOpen(false)}>HOME</a></li>
        <li><a href="#about" onClick={() => setIsOpen(false)}>ABOUT ME</a></li>
      </ul>
    </nav>
  );
}
