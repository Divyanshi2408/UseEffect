import React, { useState, useEffect } from "react";

const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 }); // State to store mouse position

  const updateMousePosition = (event) => {
    setPosition({ x: event.clientX, y: event.clientY }); // Update position state
  };

  useEffect(() => {
    console.log("Component mounted");
    // Add the mousemove event listener
    window.addEventListener("mousemove", updateMousePosition);

    // Cleanup logic: Remove the event listener when the component unmounts
    return () => {
      console.log("Component unmounted - Cleanup executed");
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Mouse Tracker</h1>
      <p>Move your mouse around!</p>
      <p>
        Current Position: <strong>X: {position.x}, Y: {position.y}</strong>
      </p>
    </div>
  );
};

export default MouseTracker;
