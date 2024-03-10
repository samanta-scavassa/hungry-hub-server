const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification.model");

//Get Notification by id Endpoint
router.get("/notifications/:id", async (req, res) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json(notification);
  } catch (error) {
    res.status(400).json({ message: "Error while getting the notification" });
  }
});

//Update Notification by id Endpoint
router.put("/notifications/:id", async (req, res) => {
  try {
    const notificationId = req.params.id;
    const updates = req.body;

    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      updates,
      { new: true }
    );
    res.json(updatedNotification);
  } catch (error) {
    res.status(400).json({ message: "Error while updating the Notification" });
  }
});

//Get Notification by Cart id Endpoint
router.get("/notifications/carts/:cartId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const notification = await Notification.find({ cartId: cartId });
    res.json(notification);
  } catch (error) {
    res.status(400).json({ message: "Error while getting the Notification" });
  }
});

//Create Notification Endpoint
router.post("/notifications", async (req, res) => {
  try {
    const newNotification = await Notification.create(req.body);

    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ message: "Error while creating the Notification" });
  }
});

//Delete Notification by id Endpoint
router.delete("/notifications/:id", async (req, res) => {
  try {
    const notificationId = req.params.id;
    await Notification.findByIdAndDelete(notificationId);

    res.json({ message: "Notification has been deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error while deleting the Notification" });
  }
});

module.exports = router;
