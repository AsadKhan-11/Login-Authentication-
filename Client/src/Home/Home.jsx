import React, { useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
function Home() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/home")
      .then((req, res) => {
        console.log(req);
        if (req.data !== "Success") {
          navigate("/login");
        } else navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>Home</div>;
}

export default Home;
