const express = require("express");
const router = express.Router();
const { Stats } = require("../controller/dashController");

// Stats API
router.get("/", Stats);

module.exports = router;
