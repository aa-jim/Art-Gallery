import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import "./WavyButton.css";

export default function Hero() {
  return (
    <section className="hero-container">
      <motion.h1
        className="hero-title"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        WELCOME TO MY ART WORLD
      </motion.h1>

      <motion.p
        className="hero-subtext"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        A collection of My Traditional and Digital creations and Illustrations
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
      <motion.button
         className="wavy-button text-white px-6 py-3 bg-red-600 font-bold uppercase"
         onClick={()=>{
          const section= document.getElementById("gallery");
          section?.scrollIntoView({ behavier: "smooth"});
         }}
        whileHover={{ scale: 1.1, y: -3, backgroundColor: "#ffffff", color: "#000" }}
        whileTap={{ scale: 0.80 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
       >
         EXPLORE
     </motion.button>
    </motion.div>
    </section>
  );
}
