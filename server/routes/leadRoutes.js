const express = require("express");
const router = express.Router();
const { Leads, Status } = require("../controller/leadController");

// Stats API
router.get("/", Leads);
router.patch("/lead-status-update/:id", Status);

module.exports = router;
