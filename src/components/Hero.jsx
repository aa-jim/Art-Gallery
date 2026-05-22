import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import "./WavyButton.css";

export default function Hero() {
  const isMobile = window.innerWidth <= 768;

  return (
    <section className="hero-container">

      {/* ── Desktop ── */}
      <motion.h1
        className="hero-title"
        initial={isMobile ? false : { scale: 0.8, opacity: 0 }}
        animate={isMobile ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        WELCOME TO MY ART WORLD
      </motion.h1>

      <motion.p
        className="hero-subtext"
        initial={isMobile ? false : { y: 50, opacity: 0 }}
        animate={isMobile ? undefined : { y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        A collection of My Traditional and Digital creations and Illustrations
      </motion.p>

      <motion.div
        className="wavy-button-wrapper"
        initial={isMobile ? false : { opacity: 0, y: 30 }}
        animate={isMobile ? undefined : { opacity: 1, y: 20 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.button
          className="wavy-button"
          onClick={() => {
            const section = document.getElementById("gallery");
            if (section) {
              const offset = section.offsetTop + 80;
              window.scrollTo({ top: offset, behavior: "smooth" });
            }
          }}
          whileHover={{ scale: 1.1, y: -3, backgroundColor: "#ffffff", color: "#000000" }}
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          EXPLORE
        </motion.button>
      </motion.div>

      {/* ── Mobile — full-width trapezoid with title + subtext inside ── */}
      <motion.div
        className="hero-mobile-box-wrap"
        initial={{ opacity: 0, x: -120, skewX: -5 }}
        animate={{ opacity: 1, x: 0, skewX: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.8,
        }}
      >
        <div className="hero-mobile-shadow" />
        <div className="hero-mobile-border" />
        <div className="hero-mobile-box">
          <h1 className="hero-mobile-title">WELCOME TO MY ART WORLD</h1>
          <p className="hero-mobile-subtext">
            A collection of My Traditional and Digital Creations and Illustrations
          </p>
        </div>
      </motion.div>

    </section>
  );
}