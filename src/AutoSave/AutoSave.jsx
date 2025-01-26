import React, { useState, useEffect } from "react";

const AutoSave = () => {
  const [text, setText] = useState(""); // Current text in the editor
  const [lastSavedText, setLastSavedText] = useState(""); // Last saved text
  const [isSaving, setIsSaving] = useState(false); // Save status indicator

  // Function to simulate saving to a server
  const saveToServer = async (content) => {
    console.log("Saving to server:", content);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Saved successfully");
      }, 1000); // Simulate a delay in server response
    });
  };

  // Auto-save logic using useEffect
  useEffect(() => {
    const handleAutoSave = async () => {
      if (text !== lastSavedText) {
        setIsSaving(true); // Indicate saving status
        await saveToServer(text); // Simulate API call
        setLastSavedText(text); // Update the last saved text
        setIsSaving(false); // Reset saving status
      }
    };

    const delay = 2000; // Auto-save after 2 seconds of inactivity
    const timer = setTimeout(() => {
      handleAutoSave();
    }, delay);

    return () => clearTimeout(timer); // Cleanup previous timeout
  }, [text, lastSavedText]); // Re-run effect whenever `text` changes

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Auto-Save Text Editor</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing..."
        rows="10"
        cols="50"
        style={{
          width: "80%",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      ></textarea>
      <div style={{ marginTop: "10px", fontStyle: "italic", color: "#555" }}>
        {isSaving ? "Saving changes..." : "All changes saved!"}
      </div>
    </div>
  );
};

export default AutoSave;
