require(`./db`);
const express = require("express");
require("dotenv").config();
const app = express();
require("./config")(app);
const addressRouter = require("./routes/address.routes");
const userRouter = require("./routes/user.routes");
const reviewRouter = require("./routes/review.routes");

app.use("/api", addressRouter);
app.use("/api", userRouter);
app.use("/api", reviewRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

require("./error-handling")(app);

module.exports = app;
