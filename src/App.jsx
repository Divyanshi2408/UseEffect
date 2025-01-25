import React, { useState } from "react";
import MouseTracker from "./MouseTracker/MouseTracker";
import ApiPolling from "./Api Polling/ApiPolling";
import UserProfileForm from "./UserProfileForm/UserProfileForm";

const App = () => {
  const [isTrackerVisible, setIsTrackerVisible] = useState(true);

  const toggleTracker = () => {
    setIsTrackerVisible((prevState) => !prevState);
  };

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
    </>
  );
};

export default App;
