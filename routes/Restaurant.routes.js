const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant.model");
const { validatePhoneNumber, validateEmail } = require("../utils/validations");

//getting all Restaurants Endpoint
router.get("/restaurants", async (req, res) => {
  try {
    const { rating, category } = req.query;
    let query = {};
    if (rating !== "null") query.rating = { $gte: rating };
    if (category !== "null") query.category = category;
    console.log(query);

    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

//get Restaurant by operating hours
router.get("/restaurants/operating-hours", async (req, res) => {
  try {
    console.log(req.query);
    const { day, openingHour, closingHour } = req.query;

    console.log(day, openingHour, closingHour);
    const restaurants = await Restaurant.find({
      $and: [
        { "operatingHours.days": { $in: [day] } },
        { "operatingHours.openingTime.hour": { $gte: openingHour } },
        { "operatingHours.closingTime.hour": { $lte: closingHour } },
      ],
    });

    console.log(restaurants);
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get Restaurant by id Endpoint
router.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurantId = req.params.id;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ message: "Error while getting the restaurant" });
  }
});

//get Restaurant by category Endpoint
router.get("/restaurants/category/:category", async (req, res) => {
  try {
    const category = req.params.category;

    const restaurants = await Restaurant.find({ category });

    if (!restaurants) {
      return res.status(404).json({ message: "Restaurants not found" });
    }
    res.json(restaurants);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error while getting the restaurants" });
  }
});

// Update Restaurant Endpoint
router.put("/restaurants/:id", async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const updates = req.body;

    updates.updatedOn = Date.now();
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updates,
      {
        new: true,
      }
    );

    res.json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ message: "Error while updating the restaurant" });
  }
});

//Get Restaurant by Review
router.get("/restaurants/:id/reviews", async (req, res) => {
  const restaurantId = req.params.id;
  console.log(restaurantId);
  await Restaurant.findById(restaurantId)
    .populate("reviewsId")
    .then((restaurant) => res.json(restaurant.reviewsId))
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .json({ message: "Error while retrieving the Restaurant's reviews" });
    });
});

//Create Restaurant Endpoint
router.post("/restaurants", async (req, res) => {
  try {
    const restaurantData = req.body;
    if (!validateEmail(restaurantData.email)) {
      console.log("email !!!!", restaurantData);
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }
    if (!validatePhoneNumber(restaurantData.phoneNumber)) {
      res.status(400).json({
        message: "Phone number must be a valid german phone number.",
      });
      return;
    }

    const newRestaurant = await Restaurant.create(restaurantData);
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error while creating a new Restaurant" });
  }
});

//Delete Restaurant Endpoint
router.delete("/restaurants/:id", async (req, res) => {
  try {
    const restaurantId = req.params.id;
    await Restaurant.findByIdAndDelete(restaurantId);
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error while deleting the Restaurant" });
  }
});

module.exports = router;
