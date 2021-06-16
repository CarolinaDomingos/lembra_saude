require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

//verify authentication, if the user realy exists and grant access to the user to use certain paths of the app
exports.checkAuth = async (req, res, next) => {
  try {
    //get the authorization headers, part of the header will be the auth token
    const headerReq = req.headers.authorization;
    const splitedHeader = headerReq.split(" ");
    if (splitedHeader.length !== 2) throw "Unauthenticated";

    const scheme = splitedHeader[0];
    const token = splitedHeader[1]; // get auth token
    //Teste with REGEX
    if (!/^Bearer$/i.test(scheme)) throw "Unauthenticated";
    //verify if the token is related with the key in the .env file
    const tokenUser = jwt.verify(token, process.env.JWT_KEY);
    const user = await UserModel.findById(tokenUser.userId);
    if (!user) {
      throw "Unauthenticated";
    }

    req._user = user;
    return next();
  } catch (error) {
    return res.status(400).send({
      message: "Unauthenticated",
    });
  }
};
