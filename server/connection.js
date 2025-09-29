// Connection for Database

const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "mysql.railway.internal",
  user: "root",
  password: "gMGThBNYUBHWVMGFaTFWxVIEQLQcWbck",
  database: "railway",
});

connection.connect((err) => {
  if (err) console.error(err);
  console.log("Connected to the MYSQL Database");
});

module.exports = connection;
