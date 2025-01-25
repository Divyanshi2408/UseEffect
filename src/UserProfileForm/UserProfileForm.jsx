import React, { useState, useEffect } from "react";

const UserProfileForm = () => {
  // State for form fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  // State for validation messages
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  // State for overall form validity
  const [isFormValid, setIsFormValid] = useState(false);

  // Email validation
  useEffect(() => {
    if (email.trim() === "") {
      setEmailError("Email is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }
  }, [email]);

  // Username validation (depends on email)
  useEffect(() => {
    if (username.trim() === "") {
      setUsernameError("Username is required.");
    } else if (email.trim() !== "" && !username.startsWith(email.split("@")[0])) {
      setUsernameError("Username should start with the email prefix.");
    } else {
      setUsernameError("");
    }
  }, [username, email]);

  // Overall form validation
  useEffect(() => {
    if (!emailError && !usernameError && email && username) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [emailError, usernameError, email, username]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", fontFamily: "Arial" }}>
      <h1>User Profile Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div style={{ marginBottom: "16px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: "block",
              marginTop: "8px",
              padding: "8px",
              width: "100%",
              border: emailError ? "1px solid red" : "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>

        {/* Username Field */}
        <div style={{ marginBottom: "16px" }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              display: "block",
              marginTop: "8px",
              padding: "8px",
              width: "100%",
              border: usernameError ? "1px solid red" : "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          style={{
            padding: "10px 20px",
            backgroundColor: isFormValid ? "#4CAF50" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
