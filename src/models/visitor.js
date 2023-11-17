const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const visitorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  contact: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  reason: {
    type: String,
    require: true,
  },
  meet: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["Approved", "Rejected", "Waiting"],
    default: "Waiting",
    require: true,
  },
  otp: {
    type: Number,
    require: true,
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model("Visitors", visitorSchema);
