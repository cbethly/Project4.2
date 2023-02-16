const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router");

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", router);

// Handling Errors
app.use((err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
  next();
});

router.use(cookieParser()); // Moved after router is defined

app.listen(8080, () => console.log("Server is running on port 8080"));
