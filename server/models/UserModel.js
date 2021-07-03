const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const saltRounds = 10;

//This schema will tell the DB what is going to be like.
const userDataSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    niss: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

//Before saving the password it will hash it and then save it in th Database
userDataSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    //encrypting the password.
    bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

//Add pre-save validation for unique fields.
userDataSchema.plugin(uniqueValidator);
//identify the model
const UserModel = mongoose.model("User", userDataSchema);
//export it
module.exports = UserModel;
