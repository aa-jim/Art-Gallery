import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar-container">
      <div className="logo">A A JIM</div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
        <li><a href="#home">HOME</a></li>
        <li><a href="#about">ABOUT ME</a></li>
      </ul>
    </nav>
  );
}
