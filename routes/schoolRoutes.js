const express = require("express");
const School = require("../models/School");

const router = express.Router();

// ✅ POST API - Add a school code
router.post("/schools", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: "School code is required" });
    }

    // Check if the code already exists
    const existingSchool = await School.findOne({ code });
    if (existingSchool) {
      return res.status(400).json({ success: false, message: "School code already exists" });
    }

    // Save the new school code in MongoDB
    const newSchool = new School({ code });
    await newSchool.save();

    res.status(201).json({ success: true, message: "School code added successfully", data: newSchool });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


// ✅ GET API - Retrieve all school codes
router.get("/schools", async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json({ success: true, data: schools });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ✅ GET API - Validate School Code
router.get("/schools/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const school = await School.findOne({ code });

    if (school) {
      const schoolUrl = `https://schoolmapping.eduwheels.com/AdminWebService.asmx/ValidateSchoolCode?strSchoolCode=${code}`;
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "You have entered a correct school code",
        data: school,
        url: schoolUrl,
      });
    } else {
      res.status(404).json({
        success: false,
        statusCode: 500,
        message: "You have entered an incorrect school code",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
