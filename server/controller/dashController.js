const connection = require("../connection");

exports.Stats = async (req, res, next) => {
  try {
    let query =
      "select count(*) as total_leads, SUM(CASE WHEN status = 'New' Then 1 Else 0 End) as new_leads, SUM(CASE WHEN status = 'In Progress' Then 1 Else 0 End) as in_progress, SUM(CASE WHEN status = 'Closed' Then 1 Else 0 End) as closed_leads, (Select count(*) from tasks) as total_tasks from leads;";
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
