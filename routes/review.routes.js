const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");
const Restaurant = require("../models/Restaurant.model");

//Create a new review
router.post("/reviews", async (req, res) => {
  try {
    await Review.create(req.body).then(async (newReview) => {
      const restaurantId = newReview.restaurantId;
      await Restaurant.findByIdAndUpdate(
        restaurantId,
        {
          $push: { reviewId: newReview._id },
        },
        { new: true }
      )
        .then(async (updatedRestaurant) => await updateRating(restaurantId))
        .then(() => res.status(201).json(newReview));
    });
  } catch (error) {
    res.status(400).json({ message: "Error while creating new Review" });
  }
});

//Update a review by id

router.put("/reviews/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;

    const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
    });
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Error while updating the Review" });
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

router.get("/reviews/restaurant/:id", async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const reviews = await Review.find({ ObjectId: restaurantId });
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

const updateRating = async (restaurantId) => {
  await Restaurant.findById(restaurantId)
    .populate("reviewsId")
    .then((restaurant) => {
      const reviews = restaurant.reviewsId;
      let ratingSum = 0;
      const restaurantRating = 0;
      if (reviews.length) {
        reviews.forEach((review) => {
          ratingSum += review.rating;
        });
        ratingSum / reviews.length;
      }
      return restaurantRating;
    })
    .then(async (restaurantRating) => {
      console.log(restaurantRating);
      updatedRestaurant = await Restaurant.findByIdAndUpdate(
        restaurantId,
        { rating: restaurantRating },
        { new: true }
      );
      console.log(updatedRestaurant);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .json({ message: "Error while updating the Restaurant's reviews" });
    });
};
module.exports = router;
