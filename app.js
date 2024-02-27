require(`./db`);
const express = require("express");
require('dotenv').config()
const app = express();
require("./config")(app);

module.exports = app;
