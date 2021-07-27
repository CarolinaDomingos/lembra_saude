const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
//get all the routes
const routes = require("./routes");

//initialize express
const app = express();

//here we now be able to use json documents/files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//this is the policy that will allow us to make requests from the client.
app.use(cors());

//using all the necessary routes
app.use("/api/auth", routes.auth);
app.use("/api/payment", routes.payment);
app.use("/api/user", routes.user);
app.use("/api/agenda", routes.agenda);
app.use("/api/foodplan", routes.foodplan);

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
