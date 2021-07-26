const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//This schema will tell the DB what is going to be like.
const paymentDataSchema = new Schema(
  {
    cardNumber: {
      type: String,
      required: true,
      unique: true,
    },
    validation: {
      type: String,
      required: true,
    },
    ccv: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: "payments",
    timestamps: true,
  }
);

//export it
//identify the model
const PaymentModel = mongoose.model("Payments", paymentDataSchema);
//export it
module.exports = PaymentModel;
