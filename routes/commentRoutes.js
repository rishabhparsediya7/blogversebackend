const express = require("express");
const router = express.Router();
const commentController = require("../controller/CommentController");

router.get("/:blogid", commentController.getComments);
router.post("/", commentController.create);

module.exports = router;
