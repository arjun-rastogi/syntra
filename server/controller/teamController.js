const connection = require("../connection");

exports.Teams = async (req, res, next) => {
  try {
    let query = "SELECT * FROM TEAM";
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
