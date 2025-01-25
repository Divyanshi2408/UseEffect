import React, { useState, useEffect, useRef } from "react";

const LazyLoadImages = ({ images }) => {
  const [loadedImages, setLoadedImages] = useState([]); // Tracks loaded images
  const imageRefs = useRef([]); // References for image elements

  // Set up IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageIndex = entry.target.dataset.index;
            if (!loadedImages.includes(imageIndex)) {
              setLoadedImages((prev) => [...prev, imageIndex]); // Mark as loaded
            }
          }
        });
      },
      { rootMargin: "0px 0px 200px 0px", threshold: 0.1 } // Slight preloading
    );

    imageRefs.current.forEach((img) => observer.observe(img));

    return () => {
      observer.disconnect(); // Cleanup observer
    };
  }, [loadedImages]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
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

const App = () => {
  // Dummy list of images
  const images = [
    { src: "https://via.placeholder.com/400?text=Image+1", alt: "Image 1" },
    { src: "https://via.placeholder.com/400?text=Image+2", alt: "Image 2" },
    { src: "https://via.placeholder.com/400?text=Image+3", alt: "Image 3" },
    { src: "https://via.placeholder.com/400?text=Image+4", alt: "Image 4" },
    { src: "https://via.placeholder.com/400?text=Image+5", alt: "Image 5" },
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Lazy Loading Images</h1>
      <LazyLoadImages images={images} />
    </div>
  );
};

export default App;
