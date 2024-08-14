const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const newModel = mongoose.model("logins", newSchema);

module.exports = newModel;
