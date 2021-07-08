const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
//call the constants file where there are all the default messages
const { MESSAGES } = require("../constantes/consts.js");

//Get all the users.
exports.getAllUsers = async (req, res) => {
  //if its not and admin or if isn't the correct user will throw an json error
  if (req._user.userType !== "admin") {
    return res.status(401).json({ message: "You don't have permition" });
  }
  try {
    // try to find the user
    const user = await UserModel.find({ userType: "client" })
      .select("name")
      .select("email");
    //if user doesn't exist throw an json error
    if (!user) {
      return res.status(404).json({ message: MESSAGES.USERS.NOT_FOUND });
    }
    //if everything's okg send user info in json format.
    return res.status(200).json({ user });
  } catch (e) {
    throw e; // if can't connect will throw an error
  }
};

//Get the user when that login.
exports.getAllProfessionals = async (req, res) => {
  //if its not and admin or if isn't the correct user will throw an json error
  if (req._user.userType !== "admin") {
    return res.status(401).json({ message: "You don't have permition" });
  }
  try {
    // try to find the user
    const user = await UserModel.find({ userType: "professional" })
      .select("name")
      .select("email");
    //if user doesn't exist throw an json error
    if (!user) {
      return res.status(404).json({ message: MESSAGES.USERS.NOT_FOUND });
    }
    //if everything's okg send user info in json format.
    return res.status(200).json({ user });
  } catch (e) {
    throw e; // if can't connect will throw an error
  }
};

//Get the user when that login.
exports.get = async (req, res) => {
  //if its not and admin or if isn't the correct user will throw an json error
  if (!req._user.userType === "admin" && req._user._id != req.params.userId) {
    return res.status(401).json({ message: "You don't have permition" });
  }
  try {
    // try to find the user
    const user = await UserModel.findOne({
      _id: req.params.userId,
    });
    //if user doesn't exist throw an json error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //if everything's okg send user info in json format.
    return res.status(200).json({ user });
  } catch (e) {
    throw e; // if can't connect will throw an error
  }
};

//update user's personal info
exports.update = async (req, res) => {
  console.log(req.params.userId, req._user._id);
  if (req._user.userType != "admin" && req._user._id != req.params.userId) {
    return res.status(401).json({ message: "Não tem permissão de acesso" });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Não inseriu dados. Porfavor preencha os campos em falta",
    });
  }

  var regex = /^[a-zA-Z/ /]+$/;
  const result = regex.test(req.body.name.trim());
  if (!result) {
    return res.status(400).json({ message: "O nome só deve conter letras" });
  }

  //code to update user
  const _id = req.params.userId;
  let Params;
  if (req.body.password) {
    Params = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      userType: req.body.userType,
    };
  } else {
    Params = {
      email: req.body.email,
      name: req.body.name,
      userType: req.body.userType,
    };
  }

  if (req.body.password) {
    bcrypt.hash(req.body.password, 10).then(async (hash) => {
      await UserModel.updateOne({ _id }, { $set: { password: hash } });
    });
  }

  const response = await UserModel.updateOne({ _id }, { $set: Params });
  console.log(response);
  if (result) {
    return res.status(200).json({ message: "Atualizado!" });
  }
};

//delete user and all ifo related to that user
exports.delete = async (req, res) => {
  //if its not and admin or if isn't the correct user will throw an json error
  if (req._user.userType !== "admin" && req._user._id != req.params.userId) {
    return res.status(401).json({ message: "You don't have permition" });
  }

  //Get user id from client side
  const _id = req.params.userId;

  // try to find the user in the DB
  const data = await UserModel.find({ _id });
  // if data length is equal 0, that means user doesn't exist
  if (data.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  //Find and delete the user from the DB if everything is ok will return a status code 200 and a json message.
  //otherwise will send json message with status code 400
  await UserModel.findOneAndDelete({ _id })
    .then(async () => {
      return res.status(200).json({ message: "User was deleted!" });
    })
    .catch((error) => {
      return res.status(400).json({ message: error });
    });
};
