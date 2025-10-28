// App.jsk

import React, { useState } from "react";
import "./App.css"; // optional if you have styling

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
    } else {
      console.log("Username:", username);
      console.log("Password:", password);
      setError("");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;

// App.css

.login-container {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  margin: 20px auto;
  text-align: center;
}

.login-container input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

.login-container button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
}
