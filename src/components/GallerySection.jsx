import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./GallerySection.css";
import ExpandedGallery from "./ExpandedGallery";

const StarIcon = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <g transform="translate(50,50)">
      <polygon points="0,-46 10.6,-14.5 44,-14.5 17.4,8.8 27.5,40 0,22 -27.5,40 -17.4,8.8 -44,-14.5 -10.6,-14.5" fill="black"/>
      <polygon points="0,-36 8.3,-11.3 34.4,-11.3 13.6,6.9 21.5,31.3 0,17.2 -21.5,31.3 -13.6,6.9 -34.4,-11.3 -8.3,-11.3" fill="white"/>
      <polygon points="0,-24 5.5,-7.6 23,-7.6 9.1,4.6 14.3,20.9 0,11.5 -14.3,20.9 -9.1,4.6 -23,-7.6 -5.5,-7.6" fill="black"/>
      <polygon points="0,-14 3.3,-4.4 13.3,-4.4 5.3,2.7 8.3,12.1 0,6.7 -8.3,12.1 -5.3,2.7 -13.3,-4.4 -3.3,-4.4" fill="white"/>
    </g>
  </svg>
);

const galleryYears = [
  {
    year: "2020",
    image: process.env.PUBLIC_URL + "/assets/2020.jpg",
    images: [
      process.env.PUBLIC_URL + "/assets/2020/Aug/art (1).webp",
      process.env.PUBLIC_URL + "/assets/2020/Aug/art (2).webp",
      process.env.PUBLIC_URL + "/assets/2020/Aug/art (3).webp",
      process.env.PUBLIC_URL + "/assets/2020/Aug/art (4).webp",
      process.env.PUBLIC_URL + "/assets/2020/Aug/art (5).webp",
      process.env.PUBLIC_URL + "/assets/2020/Aug/art (6).webp",
      process.env.PUBLIC_URL + "/assets/2020/Aug/art (7).webp",
      process.env.PUBLIC_URL + "/assets/2020/Aug/art (8).webp",
      process.env.PUBLIC_URL + "/assets/2020/Aug/art (9).webp",
      process.env.PUBLIC_URL + "/assets/2020/Sep/art (1).webp",
      process.env.PUBLIC_URL + "/assets/2020/Sep/art (2).webp",
      process.env.PUBLIC_URL + "/assets/2020/Sep/art (3).webp",
      process.env.PUBLIC_URL + "/assets/2020/Sep/art (4).webp",
      process.env.PUBLIC_URL + "/assets/2020/Sep/art (5).webp",
      process.env.PUBLIC_URL + "/assets/2020/Sep/art (6).webp",
      process.env.PUBLIC_URL + "/assets/2020/Sep/art (7).webp",
      process.env.PUBLIC_URL + "/assets/2020/Oct/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2020/Oct/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2020/Oct/art (3).jpg",
      process.env.PUBLIC_URL + "/assets/2020/Oct/art (4).jpg",
      process.env.PUBLIC_URL + "/assets/2020/Oct/art (5).jpg",
      process.env.PUBLIC_URL + "/assets/2020/Oct/art (6).jpg",
      process.env.PUBLIC_URL + "/assets/2020/Oct/art (7).jpg",
      process.env.PUBLIC_URL + "/assets/2020/Nov/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2020/Nov/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2020/Dec/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2020/Dec/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2020/Dec/art (3).jpg",
      process.env.PUBLIC_URL + "/assets/2020/Dec/art (4).jpg",
      process.env.PUBLIC_URL + "/assets/2020/Dec/art (5).jpg",
      process.env.PUBLIC_URL + "/assets/2020/Dec/art (6).jpg",
    ],
  },
  {
    year: "2021",
    image: process.env.PUBLIC_URL + "/assets/2021.jpg",
    images: [
      process.env.PUBLIC_URL + "/assets/2021/Jan/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Jan/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Jan/art (3).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Feb/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Feb/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Feb/art (3).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Mar/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Mar/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Mar/art (3).jpeg",
      process.env.PUBLIC_URL + "/assets/2021/Apr/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Apr/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Apr/art (3).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Apr/art (4).jpg",
      process.env.PUBLIC_URL + "/assets/2021/May/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2021/May/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2021/June/art.jpg",
      process.env.PUBLIC_URL + "/assets/2021/July/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2021/July/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Aug/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Aug/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Aug/art (3).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Sep/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Sep/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Oct/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Oct/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Oct/art (3).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Nov/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Nov/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Nov/art (3).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Nov/art (4).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Nov/art (5).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Dec/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Dec/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Dec/art (3).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Dec/art (4).jpg",
      process.env.PUBLIC_URL + "/assets/2021/Dec/art (5).jpg",
    ],
  },
  {
    year: "2022",
    image: process.env.PUBLIC_URL + "/assets/2022.jpg",
    images: [
      process.env.PUBLIC_URL + "/assets/2022/Jan/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Jan/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Feb/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Feb/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Feb/art (3).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Feb/art (4).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Feb/art (5).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Mar/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Mar/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Mar/art (3).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Mar/art (4).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Mar/art (5).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Mar/art (5).jpeg",
      process.env.PUBLIC_URL + "/assets/2022/Mar/art (6).jpeg",
      process.env.PUBLIC_URL + "/assets/2022/Mar/art (7).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Apr/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Apr/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2022/May/art.jpg",
      process.env.PUBLIC_URL + "/assets/2022/June/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2022/June/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2022/June/art (3).jpeg",
      process.env.PUBLIC_URL + "/assets/2022/July/art.jpg",
      process.env.PUBLIC_URL + "/assets/2022/Sep/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Sep/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Oct/art.jpeg",
      process.env.PUBLIC_URL + "/assets/2022/Dec/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Dec/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2022/Dec/art (3).jpg",
    ],
  },
  {
    year: "2023",
    image: process.env.PUBLIC_URL + "/assets/2023.jpg",
    images: [
      process.env.PUBLIC_URL + "/assets/2023/Jan/art.jpg",
      process.env.PUBLIC_URL + "/assets/2023/Mar/art.jpg",
      process.env.PUBLIC_URL + "/assets/2023/Dec/art.jpg",
    ],
  },
  {
    year: "2024",
    image: process.env.PUBLIC_URL + "/assets/2024.jpg",
    images: [
      process.env.PUBLIC_URL + "/assets/2024/Feb/art.jpg",
      process.env.PUBLIC_URL + "/assets/2024/Mar/art.jpg",
      process.env.PUBLIC_URL + "/assets/2024/Apr/art (1).jpg",
      process.env.PUBLIC_URL + "/assets/2024/Apr/art (2).jpg",
      process.env.PUBLIC_URL + "/assets/2024/May/art.jpg",
      process.env.PUBLIC_URL + "/assets/2024/June/art.jpg",
      process.env.PUBLIC_URL + "/assets/2024/July/art.jpg",
      process.env.PUBLIC_URL + "/assets/2024/Nov/art.jpg",
    ],
  },
  {
    year: "2025",
    image: process.env.PUBLIC_URL + "/assets/2025.jpg",
    images: [
      process.env.PUBLIC_URL + "/assets/2025/Mar/art.jpg",
      process.env.PUBLIC_URL + "/assets/2025/May/art.jpg",
    ],
  },
];

/* ─────────────────────────────────────────
   Shared card inner content
───────────────────────────────────────── */
const CardInner = ({ image, year }) => (
  <>
    <div className="mobile-frame-white" />
    <div className="mobile-frame-red" />
    <div className="mobile-image-box">
      <img src={image} alt={year} className="mobile-card-img" />
    </div>
    <div className="mobile-thumb-star mobile-star-tl"><StarIcon /></div>
    <div className="mobile-thumb-star mobile-star-br"><StarIcon /></div>
    <div className="mobile-year-bubble"><span>{year}</span></div>
  </>
);

/* ─────────────────────────────────────────
   MOBILE GALLERY — horizontal swipe carousel
───────────────────────────────────────── */
const MobileGallery = ({ onOpenYear }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasPopped, setHasPopped] = useState(false);
  const dragStartX = useRef(0);

  const [carouselRef, carouselInView] = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: "-25% 0px",
  });

  // After spring settles, hand control to carousel spring
  useEffect(() => {
    if (carouselInView && !hasPopped) {
      const t = setTimeout(() => setHasPopped(true), 700);
      return () => clearTimeout(t);
    }
  }, [carouselInView, hasPopped]);

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(index, galleryYears.length - 1));
    setActiveIndex(clamped);
  };

  const handleDragStart = (e) => {
    dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    setIsDragging(false);
  };

  const handleDragEnd = (e) => {
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX.current - endX;
    if (Math.abs(diff) > 40) {
      setIsDragging(true);
      goTo(activeIndex + (diff > 0 ? 1 : -1));
    }
  };

  const handleCardClick = (index) => {
    if (isDragging) return;
    if (index === activeIndex) {
      onOpenYear(galleryYears[index].year);
    } else {
      goTo(index);
    }
  };

  return (
    <div className="mobile-gallery-carousel" ref={carouselRef} style={{ minHeight: "320px" }}>
      <div
        className="mobile-carousel-track"
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
      >
        {galleryYears.map(({ year, image }, index) => {
          const offset = index - activeIndex;
          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 1;
          const translateX = offset * 200;
          const carouselScale = isCenter ? 1 : 0.72;
          const carouselOpacity = isCenter ? 1 : 0.45;
          const zIndex = isCenter ? 5 : 3 - Math.abs(offset);

          if (hasPopped) {
            // Pop done — pure carousel spring, no entrance interference
            return (
              <motion.div
                key={year}
                className="mobile-card-wrapper"
                animate={{ x: translateX, scale: carouselScale, opacity: isVisible ? carouselOpacity : 0, zIndex }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => handleCardClick(index)}
                style={{ pointerEvents: isVisible ? "auto" : "none" }}
              >
                <CardInner image={image} year={year} />
              </motion.div>
            );
          }

          // Entrance pop — each card targets its OWN correct opacity/scale
          // so side cards never flash as highlighted during pop
          return (
            <motion.div
              key={year}
              className="mobile-card-wrapper"
              initial={{ opacity: 0, y: 60, scale: 0.82, skewY: 3, x: translateX, zIndex }}
              animate={carouselInView
                ? { opacity: isVisible ? carouselOpacity : 0, y: 0, scale: carouselScale, skewY: 0, x: translateX, zIndex }
                : { opacity: 0, y: 60, scale: 0.82, skewY: 3, x: translateX, zIndex }
              }
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 28,
                mass: 0.6,
              }}
              onClick={() => handleCardClick(index)}
              style={{ pointerEvents: isVisible && carouselInView ? "auto" : "none" }}
            >
              <CardInner image={image} year={year} />
            </motion.div>
          );
        })}
      </div>

      <div className="mobile-dots">
        {galleryYears.map((_, i) => (
          <button
            key={i}
            className={`mobile-dot${i === activeIndex ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to ${galleryYears[i].year}`}
          />
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   DESKTOP THUMBNAIL — pop animation on reveal
───────────────────────────────────────── */
const DesktopThumbnail = ({ year, image, index, selectedYear, onSelect, inView }) => {
  return (
    <motion.div
      layoutId={`card-${year}`}
      className="thumbnail-wrapper"
      onClick={() => !selectedYear && onSelect(year)}
      initial={{ opacity: 0, y: 60, scale: 0.82, skewY: 3 }}
      animate={inView
        ? {
            opacity: selectedYear && selectedYear !== year ? 0 : 1,
            y: 0,
            scale: 1,
            skewY: 0,
            pointerEvents: selectedYear ? "none" : "auto",
          }
        : { opacity: 0, y: 60, scale: 0.82, skewY: 3 }
      }
      transition={inView
        ? {
            delay: index * 0.1,
            type: "spring",
            stiffness: 380,
            damping: 22,
            mass: 0.8,
          }
        : { duration: 0 }
      }
    >
      <div className="frame-white" />
      <div className="frame-red" />
      <div className="thumbnail-image-box">
        <img src={image} alt={year} className="thumbnail-image" />
      </div>
      <div className="thumb-star thumb-star-tl"><StarIcon /></div>
      <div className="thumb-star thumb-star-br"><StarIcon /></div>
      <div className="year-bubble"><span>{year}</span></div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   MAIN GALLERY SECTION
───────────────────────────────────────── */
const GallerySection = () => {
  const isMobile = window.innerWidth <= 768;
  const titleControls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: isMobile ? "-25% 0px" : "-35% 0px",
  });
  const [selectedYear, setSelectedYear] = useState(null);
  const expandedRef = useRef(null);
  const mobileExpandedRef = useRef(null);

  useEffect(() => {
    if (inView) {
      titleControls.start({ opacity: 1, x: 0 });
    }
  }, [inView, titleControls]);

  useEffect(() => {
    if (selectedYear && expandedRef.current) {
      setTimeout(() => {
        expandedRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [selectedYear]);

  const selectedEntry = galleryYears.find((g) => g.year === selectedYear);

  return (
    <section id="gallery" className="gallery-container" ref={ref}>

      {/* ── Desktop title ── */}
      <motion.h2
        className="gallery-title"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="gallery-title-box">
          <span>GALLERY</span>
        </div>
      </motion.h2>

      {/* ── Mobile title — trapezoid from right ── */}
      <motion.div
        className="gallery-mobile-title-wrap"
        initial={{ opacity: 0, x: 120 }}
        animate={titleControls}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
      >
        <div className="gallery-mobile-shadow" />
        <div className="gallery-mobile-border" />
        <div className="gallery-mobile-box">
          <span>GALLERY</span>
        </div>
      </motion.div>

      <div className="gallery-content max-w-[1000px] mx-auto">

        {/* ── Desktop: grid + expanded — hidden on mobile via CSS ── */}
        <div className="desktop-gallery-block">

          <div className={`thumbnail-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 justify-items-center ${selectedYear ? "thumbnails-hidden" : ""}`}>
            {galleryYears.map(({ year, image }, index) => (
              <DesktopThumbnail
                key={year}
                year={year}
                image={image}
                index={index}
                selectedYear={selectedYear}
                onSelect={setSelectedYear}
                inView={inView}
              />
            ))}
          </div>

          <AnimatePresence>
            {selectedYear && selectedEntry && (
              <>
                <div
                  className="expanded-click-outside"
                  onClick={() => setSelectedYear(null)}
                />
                <motion.div
                  ref={expandedRef}
                  layoutId={`card-${selectedYear}`}
                  className="expanded-inline-wrapper"
                  transition={{ type: "spring", stiffness: 180, damping: 26 }}
                >
                  <ExpandedGallery
                    year={selectedYear}
                    images={selectedEntry.images}
                    onClose={() => setSelectedYear(null)}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

        </div>

        {/* ── Mobile: carousel + expanded — hidden on desktop via CSS ── */}
        {!selectedYear && (
          <MobileGallery onOpenYear={(year) => setSelectedYear(year)} />
        )}

        {selectedYear && selectedEntry && (
          <div className="mobile-expanded-wrapper" ref={mobileExpandedRef}>
            <ExpandedGallery
              year={selectedYear}
              images={selectedEntry.images}
              onClose={() => setSelectedYear(null)}
            />
          </div>
        )}

      </div>
    </section>
  );
};

export default GallerySection;