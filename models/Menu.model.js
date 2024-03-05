const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  ingredients: { type: String, default: true },
});

const MenuItem = mongoose.model("MenuItem", menuSchema);

module.exports = MenuItem;
