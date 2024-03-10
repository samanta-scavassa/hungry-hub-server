require(`./db`);
const express = require("express");
require("dotenv").config();
const app = express();
require("./config")(app);
const addressRouter = require("./routes/address.routes");
const userRouter = require("./routes/user.routes");
const reviewRouter = require("./routes/review.routes");
const restaurantRouter = require("./routes/Restaurant.routes");
const menuRouter = require("./routes/menu.routes");
const cartRouter = require("./routes/cart.routes");
const notificationRouter = require("./routes/notification.routes");
const orderItemDetailsRouter = require("./routes/orderItemDetails.routes");
app.use("/api", reviewRouter);
app.use("/api", addressRouter);
app.use("/api", userRouter);
app.use("/api", restaurantRouter);
app.use("/api", menuRouter);
app.use("/api", cartRouter);
app.use("/api", notificationRouter);
app.use("/api", orderItemDetailsRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

require("./error-handling")(app);

module.exports = app;
