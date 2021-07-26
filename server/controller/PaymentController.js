const PaymentModel = require("../models/PaymentModel");
require("dotenv").config();

exports.payment = async (req, res) => {
  if (
    req.body.cardNumber === "" ||
    req.body.validation === "" ||
    req.body.ccv === ""
  ) {
    return res
      .status(400)
      .json({ message: "Por favor preencha todos os campos" });
  }

  // cria pagamento
  let payments = await new PaymentModel({
    cardNumber: req.body.cardNumber,
    validation: req.body.validation,
    ccv: req.body.ccv,
    userId: req.body.userId,
    paid: true,
  });

  if (payments) {
    //saving
    payments.save((error) => {
      if (error) {
        return res.status(400).json({ error });
      } else {
        return res.status(200).json({ message: "Pagamento Efetuado!" });
      }
    });
  }
};

exports.getPayment = async (req, res) => {
  // get payment by user
  let payments = await PaymentModel.find({ userId: req.params.id });
  if (payments) {
    return res.status(200).json({ payments });
  }
};
