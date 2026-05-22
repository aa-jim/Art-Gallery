import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BsDoorOpenFill, BsPersonFill } from "react-icons/bs";
import "./Navbar.css";

const BASE = process.env.PUBLIC_URL + "/assets/";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled((window.scrollY || document.documentElement.scrollTop) > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const close = () => setIsOpen(false);

  const smoothScrollTo = (top, duration = 800) => {
  const start = window.scrollY;
  const distance = top - start;
  let startTime = null;

  const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    window.scrollTo(0, start + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const scrollTo = (id) => {
  close();
  const isSmallMobile = window.innerWidth <= 480;
  const isMobile = window.innerWidth <= 768;
  const duration = isSmallMobile ? 10 : 800;
  if (!id) { smoothScrollTo(0, duration); return; }
  const el = document.getElementById(id);
  if (el) {
    if (id === "gallery" && isMobile) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    } else {
      smoothScrollTo(el.offsetTop + 80, duration);
    }
  }
};

  return (
    <>
      {ReactDOM.createPortal(
        <div className="navbar-backdrop" />,
        document.body
      )}

      <nav className={`navbar-container${scrolled ? " scrolled" : ""}`}>
        <div className="logo">A A JIM</div>

        {/* Desktop nav links */}
        <ul className="nav-links desktop-only">
          <li>
            <a href="#home" title="Home" onClick={(e) => { e.preventDefault(); scrollTo(null); }}>
              <BsDoorOpenFill />
            </a>
          </li>
          <li>
            <a href="#gallery" title="Gallery" onClick={(e) => { e.preventDefault(); scrollTo("gallery"); }}>
              <img src={`${BASE}gallery_icon.png`} alt="Gallery" className="nav-icon" />
            </a>
          </li>
          <li>
            <a href="#about" title="About Me" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>
              <BsPersonFill />
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`hamburger${isOpen ? " open" : ""}`}
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Drawer overlay */}
      <div
        className={`drawer-overlay${isOpen ? " open" : ""}`}
        onClick={close}
      />

      {/* Mobile slide-in drawer */}
      <div className={`mobile-drawer${isOpen ? " open" : ""}`}>
        <button className="drawer-close" onClick={close} aria-label="Close menu">✕</button>
        <button className="drawer-link" onClick={() => scrollTo(null)}>
          <span className="drawer-icon"><BsDoorOpenFill /></span>
          <span className="drawer-label">HOME</span>
        </button>
        <button className="drawer-link" onClick={() => scrollTo("gallery")}>
          <span className="drawer-icon">
            <img src={`${BASE}gallery_icon.png`} alt="" className="drawer-nav-icon" />
          </span>
          <span className="drawer-label">GALLERY</span>
        </button>
        <button className="drawer-link" onClick={() => scrollTo("about")}>
          <span className="drawer-icon"><BsPersonFill /></span>
          <span className="drawer-label">ABOUT ME</span>
        </button>
      </div>
    </>
  );
}