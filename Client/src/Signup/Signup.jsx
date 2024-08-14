import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [err, setErr] = useState();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/createUser", { name, email, password })
      .then((result) => {
        console.log(result);
        setMessage(result.data.message);
        if (result.data.message === "Account created succesfully") {
          setErr(false);
        } else if (result.data.message === "Already has an account") {
          setErr(true);
        }
        console.log(result.data.message);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  return (
    <form className="createUser" id="form" onSubmit={Submit}>
      <h1>Add New User</h1>
      <div className="user-info">
        <label htmlFor="form">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="user-info">
        <label htmlFor="form">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="user-info">
        <label htmlFor="form">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Add User</button>
      {message && <p style={{ color: err ? "red" : "green" }}> {message} </p>}
    </form>
  );
}

export default Signup;
