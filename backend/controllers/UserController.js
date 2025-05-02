const userModel = require("../models/User.js");
const fs = require("fs");
require("dotenv").config();
const path = require("path");
const bcrypt = require("bcrypt");
const generateJWT = require("../utils/generateJWT.js");

const uploadFolderPath = path.join(__dirname, "../uploads/usersImages");
if (!fs.existsSync(uploadFolderPath)) {
  fs.mkdirSync(uploadFolderPath);
}

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
    const { name, email, phone, password, avatar } = req.body;

    let profile_picture = null;
    if (avatar) {
      const base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
      const fileType = "webp";
      const fileName = `profile-${Date.now()}.${fileType}`;
      const filePath = path.join(uploadFolderPath, fileName);

      fs.writeFileSync(filePath, base64Data, { encoding: "base64" });
      profile_picture = path.join("uploads", fileName);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      profile_picture,
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
};
