import { useState } from "react";

import "./App.css";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Signup />
    </>
  );
}

export default App;
