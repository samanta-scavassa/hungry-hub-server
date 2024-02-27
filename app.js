require(`./src/db/`);
const express = require("express");
require("dotenv/config");
const app = express();
require("./src/config")(app);

module.exports = app;
