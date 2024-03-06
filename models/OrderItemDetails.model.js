const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItemDetailsSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: "order", required: true },
  menuItemId: { type: Schema.Types.ObjectId, ref: "menuItem", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderItemDetails = mongoose.model(
  "OrderItemDetails",
  orderItemDetailsSchema
);
module.exports = OrderItemDetails;
