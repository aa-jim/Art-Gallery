import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GalleryPreview from "./components/GalleryPreview";
import AboutMe from "./components/AboutMe";
import Background from "./components/Background";
import GallerySection from "./components/GallerySection";
import "./App.css";

function App() {
  return (
    <div className="theme">
      <div id="home" />   {/* anchor at absolute top */}
      <Background />
      <Navbar />
      <GalleryPreview />
      <Hero />
      <GallerySection />
      <AboutMe />
    </div>
  );
}

export default App;