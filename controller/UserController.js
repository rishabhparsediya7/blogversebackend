const User = require("../models/User");
const bcrypt = require("bcryptjs");
const userController = require("./AuthController");

const findUserById = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ _id: uuid });
    if (user) res.status(200).json(user);
    else res.status(400).json({ message: "user not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  const { uuid, email, password } = req.body;
  const user = await User.findOne({ _id: uuid });
  if (user) {
    try {
      let hashedPassword = await bcrypt.hash(password, 12);
      const filter = { _id: uuid, email: email };
      const update = { $set: { password: hashedPassword } };
      const saveduser = await User.updateOne(filter, update);
      const accessToken = await userController.generateToken(
        saveduser._id,
        saveduser.email
      );
      res.status(200).json({
        success: true,
        uuid: uuid,
        email: email,
        author_name: saveduser.fullname,
        access_token: accessToken,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else res.status(400).json({ message: "Could not update the password" });
};

const updateUser = async (req, res) => {
  const userId = req.body.uuid;
  const updateFields = req.body;
  const imageFile = req.file;
  try {
    if (imageFile) {
      updateFields.image = {};
      updateFields.image.data = req.file.buffer;
      updateFields.image.contentType = req.file.mimetype;
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  findUserById,
  createUser,
  updateUser,
};
