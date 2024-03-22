const nodemailer = require("nodemailer");

const generateOTP = () => {
  let otp = "";
  for (var i = 0; i < 4; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

const sendMail = async (email) => {
  const otp = generateOTP();
  console.log(otp);
  const transporter = await nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.TRANSPORT_EMAIL,
      pass: process.env.TRANSPORT_PASSWORD,
    },
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "OTP Verification for BlogVerse",
    text: `Your OTP is: ${otp}`,
  };
  const info = await transporter.sendMail(mailOptions);
  if (!info) {
    return { message: "failure", sent: false };
  }
  return {
    email: email,
    response: info,
    message: "Sent Successfully",
    sent: true,
    otp: otp,
  };
};

module.exports = {
  sendMail,
  generateOTP,
};