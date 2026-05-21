import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./AboutMe.css";

const AboutMe = () => {
  const isMobile = window.innerWidth <= 768;
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  React.useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0, x: 0 });
  }, [inView, controls]);

  return (
    <motion.section
      id="about"
      className="about-section"
      ref={ref}
      initial={isMobile ? false : { opacity: 0, y: 50 }}
      animate={isMobile ? undefined : controls}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* ── Desktop title ── */}
      <h2 className="about-title">
        <div className="about-title-box">
          <span>ABOUT ME</span>
        </div>
      </h2>

      {/* ── Mobile title — snaps in from left ── */}
      <motion.div
        className="about-mobile-title-wrap"
        initial={{ opacity: 0, x: -120 }}
        animate={controls}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
      >
        <div className="about-mobile-shadow" />
        <div className="about-mobile-border" />
        <div className="about-mobile-box">
          <span>ABOUT ME</span>
        </div>
      </motion.div>

      <div className="about-content">

        {/* Image */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 40 }}
          animate={isMobile ? undefined : controls}
          transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.15 }}
        >
          <div className="about-image-container">
            <a href="https://www.facebook.com/aa.jim.3" target="_blank" rel="noopener noreferrer">
              <img
                src={process.env.PUBLIC_URL + "/assets/1358482.png"}
                alt="Profile"
                className="profile-image"
              />
            </a>
          </div>
        </motion.div>

        {/* Text box */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 40 }}
          animate={isMobile ? undefined : controls}
          transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.3 }}
        >
          <div className="about-text-box">
            <p>
              Hi, I'm A A Jim — a passionate artist.<br />
              I love creating expressive illustrations and experimenting with
              different styles. This site is my little art world, and I'm excited
              to share it with you! Without my regular practice and dedication, I
              couldn't have come this far. And of course there's a long way to
              go. Anything we do, we gotta do it with our heart. That's the key!
            </p>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default AboutMe;