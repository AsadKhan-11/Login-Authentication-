import { useState } from "react";

import "./App.css";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
