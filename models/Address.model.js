const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  label: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: Number, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  otherInformation: { type: String },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
