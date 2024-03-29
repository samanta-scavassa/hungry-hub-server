const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  cartId: { type: Schema.Types.ObjectId, ref: "cart" },
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  message: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
