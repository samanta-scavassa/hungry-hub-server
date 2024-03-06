const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  restaurantId: { type: Schema.Types.ObjectId, ref: "restaurant" },
  orderItemDetailsId: { type: Schema.Types.ObjectId, ref: "orderItemDetails" },
  driverId: { type: Schema.Types.ObjectId, ref: "driver" },
  createdOn: { type: Date, default: Date.now },
  notificationIds: { type: [Schema.Types.ObjectId], ref: "notification" },
  totalPrice: { type: Number, required: true },
  updatedOn: { type: Date, default: Date.now },
  orderStatus: {
    type: String,
    enum: [
      "created",
      "accepted",
      "ready",
      "cancelled",
      "on delivery",
      "delivered",
    ],
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
