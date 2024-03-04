const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  addressId: { type: Schema.Types.ObjectId, ref: "Address", required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  categoryId: { type: String, required: true },
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
        from: {
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
        to: {
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
