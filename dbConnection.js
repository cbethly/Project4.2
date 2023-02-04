const mysql2 = require("mysql2");

const con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Bc@9996.",
  database: "Student",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});
module.exports = con;
