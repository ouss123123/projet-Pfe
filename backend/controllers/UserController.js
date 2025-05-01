const userModel = require("../models/User.js");
const fs = require("fs");
require("dotenv").config();
const path = require("path");
const bcrypt = require("bcrypt");
const multer = require("multer");
const generateJWT = require("../utils/generateJWT.js");

const uploadFolderPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadFolderPath)) {
  fs.mkdirSync(uploadFolderPath);
}

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolderPath);
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const name = file.originalname.split(".")[0];
    const newFileName = `${name}-${Date.now()}.${ext}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage: diskStorage });

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      message: "users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const matchedPassword = bcrypt.compare(password, user.password);
    if (!user || !matchedPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await generateJWT({ id: user._id, email: user.email });

    res.status(200).json({
      message: "Login successful",
      token,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "error ... " + error.message,
    });
  }
};

const SignUp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const avatar = req.file ? path.join("uploads", req.file.filename) : null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      profile_picture: avatar,
    });

    const token = await generateJWT({ id: newUser._id, email: newUser.email });
    newUser.token = token;

    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      token,
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

module.exports = {
  getUsers,
  SignUp,
  Login,
  getUserById,
  upload,
};
