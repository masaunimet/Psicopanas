const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      personalTags: user.personalTags,
      diarySecurity: user.diarySecurity,
      diaryPassword: user.diaryPassword,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      personalTags: user.personalTags,
      diarySecurity: user.diarySecurity,
      diaryPassword: user.diaryPassword,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const securityUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.personalTags = req.body.personalTags || user.personalTags;
    user.diarySecurity = true;
    user.diaryPassword = req.body.diaryPassword || user.diaryPassword;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isPremium: user.isPremium,
      isAdmin: updatedUser.isAdmin,
      personalTags: updatedUser.personalTags,
      diarySecurity: updatedUser.diarySecurity,
      diaryPassword: updatedUser.diaryPassword,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const noSecurityUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.personalTags = req.body.personalTags || user.personalTags;
    user.diarySecurity = false;
    user.diaryPassword = req.body.diaryPassword || user.diaryPassword;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isPremium: user.isPremium,
      isAdmin: updatedUser.isAdmin,
      personalTags: updatedUser.personalTags,
      diarySecurity: updatedUser.diarySecurity,
      diaryPassword: updatedUser.diaryPassword,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const personalStatsUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.personalTags = req.body.personalTags || user.personalTags;
    user.diarySecurity = req.body.diarySecurity || user.diarySecurity;
    user.diaryPassword = req.body.diaryPassword || user.diaryPassword;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isPremium: user.isPremium,
      isAdmin: updatedUser.isAdmin,
      personalTags: updatedUser.personalTags,
      diarySecurity: updatedUser.diarySecurity,
      diaryPassword: updatedUser.diaryPassword,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = {
  registerUser,
  authUser,
  noSecurityUserProfile,
  securityUserProfile,
  personalStatsUserProfile,
};
