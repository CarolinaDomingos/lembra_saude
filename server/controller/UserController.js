const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
//call the constants file where there are all the default messages
const { MESSAGES } = require("../constantes/consts.js");

//Get all the users.
exports.getAllUsers = async (req, res) => {
  //if its not and admin or if isn't the correct user will throw an json error
  if (!req._user.userType === "admin") {
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
  if (!req._user.userType === "admin") {
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
  console.log(req);
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
  //code to update user
};

//delete user and all ifo related to that user
exports.delete = async (req, res) => {
  //if its not and admin or if isn't the correct user will throw an json error
  if (!req._user.isAdmin && req._user._id != req.params.userId) {
    return res.status(401).json({ message: MESSAGES.USERS.PERMISSION_DENIED });
  }

  //Get user id from client side
  const _id = req.params.userId;

  // try to find the user in the DB
  const data = await UserModel.find({ _id });
  // if data length is equal 0, that means user doesn't exist
  if (data.length === 0) {
    return res.status(404).json({ message: MESSAGES.USERS.NOT_FOUND });
  }

  //Find and delete the user from the DB if everything is ok will return a status code 200 and a json message.
  //otherwise will send json message with status code 400
  await UserModel.findOneAndDelete({ _id })
    .then(async () => {
      return res.status(200).json({ message: MESSAGES.USERS.DELETED_USER });
    })
    .catch((error) => {
      return res.status(400).json({ message: error });
    });
};
