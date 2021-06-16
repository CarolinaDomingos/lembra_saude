//works with the token
const jwt = require("jsonwebtoken");
//call Database schema model
const UserModel = require("../models/UserModel");
//module to encrypt/decrypt passwords
const bcrypt = require("bcryptjs");
//module to use .env file
require("dotenv").config();

const email = require("../config/email/nodemailer");

//log in user by email
exports.signin = async (req, res) => {
  const user = await UserModel.findOne({
    username: req.body.email,
  })
    .select("password")
    .exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  //Hash password
  await bcrypt.compare(req.body.password, user.password).then((result) => {
    if (result) {
      const token = jwt.sign(
        {
          userId: user._id,
          admin: user.isAdmin,
        },
        process.env.JWT_KEY,
        {
          expiresIn: process.env.JWT_HOURS_DURATION + "h",
        }
      );

      user.password = undefined;
      return res.status(200).json({ token, user });
    }

    return res.status(400).json({ message: "Wrong email or password" });
  });
};

// log out user
exports.signout = async (req, res) => {
  //code to signout
  //to create a signout it is necessary to destroy the token, or send it to blacklist.
};

//register user
exports.signup = async (req, res) => {
  console.log(req.body);
  //try to find a user by email in the DB
  const findUser = await UserModel.findOne({
    email: req.body.email,
    nif: req.body.nif,
  });

  //check if findUser has some data (if the email inserted already exists in the database)
  if (findUser) {
    return res.status(409).json({ message: "email or nif already exists!" });
  }

  //check if all fields contain information, if not sends a message to fufill all the fields.
  if (
    !req.body.email ||
    !req.body.name ||
    !req.body.password ||
    !req.body.nif ||
    !req.body.address
  ) {
    return res.status(400).json({ message: "Please fill all the fields!" });
  }

  //verifies if the user fill all the fields (trim is used to remove unecessary white spaces)
  if (
    !req.body.email.trim() ||
    !req.body.name.trim() ||
    !req.body.password.trim() ||
    !req.body.address.trim()
  ) {
    return res.status(400).json({ message: "All fields required!" });
  }

  // create user Object to save in the database
  let user = await new UserModel({
    email: req.body.email,
    name: req.body.name,
    address: req.body.address,
    nif: req.body.nif,
    password: req.body.password,
    isAdmin: false,
  });

  //Save user in the Database
  if (user) {
    //sends email to user
    email.sendEmail(
      req.body.email,
      "Welcome to Lembra Saúde",
      "email: " + req.body.email + "\npassword: " + req.body.password
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
};
