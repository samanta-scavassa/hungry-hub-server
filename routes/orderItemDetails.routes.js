const express = require("express");
const router = express.Router();
const OrderItemDetails = require("../models/OrderItemDetails.model");
const Cart = require("../models/Cart.model");
const MenuItem = require("../models/Menu.model");

//Create OrderItemDetails
router.post("/order-items-details", (req, res) => {
  let newOrderItemDetails;
  OrderItemDetails.create(req.body)
    .then(async (createdOrderItemDetails) => {
      newOrderItemDetails = createdOrderItemDetails;
      return Cart.findByIdAndUpdate(
        createdOrderItemDetails.orderId,
        {
          $push: {
            orderItemDetailsId: createdOrderItemDetails._id,
          },
        },
        { new: true }
      );
    })
    .then(async (updatedCart) => {
      await updateCartPrice(updatedCart._id);
      res.status(201).json(newOrderItemDetails);
    })
    .catch((error) => {
      console.log(error);
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
  OrderItemDetails.find({ orderId: cartId })
    .then((orderItemDetails) => res.json(orderItemDetails))
    .catch((error) =>
      res.status(400).json({
        message: "Error while getting the order item details by cart id",
      })
    );
});

//Update OrderItemDetails by id
router.patch("/order-items-details/:id", async (req, res) => {
  try {
    const orderItemDetailsId = req.params.id;
    const updatedOrderItemDetails = await OrderItemDetails.findByIdAndUpdate(
      orderItemDetailsId,
      req.body,
      {
        new: true,
      }
    );

    await updateCartPrice(updatedOrderItemDetails.orderId);

    res.json(updatedOrderItemDetails);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error while trying to update the oder item details",
    });
  }
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

const updateCartPrice = async (cartId) => {
  let cartPriceTotal = 0;
  const cartOrders = await OrderItemDetails.find({ orderId: cartId });

  const totalPricePromises = cartOrders.map(async (cartOrder) => {
    const menuItem = await MenuItem.findById(cartOrder.menuItemId);
    cartPriceTotal += menuItem.price * cartOrder.quantity;
  });

  await Promise.all(totalPricePromises);
  await Cart.findByIdAndUpdate(
    cartId,
    {
      totalPrice: cartPriceTotal,
    },
    { new: true }
  );
};

module.exports = router;
