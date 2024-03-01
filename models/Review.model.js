const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, minLength: 3, maxLength: 250 },
  createdOn: { type: Date, required: true, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
