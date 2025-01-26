import React, { useEffect } from "react";

const PaneC = () => {
  useEffect(() => {
    console.log("Pane C Mounted");

    const timeoutId = setTimeout(() => {
      console.log("Pane C: Delayed action executed");
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      console.log("Pane C Unmounted: Cleaned up timeout");
    };
  }, []);

  return <h2>This is Pane C</h2>;
};

export default PaneC;
