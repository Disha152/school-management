const School = require("../models/School");
const axios = require("axios");

// Add School Code (POST)
const addSchoolCode = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: "School code is required" });
    }

    const school = new School({ code });
    await school.save();

    res.status(201).json({ success: true, message: "School code added successfully", data: school });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All School Codes (GET)
const getAllSchoolCodes = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json({ success: true, data: schools });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Validate School Code (GET)
const validateSchoolCode = async (req, res) => {
  try {
    const { code } = req.params;

    const response = await axios.get(
      `https://schoolmapping.eduwheels.com/AdminWebService.asmx/ValidateSchoolCode?strSchoolCode=${code}`
    );

    const isValid = response.data.success;

    if (isValid) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "You have entered a correct school code",
        data: {},
        url: "https://schoolmapping.eduwheels.com/",
      });
    } else {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: "You have entered an incorrect school code",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error validating school code" });
  }
};

module.exports = { addSchoolCode, getAllSchoolCodes, validateSchoolCode };
