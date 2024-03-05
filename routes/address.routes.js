const express = require("express");
const router = express.Router();
const Address = require("../models/Address.model");

// Post AddressEndpoint
router.post("/addresses", async (req, res) => {
  try {
    const addressData = req.body;
    
    const newAddress = await Address.create(addressData);
    
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Address by User ID Endpoint
router.get("/addresses/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const addresses = await Address.find({ userId: userId });
    res.json(addresses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Address by ID Endpoint
router.get("/addresses/:id", async (req, res) => {
  try {
    const addressId = req.params.id;

    const address = await Address.findById(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Address by Label Endpoint
router.get("/addresses/label/:label", async (req, res) => {
  try {
    const label = req.params.label;

    const addresses = await Address.find({ label });

    res.json(addresses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Update address Endpoint
router.put("/addresses/:id", async (req, res) => {
  try {
    const addressId = req.params.id;
    const updates = req.body;

    const updatedaddress = await Address.findByIdAndUpdate(addressId, updates, {
      new: true,
    });

    res.json(updatedaddress
);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Address Endpoint
router.delete("/addresses/:id", async (req, res) => {
  try {
    const addressId = req.params.id;

    await Address.findByIdAndDelete(addressId);

    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
