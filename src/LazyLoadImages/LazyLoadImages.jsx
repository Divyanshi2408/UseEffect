import React, { useState, useEffect, useRef } from "react";

const LazyLoadImages = ({ images }) => {
  const [loadedImages, setLoadedImages] = useState([]); // Tracks which images are loaded
  const imageRefs = useRef([]); // References for all image elements

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index; // Get the index of the image
            if (!loadedImages.includes(index)) {
              setLoadedImages((prev) => [...prev, index]); // Mark as loaded
            }
          }
        });
      },
      { rootMargin: "100px", threshold: 0.1 } // Trigger slightly before entering the viewport
    );

    // Observe each image
    imageRefs.current.forEach((img) => observer.observe(img));

    return () => {
      observer.disconnect(); // Cleanup observer on unmount
    };
  }, [loadedImages]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            height: "200px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            ref={(el) => (imageRefs.current[index] = el)}
            data-index={index}
            src={loadedImages.includes(index.toString()) ? image.src : ""}
            alt={image.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: loadedImages.includes(index.toString()) ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
          {!loadedImages.includes(index.toString()) && (
            <span style={{ position: "absolute", color: "#888" }}>Loading...</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default LazyLoadImages;
