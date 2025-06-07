import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GalleryPreview from "./components/GalleryPreview";
import AboutMe from "./components/AboutMe";
import FloatingStar from "./components/FloatingStar";
import Background from "./components/Background";
import GallerySection from "./components/GallerySection";
import "./App.css";

function App() {
  return (
    <div className="theme">
      <FloatingStar color="red" top="100px" left="10%" size={32} />
      <FloatingStar color="white" top="300px" left="80%" size={24} delay={1} />
      <FloatingStar color="red" top="600px" left="50%" size={28} delay={2} />
      <Background />
      <Navbar />
      <section id="home"></section>
      <GalleryPreview className="mt-0 mb-8" />
      <Hero />
      <GallerySection />
      <AboutMe />
    </div>
  );
}

export default App;
