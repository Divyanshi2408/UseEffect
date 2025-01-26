import React, { useState, useEffect } from "react";

const AutoSaveTextEditor = () => {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Function to simulate saving content
  const saveContent = () => {
    setIsSaving(true);
    console.log("Content saved:", content); // Replace this with an actual save operation (e.g., API call)
    setTimeout(() => {
      setIsSaving(false);
    }, 1000); // Simulate a 1-second save delay
  };

  // useEffect to handle auto-save after 5 seconds of inactivity
  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout); // Clear the existing timer
    }

    const timeout = setTimeout(() => {
      if (content) {
        saveContent(); // Save content after 5 seconds of inactivity
      }
    }, 5000); // 5 seconds delay

    setTypingTimeout(timeout);

    return () => {
      clearTimeout(timeout); // Cleanup on component unmount or content change
    };
  }, [content]);

  // Handle user input
  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Auto-Save Text Editor</h1>
      <textarea
        value={content}
        onChange={handleInputChange}
        placeholder="Start typing..."
        rows={10}
        cols={50}
        style={{
          width: "80%",
          height: "150px",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          outline: "none",
          resize: "none",
        }}
      />
      <div style={{ marginTop: "10px", fontSize: "16px", color: isSaving ? "green" : "black" }}>
        {isSaving ? "Saving..." : "All changes saved."}
      </div>
    </div>
  );
};

export default AutoSaveTextEditor;
