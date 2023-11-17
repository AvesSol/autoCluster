const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const EmployeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  id: {
    type: Number,
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
  passFor: {
    type: String,
    require: true,
    charset: 'UTF8'
  },
  reason: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["Approved", "Rejected", "Waiting"],
    default: "Waiting",
    require: true,
  },
  token: {
    type: String,
  },
  otp: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Employees", EmployeeSchema);
