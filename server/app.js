const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

//get all the routes
const routes = require("./routes");

//initialize express
const app = express();

//here we now be able to use json documents/files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//this is the policy that will allow us to make requests from the client.
app.use(cors());

//using all the necessary routes
app.use("/api/auth", routes.auth);
app.use("/api/user", routes.user);

/*connects to the database and if everything is ok it will start the server*/

mongoose.connect(
  process.env.MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, database) => {
    if (err) {
      return console.log(err);
    }
    //starts the server by listening the port that we have by default in the .env file.
    app.listen(process.env.PORT, () => {
      console.log("Server is Live!");
    });
  }
);
