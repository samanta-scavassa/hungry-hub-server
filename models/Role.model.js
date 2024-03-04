const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    streetNumber: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  email: { type: String },
  phoneNumber: { type: String },
  category: { type: String },
  description: { type: String },
  image: { type: String },
  longitude: { type: Number },
  latitude: { type: Number },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
  operatingHours: {
    type: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
        openingTime: { type: String },
        closingTime: { type: String },
      },
    ],
  },
  reviewsId: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  isActive: { type: Boolean, default: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
