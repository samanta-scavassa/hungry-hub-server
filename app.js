require(`./db`);
const express = require("express");
require("dotenv").config();
const app = express();
require("./config")(app);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

require("./error-handling")(app);

module.exports = app;
