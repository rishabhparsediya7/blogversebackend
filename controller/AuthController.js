const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OtpModel = require("../models/otp");
const UserModel = require("../models/User");
const nodemailer = require("nodemailer");
const mailer = require("../middlewares/mailer");
const generateToken = async (uuid, email) => {
  const token = await jwt.sign(
    { uuid: uuid, email: email },
    process.env.JWT_SECRETKEY,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

const getMailOTP = async (req, res) => {
  const { email, fullname } = req.body;
  console.log(email, fullname);
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      const newUser = UserModel({
        email: email,
        fullname: fullname,
      });
      const response = await mailer.sendMail(email);
      console.warn(response);
      if (response.sent) {
        const savedUser = await newUser.save();
        const newOTP = OtpModel({
          email: email,
          otp: response.otp,
        });
        const savedOTP = await newOTP.save();
        res.status(200).json({
          message: "Sent OTP Sucessfully",
          email: email,
          userId: savedUser._id,
        });
      } else {
        res.status(403).json({ message: "Could not sent the OTP" });
      }
    } else {
      res.status(409).json({
        userExists: true,
        message: "Your mail is already registered with us! Please login!",
      });
    }
  } catch (e) {
    res.status(500).json({ message: "Failure", error: e.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  console.log(email, otp);
  try {
    const savedOtp = await OtpModel.findOne({ email: email });
    console.log(savedOtp);
    if (savedOtp.otp == otp) {
      const deletedOtp = await OtpModel.deleteOne({ email: email });
      if (deletedOtp.deletedCount == 1) {
        console.log("Deleted OTP with email:" + email);
      }
      res.status(200).json({
        message: "verification successful!",
        verified: true,
        email: email,
      });
    } else {
      res.status(403).json({ message: "You have entered the wrong OTP!" });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "verification failed!", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not registered" });
    }
    if (existingUser) {
      const validPassword = bcrypt.compare(password, existingUser.password);
      if (validPassword) {
        const access_token = await generateToken(existingUser._id, email);
        res.status(200).json({
          authenticated: true,
          access_token: access_token,
          uuid: existingUser._id,
          email: email,
          author_name: existingUser.fullname,
        });
      } else {
        res
          .status(403)
          .json({ authenticated: false, message: "Passwords didn't match" });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ authenticated: false, message: "It't not you, It' us" });
  }
};
module.exports = {
  getMailOTP,
  generateToken,
  verifyOTP,
  login,
};
