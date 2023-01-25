const express = require("express");
const routes = require("./routes");
const multer = require("multer");
const bodyParser = require("body-parser");
const { getUser } = require("./controllers/getUserController");
// const fs = require ('fs');
const db = require("./dbConnection");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// serving static files
app.use("/uploads", express.static("uploads"));

//upload function

// const uploader = multer({
//   storage: multer.memoryStorage(),
// });

// //route to handle upload
// app.post("/upload", uploader.single("file"), async(req, res) => {
//   const file = req.file;

// fs.writeFileSync(__dirname + "/" + file.originalname, file.buffer)

// res.status(200).json({
//   status: "ok"
// })
// } );

app.get("/register", (req, res) => {
  res.end("it works!");
});

app.get("/login", (req, res) => {
  res.end("it works!");
});

app.get("/upload", (req, res) => {
  res.send("file upload rest api works!");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

// handle single file upload
app.post("/upload", upload.single("dataFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: "Please upload a file." });
  }
  const sql = "INSERT INTO `file`(`name`) VALUES ('" + req.file.filename + "')";
  const query = db.query(sql, function (err, result) {
    return res.send({ message: "File is successfully uploaded.", file });
  });
});

app.get("/getUser", async (req, res) => {
  const data = await getUser(req);

  if (data == null) {
    res.send("unknown user");
  }
  {
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
