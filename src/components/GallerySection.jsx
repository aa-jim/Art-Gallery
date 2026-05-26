import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./GallerySection.css";
import ExpandedGallery from "./ExpandedGallery";
import { client } from "../sanityClient";

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

/* ──────────────────────────────────────────────────────────────────────────
   GROQ query — sort artworks chronologically via monthIndex
────────────────────────────────────────────────────────────────────────── */
const GALLERY_QUERY = `
  *[_type == "yearCover"] | order(year asc) {
    year,
    "coverImageUrl": coverImage.asset->url,
    "images": *[_type == "artwork" && year == ^.year] | order(monthIndex asc, order asc) {
      "url": image.asset->url,
      month
    }
  }
`;

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

const MobileGallery = ({ galleryYears, onOpenYear }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasPopped, setHasPopped] = useState(false);
  const dragStartX = useRef(0);

  const [carouselRef, carouselInView] = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: "-25% 0px",
  });

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
        {galleryYears.map(({ year, coverImageUrl }, index) => {
          const offset = index - activeIndex;
          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 1;
          const translateX = offset * 200;
          const carouselScale = isCenter ? 1 : 0.72;
          const carouselOpacity = isCenter ? 1 : 0.45;
          const zIndex = isCenter ? 5 : 3 - Math.abs(offset);

          if (hasPopped) {
            return (
              <motion.div
                key={year}
                className="mobile-card-wrapper"
                animate={{ x: translateX, scale: carouselScale, opacity: isVisible ? carouselOpacity : 0, zIndex }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => handleCardClick(index)}
                style={{ pointerEvents: isVisible ? "auto" : "none" }}
              >
                <CardInner image={coverImageUrl} year={year} />
              </motion.div>
            );
          }

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
              <CardInner image={coverImageUrl} year={year} />
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
   DESKTOP THUMBNAIL
   hasEnteredOnce — stagger only plays on the very first entrance.
   All subsequent animations (expand/collapse) are instant, no delay.
───────────────────────────────────────── */
const DesktopThumbnail = ({ year, image, index, selectedYear, onSelect, inView, hasEnteredOnce }) => {
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
            // Stagger only on first entrance — never again after that
            delay: hasEnteredOnce ? 0 : index * 0.1,
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

const GallerySkeleton = () => (
  <div className="thumbnail-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 justify-items-center">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="thumbnail-wrapper" style={{ opacity: 0.15 }}>
        <div className="frame-white" />
        <div className="frame-red" />
        <div className="thumbnail-image-box" style={{ background: "#222" }} />
      </div>
    ))}
  </div>
);

const GallerySection = () => {
  const isMobile = window.innerWidth <= 768;
  const titleControls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: isMobile ? "-25% 0px" : "-35% 0px",
  });
  const [selectedYear, setSelectedYear] = useState(null);
  const [hasEnteredOnce, setHasEnteredOnce] = useState(false);
  const expandedRef = useRef(null);
  const mobileExpandedRef = useRef(null);

  const [galleryYears, setGalleryYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client.fetch(GALLERY_QUERY)
      .then((data) => {
        setGalleryYears(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setError("Failed to load gallery. Please try again later.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (inView) {
      titleControls.start({ opacity: 1, x: 0 });
      // After the initial stagger plays (~0.6s for 6 cards), lock it off forever
      const t = setTimeout(() => setHasEnteredOnce(true), 700);
      return () => clearTimeout(t);
    }
  }, [inView, titleControls]);

  useEffect(() => {
    if (selectedYear && expandedRef.current) {
      scrollBeforeExpand.current = window.scrollY;
      const el = expandedRef.current;
      const rect = el.getBoundingClientRect();
      const targetTop = window.scrollY + rect.top - (window.innerHeight * 0.15);
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  }, [selectedYear]);

  const scrollBeforeExpand = useRef(0);

  const handleClose = () => {
    setSelectedYear(null);
    setTimeout(() => {
      window.scrollTo({ top: scrollBeforeExpand.current, behavior: "smooth" });
    }, 50);
  };

  const selectedEntry = galleryYears.find((g) => g.year === selectedYear);

  return (
    <section id="gallery" className="gallery-container" ref={ref}>

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
        {error && (
          <p style={{ color: "#fd0000", textAlign: "center", fontFamily: "Montserrat", padding: "2rem" }}>
            {error}
          </p>
        )}

        <div className="desktop-gallery-block">
          {loading ? (
            <GallerySkeleton />
          ) : (
            <div className={`thumbnail-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 justify-items-center ${selectedYear ? "thumbnails-hidden" : ""}`}>
              {galleryYears.map(({ year, coverImageUrl }, index) => (
                <DesktopThumbnail
                  key={year}
                  year={year}
                  image={coverImageUrl}
                  index={index}
                  selectedYear={selectedYear}
                  onSelect={setSelectedYear}
                  inView={inView}
                  hasEnteredOnce={hasEnteredOnce}
                />
              ))}
            </div>
          )}

          <AnimatePresence>
            {selectedYear && selectedEntry && (
              <>
                <div className="expanded-click-outside" onClick={handleClose} />
                <motion.div
                  ref={expandedRef}
                  layoutId={`card-${selectedYear}`}
                  className="expanded-inline-wrapper"
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                >
                  <ExpandedGallery
                    year={selectedYear}
                    images={selectedEntry.images}
                    onClose={handleClose}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {!loading && !selectedYear && (
          <MobileGallery galleryYears={galleryYears} onOpenYear={(year) => setSelectedYear(year)} />
        )}

        {selectedYear && selectedEntry && (
          <div className="mobile-expanded-wrapper" ref={mobileExpandedRef}>
            <ExpandedGallery
              year={selectedYear}
              images={selectedEntry.images}
              onClose={handleClose}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;