import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./AboutMe.css";
import profilePic from "../assets/1358482.png";

const AboutMe = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);

  return (
    <motion.section id="about"
      className="about-section"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="about-title">
        ABOUT ME
        <span className="about-underline" />
      </h2>
      <div className="about-content">
        <div className="about-image-container">
          <a
            href="https://www.facebook.com/aa.jim.3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={profilePic} alt="Profile" className="profile-image" />
          </a>
        </div>
        <div className="about-text-box">
          <p>
            Hi, I'm A A Jim — a passionate artist.
            <br />
            I love creating expressive illustrations and experimenting with
            different styles. This site is my little art world, and I'm excited
            to share it with you! Without my regular practice and dedication, I
            couldn't have come this far. And of course there's a long way to
            go. Anything we do, we gotta do it with our heart. That's the key!
          </p>
        </div>
      </div>

      <div className="tools-used-container">
        <div className="tools-used">TOOLS USED</div>
        <div className="tools-underline" />
        <ul className="tools-list">
          <li>React App</li>
          <li>Tailwind CSS</li>
          <li>Framer Motion</li>
          <li>With Guidance From</li>
          <li>ChatGPT</li>
        </ul>
      </div>
    </motion.section>
  );
};

export default AboutMe;
