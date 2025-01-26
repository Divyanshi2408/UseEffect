import React, { useEffect } from "react";

const PaneB = () => {
  useEffect(() => {
    console.log("Pane B Mounted");

    const handleResize = () => {
      console.log("Pane B: Window resized");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("Pane B Unmounted: Cleaned up resize listener");
    };
  }, []);

  return <h2>This is Pane B</h2>;
};

export default PaneB;
