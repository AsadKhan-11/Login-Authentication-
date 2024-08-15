const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./Model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://mrasad10khan:mongodb@cluster0.yz0l1cn.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
);

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("The token is not available");
  } else {
    jwt.verify(token, "jwt-secret", (err, respond) => {
      if (err) return res.json("Token is wrong");
      next();
    });
  }
};

app.get("/home", verifyUser, (req, res) => {
  return res.json("Success");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error comparing passwords", error: err });
          }
          if (isMatch) {
            const token = jwt.sign({ email: user.email }, "jwt-secret", {
              expiresIn: "1d",
            });

            res.cookie("token", token);
            return res.json({ message: "Successful", result: user });
          } else {
            return res.json({ message: "Incorrect password", result: user });
          }
        });
      } else {
        res.json({ message: "No such Id exists" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.post("/createUser", (req, res) => {
  const { name, email, password } = req.body;

  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.json({ message: "Already has an account" });
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            UserModel.create({ name: name, email: email, password: hash })
              .then((result) => {
                res.json({
                  message: "Account created successfully",
                  response: result,
                });
              })
              .catch((err) => {
                res
                  .status(500)
                  .json({ message: "Cannot create user", error: err });
              });
          })
          .catch((err) => {
            console.log("Error while creating hash", err);
            res
              .status(500)
              .json({ message: "Error creating hash", error: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding user", error: err });
    });
});

app.listen(8000, () => {
  console.log("Server listening");
});
