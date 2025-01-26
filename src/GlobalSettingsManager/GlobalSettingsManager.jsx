import React, { useState, useEffect } from "react";

const GlobalSettingsManager = () => {
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    language: "en",
  });

  // Load settings from local storage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("appSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Sync settings to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
  }, [settings]);

  // Handler functions to update settings
  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const toggleNotifications = () => {
    setSettings((prev) => ({
      ...prev,
      notifications: !prev.notifications,
    }));
  };

  const changeLanguage = (lang) => {
    setSettings((prev) => ({
      ...prev,
      language: lang,
    }));
  };

  return (
    <div
      style={{
        backgroundColor: settings.theme === "light" ? "#fff" : "#333",
        color: settings.theme === "light" ? "#000" : "#fff",
        padding: "20px",
        textAlign: "center",
        height: "100vh",
      }}
    >
      <h1>Global Settings Manager</h1>
      <p>Theme: {settings.theme}</p>
      <p>Notifications: {settings.notifications ? "Enabled" : "Disabled"}</p>
      <p>Language: {settings.language}</p>

      <button
        onClick={toggleTheme}
        style={{
          margin: "10px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Toggle Theme
      </button>

      <button
        onClick={toggleNotifications}
        style={{
          margin: "10px",
          padding: "10px 20px",
          backgroundColor: "#28A745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Toggle Notifications
      </button>

      <div>
        <button
          onClick={() => changeLanguage("en")}
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: settings.language === "en" ? "#FFC107" : "#ccc",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("es")}
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: settings.language === "es" ? "#FFC107" : "#ccc",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Spanish
        </button>
        <button
          onClick={() => changeLanguage("fr")}
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: settings.language === "fr" ? "#FFC107" : "#ccc",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          French
        </button>
      </div>
    </div>
  );
};

export default GlobalSettingsManager;
