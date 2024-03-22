const express = require("express");
const router = express.Router();
const commentController = require("../controller/CommentController");
const auth = require("../middlewares/checkToken");

router.get("/:blogid", auth, commentController.getComments);
router.post("/", auth, commentController.create);

module.exports = router;
