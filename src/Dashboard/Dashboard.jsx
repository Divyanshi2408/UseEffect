import React, { useState } from "react";
import PaneA from "./PaneA";
import PaneB from "./PaneB";
import PaneC from "./PaneC";

const Dashboard = () => {
  const [activePane, setActivePane] = useState("A");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Multi-Pane Dashboard</h1>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActivePane("A")}
          style={{
            margin: "0 10px",
            padding: "10px 20px",
            backgroundColor: activePane === "A" ? "#4CAF50" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Pane A
        </button>
        <button
          onClick={() => setActivePane("B")}
          style={{
            margin: "0 10px",
            padding: "10px 20px",
            backgroundColor: activePane === "B" ? "#4CAF50" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Pane B
        </button>
        <button
          onClick={() => setActivePane("C")}
          style={{
            margin: "0 10px",
            padding: "10px 20px",
            backgroundColor: activePane === "C" ? "#4CAF50" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Pane C
        </button>
      </div>
      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
        {activePane === "A" && <PaneA />}
        {activePane === "B" && <PaneB />}
        {activePane === "C" && <PaneC />}
      </div>
    </div>
  );
};

export default Dashboard;
