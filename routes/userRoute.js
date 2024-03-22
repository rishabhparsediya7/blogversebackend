const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const auth = require("../middlewares/checkToken");
const router = express.Router();
const userController = require("../controller/UserController");
const authController = require("../controller/AuthController");

router.get("/:uuid", auth, userController.findUserById);
router.post("/create", userController.createUser);
router.post("/mail-otp", authController.getMailOTP);
router.post("/login", authController.login);
router.post("/verify-otp", authController.verifyOTP);
router.put("/update", auth, upload.single("image"), userController.updateUser);

module.exports = router;
