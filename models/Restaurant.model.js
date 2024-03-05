const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  addressId: { type: Schema.Types.ObjectId, ref: "Address", required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  longitude: { type: Number },
  latitude: { type: Number },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
  operatingHours: {
        days: {
          type: [String],
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
        openingTime: { hour: {type: Number, required: true}, minute:{type: Number, default: 0}},
        closingTime:  { hour: {type: Number, required: true}, minute:{type: Number, default: 0}},
  },
  rating: {type:Number, max:5, default: 0},
  reviewsId: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  isActive: { type: Boolean, default: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
