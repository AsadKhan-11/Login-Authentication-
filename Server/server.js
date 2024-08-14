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

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ message: "Succesfull", result: user });
        } else {
          res.json({ message: "Incorrect password" });
        }
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

  UserModel.findOne({ email: email }).then((user) => {
    bcrypt
      .hash(password, 10)
      .then((response) => {
        if (response) {
          if (user) {
            return res.json({ message: "Already has an account" });
          } else {
            UserModel.create({ name: name, email: email, password: response })
              .then((result) => {
                res.json({
                  message: "Account created succesfully",
                  response: result,
                });
              })
              .catch((err) => {
                res
                  .status(500)
                  .json({ message: "Cannot create user", error: err });
              });
          }
        }
      })
      .catch((err) => {
        console.log("error while creating hash", err);
      });
  });
});

app.listen(8000, () => {
  console.log("Server listening");
});
