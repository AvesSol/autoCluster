const OTP = require("../models/OTP");
const Employee = require("../models/employee");
const Visitors = require("../models/visitor");
const otpGenerator = require("otp-generator");
const Cookies = require("cookies");
const employee = require("../models/employee");

exports.sendOtp = async (req, res) => {
  try {
    if (req.body.id) {
      console.log("This is  Employee");

      const { fullName, id, contact, email, passFor, reason } = req.body;
      console.log(fullName, id, contact, email, passFor, reason);

      if (!fullName || !id || !contact || !email || !passFor || !reason) {
        return res.send("Please fill all the Detials");
      }

      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      const encodedValue = encodeURIComponent(passFor);
      const employee = {
        fullName: encodeURIComponent(fullName),
        id: encodeURIComponent(id),
        contact: encodeURIComponent(contact),
        email: encodeURIComponent(email),
        passFor: encodeURIComponent(passFor),
        reason: encodeURIComponent(reason),
      };

      const response = await OTP.create({
        email,
        otp,
      });
      var cookies = new Cookies(req, res);
      cookies.set("employee", JSON.stringify(employee));
      res.status(200).render("otp");
    } else {
      console.log("This is Visitor");

      const { fullName, contact, email, reason, meet } = req.body;

      if (!fullName || !contact || !email || !reason || !meet) {
        return res.send("Please fill all the Detials");
      }

      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      const visitor = {
        fullName: encodeURIComponent(fullName),
        contact: encodeURIComponent(contact),
        email: encodeURIComponent(email),
        reason: encodeURIComponent(reason),
        meet: encodeURIComponent(meet),
      };

      const response = await OTP.create({
        email,
        otp,
      });

      var cookies = new Cookies(req, res);
      cookies.set("visitor", JSON.stringify(visitor));
      res.status(200).render("otp");
    }
  } catch (e) {
    console.log("Error in Create ", e);
    res.status(200).json({
      success: false,
      msg: "OTP Not Sended ",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const { otp } = req.body;
    var cookies = new Cookies(req, res);

    let user = {};
    if (cookies.get("employee")) {
      console.log("Getting Employee cokkies");
      user = JSON.parse(cookies.get("employee"));
      user.isEmp = true;
    } else {
      console.log("Getting Visitors cokkies");
      user = JSON.parse(cookies.get("visitor"));
      user.isEmp = false;
    }

    if (!otp || !user) {
      return res.send("Please fill all the Detials");
    }

    const recentOtp = await OTP.findOne({ email: decodeURIComponent(user.email) })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentOtp === null || !recentOtp || recentOtp.length === 0) {
      return res.status(401).json({
        success: false,
        msg: "OTP is not Present",
      });
    } else if (otp !== recentOtp.otp) {
      //  invalid otp
      return res.status(401).json({
        success: false,
        msg: "Invalid OTP",
      });
    }

    if (otp === recentOtp.otp) {
      console.log("OTP is Matched");
      if (user.isEmp) {
        console.log("Inside thew empp");

        const response = await Employee.create({
          fullName: decodeURIComponent(user.fullName),
          id: decodeURIComponent(user.id),
          contact: decodeURIComponent(user.contact),
          email: decodeURIComponent(user.email),
          passFor: decodeURIComponent(user.passFor),
          reason: decodeURIComponent(user.reason),
        });
        return res
          .clearCookie("employee")
          .status(200)
          .redirect("http://localhost:4000/");
      } else {
        console.log("Inside thew Visss");
        const response = await Visitors.create({
          fullName: decodeURIComponent(user.fullName),
          contact: decodeURIComponent(user.contact),
          email: decodeURIComponent(user.email),
          reason: decodeURIComponent(user.reason),
          meet: decodeURIComponent(user.meet),
        });
        return res
          .clearCookie("visitor")
          .status(200)
          .redirect("http://localhost:4000/");
      }
    }
    res.status(200).redirect("index");
  } catch (error) {
    console.log("Error arrived while creating user", error);
    res.status(200).json({
      success: false,
      msg: "User Not Created ",
    });
  }
};
