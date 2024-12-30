import React, { useState, useEffect } from "react";

const ApiPolling = () => {
  const [data, setData] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const fetchData = async () => {
    try {
      setLoading(true); 
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const randomPost = result[Math.floor(Math.random() * result.length)];
      setData(randomPost); 
      setError(null); 
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData(); 
    }, 5000);

    
    return () => clearInterval(interval);
  }, []); 

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>API Polling Example</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {data && (
        <div>
          <h2>{data.title}</h2>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
};

export default ApiPolling;
