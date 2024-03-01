require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = express.Router();
const { isAuthenticated } = require("../middlewares/jwt.middleware");
const { validatePassword, validatePhoneNumber, validateEmail } = require("../utils/validations");
const saltRounds = 10;

router.post("/signup", (req, res, next) => {
  const { email, password, fullName, phoneNumber, dateOfBirth } = req.body;

  if (
    email === "" ||
    password === "" ||
    fullName === "" ||
    phoneNumber === "" ||
    dateOfBirth === ""
  ) {
    res.status(400).json({
      message: "Provide email, password, name, phone number and date of birth.",
    });
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }
  if (!validatePhoneNumber(phoneNumber)) {
    res.status(400).json({
      message: "Phone number must be a valid german phone number."
    });
    return;
  }

  if (!validatePassword(password)) {
    res.status(400).json({
      message: "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const customerRoleId = "65de3d32f96753f2845107c5";
      return User.create({
        fullName,
        email,
        phoneNumber,
        dateOfBirth,
        password: hashedPassword,
        roleId: customerRoleId,
      });
    })
    .then((createdUser) => {
      const { email, fullName, phoneNumber, dateOfBirth, _id } = createdUser;

      const user = { email, fullName, phoneNumber, dateOfBirth, _id };

      res.status(201).json({ user: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email, fullName, phoneNumber, dateOfBirth } = foundUser;

        const payload = { _id, email, fullName, phoneNumber, dateOfBirth };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log("req.payload", req.payload);
  res.status(200).json(req.payload);
});

module.exports = router;
