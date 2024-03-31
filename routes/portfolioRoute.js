const express = require("express");
const router = express.Router();
const MessageController = require("../controller/MessageController");

router.post("/sendmail", MessageController.sendMail);

module.exports = router;
