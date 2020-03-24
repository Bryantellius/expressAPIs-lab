const express = require("express");
const chirperRouter = require("./chirps");

let router = express.Router();

router.use("/chirps", chirperRouter);

module.exports = router;