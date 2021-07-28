//works with the token
const jwt = require("jsonwebtoken");
//call Database schema model
const UserModel = require("../models/UserModel");
//module to encrypt/decrypt passwords
const bcrypt = require("bcryptjs");
//module to use .env file
require("dotenv").config();
const email = require("../config/email/nodemailer");

const chars = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "A",
  "b",
  "B",
  "c",
  "C",
  "d",
  "D",
  "e",
  "E",
  "f",
  "F",
  "g",
  "G",
  "h",
  "H",
  "i",
  "I",
  "j",
  "J",
  "k",
  "K",
  "l",
  "L",
  "m",
  "M",
  "n",
  "N",
  "o",
  "O",
  "p",
  "P",
  "q",
  "Q",
  "r",
  "R",
  "s",
  "S",
  "t",
  "T",
  "u",
  "U",
  "v",
  "V",
  "w",
  "W",
  "x",
  "X",
  "y",
  "y",
  "z",
  "Z",
];

const handleEmail = (subject, emails, message) => {
  //sends email to user
  email.sendEmail(emails, subject, message);
  console.log("email sent");
};

//log in user by email
exports.signin = async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  })
    .select("password")
    .select("userType")
    .exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  let jwt_time = process.env.JWT_HOURS_DURATION;
  //Hash password
  await bcrypt.compare(req.body.password, user.password).then((result) => {
    if (result) {
      const token = jwt.sign(
        {
          userId: user._id,
          userType: user.userType,
        },
        process.env.JWT_KEY,
        {
          expiresIn: process.env.JWT_HOURS_DURATION + "h",
        }
      );

      user.password = undefined;
      return res.status(200).json({ token, user, jwt_time });
    }

    return res.status(400).json({ message: "Wrong email or password" });
  });
};

//register user
exports.signup = async (req, res) => {
  //try to find a user by email in the DB
  const findUser = await UserModel.findOne({
    email: req.body.email,
  });

  //check if findUser has some data (if the email inserted already exists in the database)
  if (findUser) {
    return res.status(409).json({ message: "email  exists!" });
  }

  //try to find a user by email in the DB
  const findniss = await UserModel.findOne({
    niss: req.body.niss,
  });
  //check if findUser has some data (if the email inserted already exists in the database)
  if (findniss) {
    return res.status(409).json({ message: "niss already exists!" });
  }

  //check if all fields contain information, if not sends a message to fufill all the fields.
  if (
    !req.body.email ||
    !req.body.name ||
    !req.body.password ||
    !req.body.niss
  ) {
    return res.status(400).json({ message: "Please fill all the fields!" });
  }

  //verifies if the user fill all the fields (trim is used to remove unecessary white spaces)
  if (
    !req.body.email.trim() ||
    !req.body.name.trim() ||
    !req.body.niss ||
    !req.body.password.trim()
  ) {
    return res.status(400).json({ message: "All fields required!" });
  }

  // create user Object to save in the database
  let user = await new UserModel({
    email: req.body.email,
    name: req.body.name,
    address: req.body.address,
    niss: req.body.niss,
    password: req.body.password,
    userType: req.body.userType,
  });
  //Save user in the Database
  if (user) {
    //sends email to user
    handleEmail(
      "Welcome to Lembra Saúde",
      req.body.email,
      `email: ${req.body.email} \npassword: ${req.body.password}`
    );

    //saving
    user.save((error, registeredUser) => {
      if (error) {
        console.log(error);
      } else {
        //create payload then generate an access token
        /*
          payload is utilized by programmers to differentiate 
          between the essential information in a chunk of data 
          and the information that is used to support it. 
        */
        let payload = { id: registeredUser._id, isAdmin: req.body.isAdmin };

        //json web token - Synchronous Sign with default (HMAC SHA256)
        jwt.sign(payload, process.env.JWT_KEY);
        return res.status(200).json({ message: "Registed!" });
      }
    });
  }
};

// reset users password
exports.resetPassword = async (req, res) => {
  //validations
  const findUser = await UserModel.findOne({
    email: req.body.email,
  });

  //check if findUser has some data (if the email inserted already exists in the database)
  if (!findUser) {
    return res.status(404).json({ message: "email not found" });
  }
  var newPassword = "";
  for (let i = 0; i < 6; i++) {
    newPassword += chars[Math.floor(Math.random() * chars.length) + 1];
  }
  const _id = findUser.id;
  let userParams;
  userParams = {
    email: findUser.email,
    name: findUser.name,
    address: findUser.address,
    niss: findUser.niss,
    password: newPassword,
    userType: findUser.userType,
  };
  bcrypt.hash(newPassword, 10).then(async (hash) => {
    await UserModel.updateOne({ _id }, { $set: { password: hash } });
  });

  await UserModel.updateOne({ _id }, { $set: userParams }).then(() => {
    //sends email to user
    handleEmail(
      "Your new password",
      req.body.email,
      `new password: ${newPassword}`
    );
    return res
      .status(200)
      .json({ message: "New password was sent to your email" });
  });
};
