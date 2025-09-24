const express = require("express");
const router = express.Router();
const { Tasks, Status } = require("../controller/taskController");

// Stats API
router.get("/", Tasks);
router.patch("/task-status-update/:id", Status);

module.exports = router;
