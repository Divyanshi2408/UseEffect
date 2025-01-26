import React, { useState } from "react";
import MouseTracker from "./MouseTracker/MouseTracker";
import ApiPolling from "./Api Polling/ApiPolling";
import UserProfileForm from "./UserProfileForm/UserProfileForm";
import LazyLoadImages from "./LazyLoadImages/LazyLoadImages";
import DynamicChart from "./DynamicChart/DynamicChart";
import DynamicApiPolling from "./DynamicApiPolling/DynamicApiPolling"
import Dashboard from "./Dashboard/Dashboard"
import GlobalSettingsManager from "./GlobalSettingsManager/GlobalSettingsManager";

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
  const [chartData, setChartData] = useState([12, 19, 3, 5, 2, 3]);
  const [chartLabels, setChartLabels] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
  ]);

  const updateChart = () => {
    setChartData(chartData.map(() => Math.floor(Math.random() * 20)));
    setChartLabels([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]);
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
    <div>
    <h1 style={{ textAlign: "center" }}>Lazy Loading Images</h1>
    <LazyLoadImages images={images} />
  </div>
  <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Dynamic Chart with Chart.js</h1>
      <DynamicChart data={chartData} labels={chartLabels} />
      <button
        onClick={updateChart}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Update Chart
      </button>
    </div>
    <DynamicApiPolling/>
    <Dashboard/>
    <GlobalSettingsManager/>
    </>
  );
};

export default App;
