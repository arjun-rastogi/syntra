const express = require("express");
const cors = require("cors");

const connection = require("./connection");
const authRoute = require("./routes/userRoutes");
const teamRoute = require("./routes/teamRoutes");
const leadRoute = require("./routes/leadRoutes");
const taskRoute = require("./routes/taskRoutes");
const dashboardRoute = require("./routes/dashboardRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routing for our user registration.
app.use("/api", authRoute);
app.use("/api/teams", teamRoute);
app.use("/api/leads", leadRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/dashboard", dashboardRoute);
module.exports = app;
