const express = require("express");
const router = express.Router();
const auth = require("../middlewares/checkToken");
const blogController = require("../controller/BlogController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/allblogs", auth, blogController.getAllBlog);

// to edit a blog we are fetching one so that we can set
// the data in UI.
router.put("/editBlog", auth, blogController.editBlog);

// get a blog by id
router.get("/getBlog/:blogId", auth, blogController.getBlogById);

// Write a blog
router.post("/create", auth, upload.single("image"), blogController.createBlog);

router.delete("/delete", auth, blogController.deleteBlog);

// Blogs related to the user that's why calling with user id.
router.get("/author/:author_id", auth, blogController.getBlogForUser);

module.exports = router;
