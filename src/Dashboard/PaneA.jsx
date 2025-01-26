import React, { useEffect } from "react";

const PaneA = () => {
  useEffect(() => {
    console.log("Pane A Mounted");

    const intervalId = setInterval(() => {
      console.log("Pane A is active");
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log("Pane A Unmounted: Cleaned up interval");
    };
  }, []);

  return <h2>This is Pane A</h2>;
};

export default PaneA;
