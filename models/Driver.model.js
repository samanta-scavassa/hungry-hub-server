const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String },
  availabilityStatus: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  email: { type: String, required: true, unique: true },
  createdOn: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
