const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
});

const School = mongoose.model("School", schoolSchema);
module.exports = School;
