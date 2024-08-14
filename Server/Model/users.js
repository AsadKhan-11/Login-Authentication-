const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const newModel = mongoose.model("users", newSchema);

module.exports = newModel;
