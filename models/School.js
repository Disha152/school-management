const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "School code is required"],
    unique: true,
  },
});

module.exports = mongoose.model("School", SchoolSchema);
