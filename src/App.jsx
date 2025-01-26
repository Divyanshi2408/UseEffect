import React, { useState } from "react";
import MouseTracker from "./MouseTracker/MouseTracker";
import ApiPolling from "./Api Polling/ApiPolling";
import UserProfileForm from "./UserProfileForm/UserProfileForm";
import LazyLoadImages from "./LazyLoadImages/LazyLoadImages";

const App = () => {
  const [isTrackerVisible, setIsTrackerVisible] = useState(true);

  const toggleTracker = () => {
    setIsTrackerVisible((prevState) => !prevState);
  };
  const images = [
    { src: "https://via.placeholder.com/400?text=Image+1", alt: "Image 1" },
    { src: "https://via.placeholder.com/400?text=Image+2", alt: "Image 2" },
    { src: "https://via.placeholder.com/400?text=Image+3", alt: "Image 3" },
    { src: "https://via.placeholder.com/400?text=Image+4", alt: "Image 4" },
    { src: "https://via.placeholder.com/400?text=Image+5", alt: "Image 5" },
  ];
  

  return (
    <>
    <ApiPolling/>
    <div style={{ textAlign: "center", padding: "20px" }}>
    
      <h1>Toggle Component Visibility</h1>
      <button onClick={toggleTracker}>
        {isTrackerVisible ? "Hide Mouse Tracker" : "Show Mouse Tracker"}
      </button>

    
      {isTrackerVisible && <MouseTracker/>}
    </div>
    <UserProfileForm/>
    <div>
    <h1 style={{ textAlign: "center" }}>Lazy Loading Images</h1>
    <LazyLoadImages images={images} />
  </div>
    </>
  );
};

export default App;
