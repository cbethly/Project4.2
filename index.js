const express = require("express");
const routes = require("./routes");
const multer = require("multer");
const bodyParser = require("body-parser");
const { getUser } = require("./controllers/getUserController");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage }).single("userPhoto");

app.post("upload-avatar", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

app.get("/register", (req, res) => {
  res.end("it works!");
});

app.get("/login", (req, res) => {
  res.end("it works!");
});

app.get("/getUser", async (req, res) => {
  const data = await getUser(req);

  if (data == null) {
    res.send("unknown user")
  } { 
    res.send(JSON.stringify(data));
  }
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
