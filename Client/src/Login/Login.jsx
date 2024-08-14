import React, { useState } from "react";
import axios from "axios";

import "./Login.css";

function Login() {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  axios.defaults.withCredentials = true;

  const Submit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/login", { email, password })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className="createUser" onSubmit={Submit}>
        <h1>Login Form</h1>

        <div className="user-info">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="user-info">
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </>
  );
}

export default Login;
