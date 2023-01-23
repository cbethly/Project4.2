const express = require("express");
const routes = require("./routes");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();

app.get('/register', (req, res) => {
  res.end('it works!');
});
app.get('/login', (req, res) => {
  res.end('it works!');
});
app.get('/getUser', (req, res) => {
  res.end('it works!');
});

app.get('/upload', (req, res) => {
  res.end('it works!');
});

app.use(express.json());
app.use(routes);
// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});


app.listen(3000, () => console.log("Server is running on port 3000"));
