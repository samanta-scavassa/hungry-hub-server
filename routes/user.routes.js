const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
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
    res.status(400).json({ message: "Error while updating the user" });
  }
});

// Delete Account Endpoint
router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error while deleting the user" });
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
    res.status(400).json({ message: "Error while getting the user" });
  }
});

//update user password
router.patch("/users/:id/password", async (req, res) => {
  try {
    const userId = req.params.id;
    const { password } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const updatedOn = Date.now();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword, updatedOn },
      {
        new: true,
      }
    );

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
