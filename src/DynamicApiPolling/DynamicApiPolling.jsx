import React, { useState, useEffect } from "react";

const DynamicApiPolling = () => {
  const [data, setData] = useState(null); // State to store API data
  const [interval, setInterval] = useState(5000); // Initial polling interval (5 seconds)
  const [isPolling, setIsPolling] = useState(true); // Polling control flag

  useEffect(() => {
    let timeout;

    const fetchData = async () => {
      try {
        const startTime = Date.now(); // Record the start time
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1"); // Example API
        const result = await response.json();
        const endTime = Date.now(); // Record the end time

        setData(result); // Update the data state
        console.log("Fetched data:", result);

        // Calculate the server response time
        const responseTime = endTime - startTime;

        // Dynamically adjust the interval based on the response time
        const newInterval = Math.max(2000, responseTime * 2); // At least 2 seconds
        setInterval(newInterval);
        console.log(`Adjusted polling interval: ${newInterval} ms`);
      } catch (error) {
        console.error("Error fetching data:", error);

        // If there's an error, increase the interval to reduce load
        setInterval((prev) => Math.min(prev * 2, 30000)); // Cap at 30 seconds
      }
    };

    if (isPolling) {
      fetchData();
      timeout = setTimeout(fetchData, interval); // Set the next polling interval
    }

    return () => clearTimeout(timeout); // Cleanup the timeout
  }, [interval, isPolling]); // Re-run effect when interval or polling flag changes

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Dynamic API Polling</h1>
      <div>
        <button
          onClick={() => setIsPolling((prev) => !prev)}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: isPolling ? "#ff4d4d" : "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isPolling ? "Stop Polling" : "Start Polling"}
        </button>
      </div>
      <div>
        <h3>Current Polling Interval: {interval} ms</h3>
        <pre style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>
          {data ? JSON.stringify(data, null, 2) : "No data fetched yet"}
        </pre>
      </div>
    </div>
  );
};

export default DynamicApiPolling;
