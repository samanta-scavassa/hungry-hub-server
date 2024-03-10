const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver.model");

// Create a new driver
router.post("/drivers", async (req, res) => {
  try {
    const newDriver = await Driver.create(req.body);
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a driver by ID
router.get("/drivers/:id", async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get drivers by availability status
router.get("/drivers/availability/:status", async (req, res) => {
  try {
    const drivers = await Driver.find({
      availabilityStatus: req.params.status,
    });
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a driver
router.patch("/drivers/:id", async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json(driver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a driver
router.delete("/drivers/:id", async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
