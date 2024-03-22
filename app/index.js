const express = require("express");
const router = require("../config/routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(cors());

/** Install JSON request parser */
app.use(express.json());

/** Install Router */
app.use(router);

module.exports = app;
