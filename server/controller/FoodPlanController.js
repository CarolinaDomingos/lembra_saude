const FoodPlanModel = require("../models/FoodPlanModel");

exports.getPlan = async (req, res) => {
  const _id = req._user.id;
  // cria agenda do utilizador na BD
  let plan = await FoodPlanModel.find({
    userId: _id,
  });

  if (plan) {
    const data = plan[0].plan;
    return res.status(200).json({ data });
  }
  return res.status(404).json({ message: "Plano não encontrado" });
};

exports.addPlan = async (req, res) => {
  const _id = req._user.id;
  // cria agenda do utilizador na BD
  let userPlan = await FoodPlanModel.find({
    userId: _id,
  });

  let plans = [];
  let newplan = "";

  if (!userPlan) {
    plans = [
      {
        title: req.body.title,
        hora: req.body.hora,
        alimentos: req.body.alimentos,
      },
    ];
    // cria agenda do utilizador na BD
    newplan = await new FoodPlanModel.create({
      pan: plan,
      userId: _id,
    });
    //saving
    plan.save((error) => {
      if (error) {
        console.log(error);
      } else {
        return res
          .status(200)
          .json({ message: "Plano Adicionado com sucesso" });
      }
    });
  } else {
    plans = userPlan[0].plan;
    console.log(plans);
    plans.push({
      title: req.body.title,
      hora: req.body.hora,
      alimentos: req.body.alimentos,
    });

    const Params = {
      plan: plans,
      userId: _id,
    };
    // cria agenda do utilizador na BD
    newplan = await FoodPlanModel.updateOne({ userId: _id }, { $set: Params });
  }

  if (newplan) {
    return res.status(200).json({ message: "Atualizado!" });
  }

  return res.status(400).json({ message: "Não foi possivel atualizar" });
};

exports.deleteCardFromPlan = async (req, res) => {
  const _id = req._user._id;
  console.log(user);
  // cria agenda do utilizador na BD
  let userPlan = await FoodPlanModel.find({
    userId: _id,
  });
  console.log(req.body);
  const Params = {
    plan: plans,
    userId: _id,
  };
  // cria agenda do utilizador na BD
  /* newplan = await FoodPlanModel.updateOne({ userId: _id }, { $set: Params }); */
};
