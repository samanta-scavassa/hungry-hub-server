const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");

//Create a new review

router.post("/reviews", async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: "Error while creating new Review" });
  }
});

//Update a review by id

router.put("/reviews/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;

    const uptadedReview = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
    });
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: "Error while updating the Review" });
  }
});

//Get a review by id

router.get("/reviews/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Error, review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: "Error while getting the review" });
  }
});

//Get reviews by restaurant

router.get("/reviews/restaurants/:id", async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const reviews = await Review.find({ restaurantId });
    res.json(reviews);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error while getting the restaurant reviews" });
  }
});

//Delete review by id

router.delete("/reviews/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;
    await Review.findByIdAndDelete(reviewId);
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error while deleting this review" });
  }
});

module.exports = router;
