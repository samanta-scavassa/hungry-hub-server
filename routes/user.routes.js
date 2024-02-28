const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

// Update User Endpoint
router.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    updates.updatedOn = Date.now();
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Account Endpoint
router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create User Endpoint
router.post("/users", async (req, res) => {
  try {
    const userData = req.body; // Assuming user data comes in the request body

    const newUser = await User.create(userData);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get User by ID Endpoint
router.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
