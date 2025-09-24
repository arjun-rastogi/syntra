const connection = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Tasks = async (req, res, next) => {
  try {
    let query = "SELECT * FROM Tasks";
    connection.query(query, [], async (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to get the data." });
      } else if (results.length === 0) {
        res.status(404).json({ message: "No Data found." });
      } else {
        res
          .status(200)
          .json({ message: "Data fetched successfully. ", results });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to get the data." });
  }
};

exports.Status = async (req, res, next) => {
  try {
    const { assigned_id, assigned_to, status } = req.body;
    const { id } = req.params;

    let query =
      "UPDATE Tasks SET assigned_id = ?, assigned_to = ?, status = ? WHERE id = ?";
    connection.query(
      query,
      [assigned_id, assigned_to, status, id],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Unable to update the data." });
        } else {
          res.status(200).json({ message: "Data updated successfully." });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update the data." });
  }
};

exports.AddTask = async (req, res, next) => {
  try {
    const { name, assigned_id, assigned_to, status } = req.body; // Assuming you're extracting the values from the request body

    let query =
      "INSERT INTO Tasks (name, assigned_id, assigned_to, status, created) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      query,
      [name, null, null, "New", new Date()],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Unable to create task." });
        } else {
          res.status(200).json({ message: "Task created." });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create task." });
  }
};
