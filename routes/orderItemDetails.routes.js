const express = require("express");
const router = express.Router();
const OrderItemDetails = require("../models/OrderItemDetails.model");
const Order = require("../models/Cart.model");

//Create OrderItemDetails
router.post("/order-items-details", (req, res) => {
  OrderItemDetails.create(req.body)
    .then((newOrderItemDetails) => {
      Order.findByIdAndUpdate(
        newOrderItemDetails.orderId,
        {
          $push: { orderItemDetailsId: newOrderItemDetails._id },
        },
        { new: true }
      );
    })
    .then(() => {
      res.status(201).json({ message: "Order item details created successfully" });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "Error while creating new order item details" });
    });
});

//Get OrderItemDetails by id
router.get("/order-items-details/:id", (req, res) => {
  const orderItemDetailsId = req.params.id;
  OrderItemDetails.findById(orderItemDetailsId)
    .then((orderItemDetails) => res.json(orderItemDetails))
    .catch((error) =>
      res
        .status(400)
        .json({ message: "Error while getting the order item details" })
    );
});

//Get OrderItemDetails by cart id
router.get("/order-items-details/cart/:id", (req, res) => {
  const cartId = req.params.id;
  OrderItemDetails.find({orderId: cartId})
    .then((orderItemDetails) => res.json(orderItemDetails))
    .catch((error) =>
      res
        .status(400)
        .json({ message: "Error while getting the order item details by cart id" })
    );
});

//Update OrderItemDetails by id
router.patch("/order-items-details/:id", (req, res) => {
  const orderItemDetailsId = req.params.id;
  OrderItemDetails.findByIdAndUpdate(orderItemDetailsId, req.body, {
    new: true,
  })
    .then((newOrderItemDetails) => res.json(newOrderItemDetails))
    .catch((error) =>
      res
        .status(400)
        .json({ message: "Error while trying to update the oder item details" })
    );
});

//Delete Order Item Details by id
router.delete("/order-items-details/:id", (req, res) => {
  const orderItemDetailsId = req.params.id;
  OrderItemDetails.findByIdAndDelete(orderItemDetailsId)
    .then(
      res.json({ message: "Order Item Details has been deleted successfully" })
    )
    .catch((error) => {
      res
        .status(400)
        .json({ message: "Error while deleting the order item details" });
    });
});

module.exports = router;
