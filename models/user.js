const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
  picture: {
    type: Object,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema, "user");
