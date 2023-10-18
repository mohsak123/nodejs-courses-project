const mongoose = require("mongoose");

const validator = require("validator");
const userRole = require("../utils/user-roles");

const userSchema = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "filed must be a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String, // ["USER", "ADMIN", "MANAGER"]
    enum: [userRole.USER, userRole.ADMIN, userRole.MANAGER],
    default: userRole.USER,
  },
  avatar: {
    type: String,
    default: "uploads/profile.png",
  },
};

module.exports = mongoose.model("User", userSchema);
