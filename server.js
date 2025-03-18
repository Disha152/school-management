const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(express.json());

// Import and Use Routes
const schoolRoutes = require("./routes/schoolRoutes");
app.use("/api", schoolRoutes);

// Default Route for Testing
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected:", mongoose.connection.host))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
