const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
var cors = require("cors");

const bodyParser = require("body-parser");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//initializing the paths for routes
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/project", require("./routes/projectRoute"));
app.use("/api/userprofile", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
