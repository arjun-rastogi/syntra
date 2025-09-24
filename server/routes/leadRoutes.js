const express = require("express");
const router = express.Router();
const { Leads, Status, AddLeads } = require("../controller/leadController");

// Stats API
router.get("/", Leads);
router.post("/", AddLeads);
router.patch("/lead-status-update/:id", Status);

module.exports = router;
