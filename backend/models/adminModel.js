const mongoose = require("mongoose");
const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a adminname"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    role: {
      type: String,
      default: "admin",
      enum: ["admin"],
      required: [, "Please add a role"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
