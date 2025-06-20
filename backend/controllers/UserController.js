const userModel = require("../models/User.js");
const fs = require("fs");
require("dotenv").config();
const path = require("path");
const bcrypt = require("bcrypt");
const twilio = require("twilio");
const crypto = require("crypto");
const generateJWT = require("../utils/generateJWT.js");
const asyncWrapper = require("../middlewares/asyncWrapper.js");
const dotenv = require("dotenv");
dotenv.config();

const uploadFolderPath = path.join(__dirname, "../uploads/usersImages");
if (!fs.existsSync(uploadFolderPath)) {
  fs.mkdirSync(uploadFolderPath);
}

const getUsers = asyncWrapper(async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = page >= 1 && (page - 1) * limit;
  const users = await userModel
    .find({}, { password: false, __v: false, token: false })
    .limit(limit)
    .skip(skip);
  res.status(200).json({
    message: "users fetched successfully",
    data: users,
    nextPage:
      users.length > 0 && page > 0
        ? `https://localhost:5000/users?limit=1&page=${
            page <= 1 ? 2 : parseInt(page) + 1
          }`
        : null,
    prevPage:
      users.length > 0 && page > 0
        ? `https://localhost:5000/users?limit=1&page=${
            page > 1 ? parseInt(page) - 1 : 1
          }`
        : null,
  });
});

const Login = asyncWrapper(async (req, res) => {
  const { email, password: plainPassword } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const matchedPassword = await bcrypt.compare(plainPassword, user.password);
  if (!matchedPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const { password, role, resetPasswordToken, ...safeUser } = user.toObject();

  const token = await generateJWT({ id: user._id, email: user.email });

  res.status(200).json({
    message: "Login successful",
    token,
    data: safeUser,
  });
});

const SignUp = asyncWrapper(async (req, res) => {
  const { name, email, phone, password, avatar } = req.body;

  let profile_picture = "../public/images/default.webp";
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
});

const getUserById = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    message: "User found successfully",
    data: user,
  });
});

const updateProfile = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const { avatar } = req.body;
  let profilePic = req.body.image;
  if (avatar) {
    const base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
    const fileType = "webp";
    const fileName = `profile-${Date.now()}.${fileType}`;
    const filePath = path.join(uploadFolderPath, fileName);

    fs.writeFileSync(filePath, base64Data, { encoding: "base64" });
    profilePic = path.join("uploads", fileName);
  }
  const update = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    profile_picture: profilePic,
  };
  const user = await userModel.findByIdAndUpdate(userId, update, {
    new: true,
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({
    message: "user updated successfully",
    data: user,
  });
});

const forgetPassword = asyncWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = new twilio(accountSid, authToken);
  const token = crypto.randomBytes(32).toString("hex");
  await userModel.findByIdAndUpdate(user._id, {
    resetPasswordToken: token,
  });
  const resetLink = `${process.env.RESET_LINK}${token}`;
  client.messages
    .create({
      body: resetLink,
      from: `whatsapp:${process.env.TWILIO_NUMBER}`,
      to: `whatsapp:+${user.phone}`,
    })
    .then(() =>
      res.status(200).json({
        message: "Message sent successfully",
      })
    )
    .catch(() => res.status(500).json("error !!"));
});

const resetPassword = asyncWrapper(async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await userModel.findOneAndUpdate(
    { resetPasswordToken: req.body.resetPasswordToken },
    {
      $set: {
        password: hashedPassword,
        resetPasswordToken: null,
      },
    }
  );
  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
  return res.status(200).json({
    message: "password updated successfully",
    data: user,
  });
});

module.exports = {
  getUsers,
  SignUp,
  Login,
  getUserById,
  updateProfile,
  forgetPassword,
  resetPassword,
};
