const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart.model");

//Get cart by id
router.get("/carts/:id", (req, res) => {
  const cartId = req.params.id;
  Cart.findById(cartId)
    .then((cart) => res.json(cart))
    .catch((error) =>
      res.status(400).json({ message: "Error while getting the cart" })
    );
});

//Get cart by user
router.get("/carts/users/:userId", (req, res) => {
  const userId = req.params.userId;
  Cart.find({ userId: userId })
    .then((carts) => res.json(carts))
    .catch((error) =>
      res.status(400).json({ message: "Error while getting the user carts" })
    );
});

//Create cart Endpoint
router.post("/carts", (req, res) => {
  Cart.create(req.body)
    .then((cart) => res.status(201).json(cart))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: "Error while creating the cart" });
    });
});

//Get cart by Restaurant
router.get("/carts/restaurants/:restaurantId", (req, res) => {
  const restaurantId = req.params.restaurantId;
  Cart.find({ restaurantId: restaurantId })
    .then((carts) => res.json(carts))
    .catch((error) =>
      res
        .status(400)
        .json({ message: "Error while getting the restaurant carts" })
    );
});

module.exports = router;
