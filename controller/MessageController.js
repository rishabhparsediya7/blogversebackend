const mailer = require("../middlewares/mailer");

const sendMail = async (req, res) => {
  const { name, message } = req.body;

  try {
    const response = await mailer.sendMessageViaMailforPortFolio(name, message);
    if (response.sent) {
      res.status(200).json({ message: "Message Sent" });
    } else res.status(400).json({ message: "Can't send the message" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  sendMail,
};
