const mongoose = require("mongoose");

const thiefSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    unique: true,
    required: true
  },
  op_area: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

const Thief = (module.exports = mongoose.model("Thief", thiefSchema));
