const express = require("express");
const router = express.Router();
const { Teams } = require("../controller/teamController");

// Stats API
router.get("/", Teams);

module.exports = router;
