const Blogs = require("../models/Blog");
const { ObjectId } = require("mongodb");
const HttpError = require("../middlewares/httperror");
const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ error: "Internal Server Error" });
  }
};

const editBlog = async (req, res) => {
  const blogId = req.body._id;
  console.log("******************************************");
  const updatedData = {
    title: req.body.title,
    description: req.body.description,
  };
  try {
    const objectId = new ObjectId(blogId);
    const blog = await Blogs.updateOne(
      { _id: objectId },
      { $set: updatedData }
    );
    if (blog.modifiedCount == 1) {
      res.status(200).json({ message: "Blog Updated", data: blog });
    } else {
      res.status(404).json({ message: "Couldn't update blog", data: blog });
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: e.message });
  }
};

const getBlogById = async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const objectId = new ObjectId(blogId);
    const blog = await Blogs.findOne({ _id: objectId });
    if (blog) {
      res.status(200).json({ message: "Blog found", blog: blog });
    } else {
      res.status(404).json({ message: "Blog not found", data: blog });
    }
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: e.message });
  }
};

const getBlogForUser = async (req, res) => {
  const author_id = req.params.author_id;
  try {
    const blogs = await Blogs.find({ author_id: author_id });
    res.status(200).json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const createBlog = async (req, res) => {
  const { title, author_id, author_name, description } = req.body;
  try {
    const blog = new Blogs({
      title: title,
      description: description,
      author_id: author_id,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      author_name: author_name,
    });
    const savedBlog = await blog.save();
    res.status(201).json({ blog: savedBlog });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const deleteBlog = async (req, res) => {
  const documentId = req.body.blogId;
  try {
    const objectId = new ObjectId(documentId);
    const result = await Blogs.deleteOne({ _id: objectId });
    if (result.deletedCount === 1) {
      console.log("Document deleted successfully");
      res.status(200).json({ message: "Document deleted successfully" });
    } else {
      res.status(404).json({ message: "No document found with specified ID" });
    }
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: e.message });
  }
};
module.exports = {
  getAllBlog,
  editBlog,
  getBlogById,
  getBlogForUser,
  createBlog,
  deleteBlog,
};
