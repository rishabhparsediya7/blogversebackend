const CommentModel = require("../models/Comment");

const create = async (req, res) => {
  const { email, comment, blogId, blogTitle, userId } = req.body;

  try {
    const newComment = CommentModel({
      email: email,
      comment: comment,
      blogId: blogId,
      blogTitle: blogTitle,
      userId: userId,
    });

    const savedComment = await newComment.save();
    if (savedComment) {
      res.status(200).json({ success: true, commentId: savedComment._id });
    } else {
      res
        .status(401)
        .json({ success: false, message: "could not post the comment" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "It's not you. It's us!" });
  }
};

const getComments = async (req, res) => {
  const blogId = req.params.blogid;
  try {
    const comments = await CommentModel.find({ blogId: blogId });

    if (comments) {
      res.status(200).json({ comments: comments });
    } else {
      res.status(404).json({ message: "Could not find the comments" });
    }
  } catch (error) {
    res.status(500).json({ ...comments });
  }
};
module.exports = {
  create,
  getComments,
};
