const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref:"user",  required: true},
  availabilityStatus: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  }
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
