const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

/**
 * @desc Registra un usuario en el backend con la informacion suministrada y la devuelve en un JSON
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("Ese correo ya ha sido registrado. Por favor use otro");
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
      profilePicture: user.profilePicture,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      personalTags: user.personalTags,
      diarySecurity: user.diarySecurity,
      diaryPassword: user.diaryPassword,
      token: generateToken(user.id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(400);
    throw new Error("El usuario no existe");
  }
});

/**
 * @desc busca al usuario con la informacion suministrada y la devuelve en un JSON
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      personalTags: user.personalTags,
      diarySecurity: user.diarySecurity,
      diaryPassword: user.diaryPassword,
      token: generateToken(user.id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(401);
    throw new Error("El correo o la contraseña son inválidos");
  }
});

/**
 * @desc busca al usuario con seguridad en su diario por el id y la devuelve en un JSON
 */
const securityUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.diarySecurity = true;
    user.diaryPassword = req.body.diaryPassword || user.diaryPassword;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: user.profilePicture,
      isPremium: user.isPremium,
      isAdmin: updatedUser.isAdmin,
      personalTags: updatedUser.personalTags,
      diarySecurity: updatedUser.diarySecurity,
      diaryPassword: updatedUser.diaryPassword,
      token: generateToken(updatedUser._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("El usuario no existe");
  }
});

/**
 * @desc busca al usuario sin seguridad en su diario por el id y la devuelve en un JSON
 */
const noSecurityUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.diarySecurity = false;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: user.profilePicture,
      isPremium: user.isPremium,
      isAdmin: updatedUser.isAdmin,
      personalTags: updatedUser.personalTags,
      diarySecurity: updatedUser.diarySecurity,
      diaryPassword: updatedUser.diaryPassword,
      token: generateToken(updatedUser._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("El usuario no existe");
  }
});
/**
 * @desc busca las estadisticas del usuario por el id y la devuelve en un JSON
 */
const personalStatsUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.personalTags = req.body.personalTags || user.personalTags;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: user.profilePicture,
      isAdmin: updatedUser.isAdmin,
      isPremium: user.isPremium,
      personalTags: updatedUser.personalTags,
      diarySecurity: updatedUser.diarySecurity,
      diaryPassword: updatedUser.diaryPassword,
      token: generateToken(updatedUser._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("El usuario no existe");
  }
});

/**
 * @desc edita la informacion del usuario buscado por el id y la devuelve en un JSON
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.profilePicture = req.body.profilePicture || user.profilePicture;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: user.profilePicture,
      isPremium: user.isPremium,
      isAdmin: updatedUser.isAdmin,
      personalTags: updatedUser.personalTags,
      diarySecurity: updatedUser.diarySecurity,
      diaryPassword: updatedUser.diaryPassword,
      token: generateToken(updatedUser._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("El usuario no existe");
  }
});

/**
 * @desc edita el rol del usuario buscado por el id y la devuelve en un JSON
 */
const changeUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isPremium = !user.isPremium;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: user.profilePicture,
      isPremium: user.isPremium,
      isAdmin: updatedUser.isAdmin,
      personalTags: updatedUser.personalTags,
      diarySecurity: updatedUser.diarySecurity,
      diaryPassword: updatedUser.diaryPassword,
      token: generateToken(updatedUser._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("El usuario no existe");
  }
});

/**
 * @desc Busca la lista de los usuarios no premium del backend y la devuelve en un JSON
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find(
    { isPremium: false },
    { email: 1, isPremium: 1 }
  );

  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("Ha ocurrido un error");
  }
});

module.exports = {
  registerUser,
  authUser,
  noSecurityUserProfile,
  securityUserProfile,
  personalStatsUserProfile,
  updateUserProfile,
  getAllUsers,
  changeUserStatus,
};
