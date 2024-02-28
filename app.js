require(`./db`);
const express = require("express");
require("dotenv").config();
const app = express();
require("./config")(app);
const addressRouter = require("./routes/address.routes");
const userRouter = require("./routes/user.routes");

app.use("/user-addresses", addressRouter);
app.use("/api", userRouter);

module.exports = app;
