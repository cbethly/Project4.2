const AdminJS = require("adminjs");
const express = require("express");
const mongoose = require("mongoose");
const AdminJSMongoose = require("@adminjs/mongoose");
const app = express();

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Register Mongoose adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Define resources
const User = mongoose.model("User", { name: String, email: String });

// Build and configure the admin panel
const admin = new AdminJS({
  resources: [User],
});

// Set up the admin panel routes
const router = admin.router;
app.use(admin.options.rootPath, router);

// Start the server
app.listen(8000, () => console.log("Server started on port 8000"));
