// const express = require("express");
// const { addSchoolCode, getAllSchoolCodes, validateSchoolCode } = require("../controllers/schoolController");

// const router = express.Router();

// router.post("/add", addSchoolCode);
// router.get("/codes", getAllSchoolCodes);
// router.get("/validate/:code", validateSchoolCode);

// module.exports = router;


const express = require("express");
const router = express.Router();

// Temporary in-memory storage
let schoolCodes = [];

// ✅ POST API: Add School Code
router.post("/schools", (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({
      success: false,
      message: "School code is required",
    });
  }
  schoolCodes.push(code);
  res.status(201).json({
    success: true,
    message: "School code added successfully",
  });
});

// ✅ GET API: Retrieve All School Codes
router.get("/schools", (req, res) => {
  res.status(200).json({
    success: true,
    data: schoolCodes,
  });
});

// ✅ GET API: Validate School Code
router.get("/schools/:code", (req, res) => {
  const { code } = req.params;
  if (schoolCodes.includes(code)) {
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "You have entered a correct school code",
      data: {},
      url: "https://schoolmapping.eduwheels.com/",
    });
  }
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: "You have entered an incorrect school code",
    data: {},
  });
});

module.exports = router;

