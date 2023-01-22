const mysql2 = require("mysql2");

// Database connection

const con = mysql2.createConnection({
  host: "localhost",
  user: "root", // my username
  password: "Bc@9996.", // my password
  database: "Student",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});
module.exports = con;
