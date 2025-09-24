const express = require("express");
const router = express.Router();
const { Tasks, Status, AddTask } = require("../controller/taskController");

// Stats API
router.get("/", Tasks);
router.post("/", AddTask);
router.patch("/task-status-update/:id", Status);

module.exports = router;
