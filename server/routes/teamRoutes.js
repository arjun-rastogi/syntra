const express = require("express");
const router = express.Router();
const { Teams, AddTeam, UpdateTeam } = require("../controller/teamController");

router.get("/", Teams);
router.post("/", AddTeam);
router.patch("/:id", UpdateTeam);

module.exports = router;
