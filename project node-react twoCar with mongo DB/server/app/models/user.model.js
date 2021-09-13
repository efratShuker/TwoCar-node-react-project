const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userFirstName: {
      type: String,
      required: [true, 'missing user name']
    },
    userLastName: {
      type: String,
      required: [true, 'missing user name']
    },
    userEmail: {
      type: String,
      required: [true, 'missing email address']
    },
    userPassword: {
      type: String,
      required: [true, 'missing password'],
    },
    userPhone: {
      type: String,
      required: [true, 'missing phone']
    },
  },
    { timestamps: true })
);

module.exports = User;
