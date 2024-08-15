import { useState } from "react";

import "./App.css";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
