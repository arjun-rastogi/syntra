// Connection for Database

const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "react-boilerplate",
});

connection.connect((err) => {
  if (err) console.error(err);
  console.log("Connected to the MYSQL Database");
});

module.exports = connection;
