const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu.model");

//Create a new menu item
router.post("/menu-items", (req, res) => {
  Menu.create(req.body)
    .then((newMenuItem) => res.status(201).json(newMenuItem))
    .catch((error) =>
      res.status(400).json({ message: "Error while creating new Menu Item." })
    );
});

//get menu items by restaurant id
router.get("/menu-items/restaurant/:id", (req, res) => {
    const restaurantId = req.params.id;
  
    Menu.find({restaurantId: restaurantId})
      .then((response) => res.json(response))
      .catch((error) =>
        res.status(400).json({ message: "Error while fetching Restaurant Menu Item." })
      );
  });

//get menu item by id
router.get("/menu-items/:id", (req, res) => {
  const menuItemId = req.params.id;

  Menu.findById(menuItemId)
    .then((response) => res.json(response))
    .catch((error) =>
      res.status(400).json({ message: "Error while fetching Menu Item." })
    );
});

//update menu item by id
router.put("/menu-items/:id", (req, res) => {
  const menuItemId = req.params.id;

  Menu.findByIdAndUpdate(menuItemId, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((error) =>
      res.status(400).json({ message: "Error while updating Menu Item." })
    );
});

//get menu item by id
router.delete("/menu-items/:id", (req, res) => {
  const menuItemId = req.params.id;

  Menu.findByIdAndDelete(menuItemId)
    .then((response) => res.json({ message: "Menu item deleted successfully" }))
    .catch((error) =>
      res.status(400).json({ message: "Error while fetching Menu Item." })
    );
});


  module.exports = router;