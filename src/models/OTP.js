const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const OTPSchema = new mongoose.Schema({
   
   email:{
        type:String,
        require:true,
    },
    otp:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        defualt: Date.now,
        expires:1*60
    }
});


//a function -> to send emails
OTPSchema.pre("save", async function () {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: "shoaibmomin488@gmail.com",
          pass:"rtcv uolm lbnf bhyk"
        },
      });
    
    //   const pass1 = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets:false });
    //   this.otp = pass1;
    
      const info = await transporter.sendMail({
        from: "Momin Shoaib",
        to: this.email,
        subject: "AutoCluster || Employee Only",
        html: `<h1> This is Your one time OTP : ${this.otp}</h1>`,
      });
    
      // console.log(info);
    });
    


module.exports = mongoose.model("OTP", OTPSchema);

