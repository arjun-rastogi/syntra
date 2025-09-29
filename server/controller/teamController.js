const connection = require("../connection");

exports.Teams = async (req, res, next) => {
  try {
    let query = "SELECT * FROM TEAM";
    connection.query(query, [], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to get the data." });
      }
      res.status(200).json({ message: "Data fetched successfully.", results });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to get the data." });
  }
};

exports.AddTeam = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    const query =
      "INSERT INTO TEAM (name, email, status, created) VALUES (?, ?, ?, ?)";
    connection.query(
      query,
      [name, email, "Active", new Date()],
      (err, results) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Unable to create team member." });
        }
        res.status(200).json({ message: "Team member created successfully." });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create team member." });
  }
};

exports.UpdateTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const query = "UPDATE TEAM SET name = ?, email = ? WHERE id = ?";
    connection.query(query, [name, email, id], (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Unable to update team member." });
      }
      res.status(200).json({ message: "Team member updated successfully." });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update team member." });
  }
};
