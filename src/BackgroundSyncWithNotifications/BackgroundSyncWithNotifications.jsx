import React, { useState, useEffect } from "react";

const BackgroundSyncWithNotifications = () => {
  const [data, setData] = useState([]);
  const [isPolling, setIsPolling] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

  // Function to check and request notification permission
  const requestNotificationPermission = () => {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
    }
  };

  // Function to fetch new data from the API (simulate an API request)
  const fetchData = async () => {
    // Simulating an API request with a setTimeout
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(["New data item", "Another new data item"]);
      }, 2000); // Simulate a delay for API response
    });

    setData(response);
    sendNotification(response); // Send notification after new data is received
  };

  // Function to send a notification
  const sendNotification = (newData) => {
    if (notificationPermission === "granted") {
      new Notification("New Data Available", {
        body: `New data has been received: ${newData.join(", ")}`,
        icon: "https://via.placeholder.com/150",
      });
    }
  };

  // Start background polling when the component is mounted
  useEffect(() => {
    if (notificationPermission === "default") {
      requestNotificationPermission();
    }

    const startPolling = async () => {
      setIsPolling(true);
      while (isPolling) {
        await fetchData();
        await new Promise((resolve) => setTimeout(resolve, 10000)); // Poll every 10 seconds
      }
    };

    if (notificationPermission === "granted") {
      startPolling();
    }

    return () => {
      setIsPolling(false); // Stop polling when the component unmounts
    };
  }, [notificationPermission, isPolling]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Background Sync with Notifications</h1>
      <p>
        Data from the server is being synced in the background. When new data arrives, you will receive a
        browser notification.
      </p>
      <p>{isPolling ? "Polling is active..." : "Polling is stopped."}</p>
      <h3>Received Data:</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default BackgroundSyncWithNotifications;
