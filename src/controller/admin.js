const Employees = require("../models/employee");
const Visitors = require("../models/visitor");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
// Emp Only

exports.getAllInfoEmp = async (req, res) => {
  try {
    const emp = await Employees.find({});

    res.status(200).json({
      msg: "success",
      data: emp,
    });
  } catch (e) {
    console.log("Error occured while fetching Employe info ", e);
    res.status(200).json({
      success:false,
      msg: "NOt fetched Data",
    });
  }
};

// Visitors Only
exports.getAllInfoVisi = async (req, res) => {
  try {
    const vis = await Visitors.find({});

    res.status(200).json({
      msg: "success",
      data: vis,
    });
  } catch (e) {
    console.log("Error occured while fetching Visitors info ", e);
    res.status(200).json({
      success:false,
      msg: "NOt fetched Data",
    });
  }
};

exports.updateVisi = async (req, res) => {
  try {
    const _id = req.params.id;
    let { type, users } = req.body;
    
    if(!mongoose.isValidObjectId(_id)){
      return res.status(500).json({
        success:false,
        msg:"Id is not Valid"
      })
    }
    let user = {};
    if (users === "Visitors") {
      user = await Visitors.findOne(new mongoose.Types.ObjectId(_id));
    } else if (users === "Employees") {
      user = await Employees.findOne(new mongoose.Types.ObjectId(_id));
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    if (user?.token == -1) {
      return res.status(404).json({
        success: false,
        msg: "Sorry You are Rejected by Admin",
      });
    }

    if (!_id) {
      return res.status(404).json({
        success: false,
        msg: "Id not Found",
      });
    }

    if (type === "app") {
      
      // Sending Token to user
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: "shoaibmomin488@gmail.com",
          pass: "rtcv uolm lbnf bhyk",
        },
      });

      const token = otpGenerator.generate(10, {
        upperCaseAlphabets: true,
        specialChars: true,
        lowerCaseAlphabets: true,
        digits: false,
      });
      const info = await transporter.sendMail({
        from: "Shoaib Momin",
        to: user.email,
        subject: "AutoCluster || Your Token is Here !!!",
        html: `<h1> This is Your Token ${user.fullName} : <span style="background-color: yellow;"> ${token} </span> </h1>`,
      });

      if (users === "Visitors") {

        response = await Visitors.findByIdAndUpdate(
          _id,
          {
            status: "Approved",
            token:token
          },
          { new: true }
        );
      } else if (users === "Employees") {
        response = await Employees.findByIdAndUpdate(
          _id,
          {
            status: "Approved",
            token:token
          },
          { new: true }
        );
      }

      //  Sending Success Msg
      res.status(200).json({
        success:true,
        msg: "successfully Approved",
        data: response,
      });
    } else {
      if (users === "Visitors") {
        response = await Visitors.findByIdAndUpdate(
          _id,
          {
            status: "Rejected",
            token:-1
          },
          { new: true }
        );
      } else if (users === "Employees") {
        response = await Employees.findByIdAndUpdate(
          _id,
          {
            status: "Rejected",
            token:-1
          },
          { new: true }
        );
      }

      res.status(200).json({
        success:true,
        msg: "successfully Rejected",
        data: response,
      });
    }
  } catch (e) {
    console.log("Error occured while updating Visitors-Employees info ", e);
    return res.status(500).json({
      success:false,
      msg:"Error occured while updating Visitors-Employees info",
      issue:e
    })
  }
};
