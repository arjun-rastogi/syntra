const connection = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Leads = async (req, res, next) => {
  try {
    let query = "SELECT * FROM LEADS";
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

// Update Lead Status
exports.Status = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    let query = "UPDATE LEADS SET status = ? WHERE id = ?";
    connection.query(query, [status, id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to update the data." });
      } else {
        res.status(200).json({ message: "Data updated successfully." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update the data." });
  }
};

exports.AddLeads = async (req, res, next) => {
  try {
    const { name, email } = req.body; // Assuming you're extracting the values from the request body

    let query =
      "INSERT INTO Leads (name, email, status, created) VALUES (?, ?, ?, ?)";
    connection.query(
      query,
      [name, email, "New", new Date()],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Unable to create lead." });
        } else {
          res.status(200).json({ message: "Lead created." });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create lead." });
  }
};
