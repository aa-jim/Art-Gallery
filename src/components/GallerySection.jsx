import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./GallerySection.css";
import ExpandedGallery from "./ExpandedGallery";

const galleryYears = [
  {
    year: "2020",
    image: "/assets/2020.jpg",
    images: [
      "/assets/2020/Aug/art (1).webp",
      "/assets/2020/Aug/art (2).webp",
      "/assets/2020/Aug/art (3).webp",
      "/assets/2020/Aug/art (4).webp",
      "/assets/2020/Aug/art (5).webp",
      "/assets/2020/Aug/art (6).webp",
      "/assets/2020/Aug/art (7).webp",
      "/assets/2020/Aug/art (8).webp",
      "/assets/2020/Aug/art (9).webp",
      "/assets/2020/Sep/art (1).webp",
      "/assets/2020/Sep/art (2).webp",
      "/assets/2020/Sep/art (3).webp",
      "/assets/2020/Sep/art (4).webp",
      "/assets/2020/Sep/art (5).webp",
      "/assets/2020/Sep/art (6).webp",
      "/assets/2020/Sep/art (7).webp",
      "/assets/2020/Oct/art (1).jpg",
      "/assets/2020/Oct/art (2).jpg",
      "/assets/2020/Oct/art (3).jpg",
      "/assets/2020/Oct/art (4).jpg",
      "/assets/2020/Oct/art (5).jpg",
      "/assets/2020/Oct/art (6).jpg",
      "/assets/2020/Oct/art (7).jpg",
      "/assets/2020/Nov/art (1).jpg",
      "/assets/2020/Nov/art (2).jpg",
      "/assets/2020/Dec/art (1).jpg",
      "/assets/2020/Dec/art (2).jpg",
      "/assets/2020/Dec/art (3).jpg",
      "/assets/2020/Dec/art (4).jpg",
      "/assets/2020/Dec/art (5).jpg",
      "/assets/2020/Dec/art (6).jpg",
    ],
  },
  { year: "2021", image: "/assets/2021.jpg",
    images: [
      "/assets/2021/Jan/art (1).jpg",
      "/assets/2021/Jan/art (2).jpg",
      "/assets/2021/Jan/art (3).jpg",
      "/assets/2021/Feb/art (1).jpg",
      "/assets/2021/Feb/art (2).jpg",
      "/assets/2021/Feb/art (3).jpg",
      "/assets/2021/Mar/art (1).jpg",
      "/assets/2021/Mar/art (2).jpg",
      "/assets/2021/Mar/art (3).jpeg",
      "/assets/2021/Apr/art (1).jpg",
      "/assets/2021/Apr/art (2).jpg",
      "/assets/2021/Apr/art (3).jpg",
      "/assets/2021/Apr/art (4).jpg",
      "/assets/2021/May/art (1).jpg",
      "/assets/2021/May/art (2).jpg",
      "/assets/2021/June/art.jpg",
      "/assets/2021/July/art (1).jpg",
      "/assets/2021/July/art (2).jpg",
      "/assets/2021/Aug/art (1).jpg",
      "/assets/2021/Aug/art (2).jpg",
      "/assets/2021/Aug/art (3).jpg",
      "/assets/2021/Sep/art (1).jpg",
      "/assets/2021/Sep/art (2).jpg",
      "/assets/2021/Oct/art (1).jpg",
      "/assets/2021/Oct/art (2).jpg",
      "/assets/2021/Oct/art (3).jpg",
      "/assets/2021/Nov/art (1).jpg",
      "/assets/2021/Nov/art (2).jpg",
      "/assets/2021/Nov/art (3).jpg",
      "/assets/2021/Nov/art (4).jpg",
      "/assets/2021/Nov/art (5).jpg",
      "/assets/2021/Dec/art (1).jpg",
      "/assets/2021/Dec/art (2).jpg",
      "/assets/2021/Dec/art (3).jpg",
      "/assets/2021/Dec/art (4).jpg",
      "/assets/2021/Dec/art (5).jpg",
    ] },
  { year: "2022", image: "/assets/2022.jpg",
    images: [
      "/assets/2022/Jan/art (1).jpg",
      "/assets/2022/Jan/art (2).jpg",
      "/assets/2022/Feb/art (1).jpg",
      "/assets/2022/Feb/art (2).jpg",
      "/assets/2022/Feb/art (3).jpg",
      "/assets/2022/Feb/art (4).jpg",
      "/assets/2022/Feb/art (5).jpg",
      "/assets/2022/Mar/art (1).jpg",
      "/assets/2022/Mar/art (2).jpg",
      "/assets/2022/Mar/art (3).jpg",
      "/assets/2022/Mar/art (4).jpg",
      "/assets/2022/Mar/art (5).jpg",
      "/assets/2022/Mar/art (5).jpeg",
      "/assets/2022/Mar/art (6).jpeg",
      "/assets/2022/Mar/art (7).jpg",
      "/assets/2022/Apr/art (1).jpg",
      "/assets/2022/Apr/art (2).jpg",
      "/assets/2022/May/art.jpg",
      "/assets/2022/June/art (1).jpg",
      "/assets/2022/June/art (2).jpg",
      "/assets/2022/June/art (3).jpeg",
      "/assets/2022/July/art.jpg",
      "/assets/2022/Sep/art (1).jpg",
      "/assets/2022/Sep/art (2).jpg",
      "/assets/2022/Oct/art.jpeg",
      "/assets/2022/Dec/art (1).jpg",
      "/assets/2022/Dec/art (2).jpg",
      "/assets/2022/Dec/art (3).jpg",
    ] },
  { year: "2023", image: "/assets/2023.jpg",
    images: [
      "/assets/2023/Jan/art.jpg",
      "/assets/2023/Mar/art.jpg",
      "/assets/2023/Dec/art.jpg",
    ] },
  { year: "2024", image: "/assets/2024.jpg",
    images: [
      "/assets/2024/Feb/art.jpg",
      "/assets/2024/Mar/art.jpg",
      "/assets/2024/Apr/art (1).jpg",
      "/assets/2024/Apr/art (2).jpg",
      "/assets/2024/May/art.jpg",
      "/assets/2024/June/art.jpg",
      "/assets/2024/July/art.jpg",
      "/assets/2024/Nov/art.jpg",
    ] },
  { year: "2025", image: "/assets/2025.jpg",
    images: [
      "/assets/2025/Mar/art.jpg",
      "/assets/2025/May/art.jpg",
    ] },
];

const GallerySection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);

  const handleThumbnailClick = (year) => {
    setSelectedYear((prev) => (prev === year ? null : year));
  };

  return (
    <motion.section
      id="gallery"
      className="gallery-container"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="gallery-title">
        GALLERY <span className="gallery-underline" />
      </h2>

      <div className="thumbnail-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center max-w-[1000px] mx-auto z-4">
        {galleryYears.map(({ year, image, images }) => (
  <div key={year} className="thumbnail-wrapper">
    <div
      className="thumbnail-box"
      onClick={() => handleThumbnailClick(year)}
    >
      <img src={image} alt={year} className="thumbnail-image" />
      <div className="year-bubble">≡ {year}</div>
    </div>

    {selectedYear === year && (
      <div className="expanded-gallery-wrapper">
        <ExpandedGallery
          year={year}
          images={images}
          onClose={() => setSelectedYear(null)}
        />
      </div>
    )}
  </div>
))}

      </div>
    </motion.section>
  );
};

export default GallerySection;
