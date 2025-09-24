const express = require("express");
const router = express.Router();
const { Signup, Signin } = require("../controller/userController");

// Signup API for creating user
router.post("/signup", Signup);

// Signin API for validating user

router.post("/signin", Signin);

module.exports = router;
