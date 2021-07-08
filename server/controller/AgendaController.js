const AgendaModel = require("../models/AgendaModel");

exports.getUserAgenda = async (req, res) => {
  const _id = req._user.id;
  // try to find the user
  const agenda = await AgendaModel.find({ userId: _id });
  //if its not and admin or if isn't the correct user will throw an json error
  if (_id !== agenda[0].userId) {
    return res.status(401).json({ message: "You don't have permition" });
  }

  return res.status(200).json({ agenda });
};

exports.createUserAgenda = async (req, res) => {
  const _id = req._user.id;
  // cria agenda do utilizador na BD
  let agenda = await new AgendaModel({
    userId: _id,
    agenda: req.body.events,
  });

  if (agenda) {
    //saving
    agenda.save((error) => {
      if (error) {
        console.log(error);
      } else {
        return res.status(200).json({ agenda });
      }
    });
  }
};

exports.update = async (req, res) => {
  const _id = req._user.userType === "client" ? req._user.id : req.body.userId;
  // try to find the user
  const agenda = await AgendaModel.find({ userId: _id });
  //if its not and admin or if isn't the correct user will throw an json error
  if (
    _id !== agenda[0].userId &&
    _id !== agenda[0].professionalId &&
    agenda[0].professionalId !== ""
  ) {
    return res.status(401).json({ message: "You don't have permition" });
  }

  const Params = {
    userId: _id,
    agenda: req.body.agenda ? req.body.agenda : req.body,
  };
  const result = await AgendaModel.updateOne({ userId: _id }, { $set: Params });

  if (result) {
    return res.status(200).json({ message: "Atualizado!" });
  }

  return res.status(400).json({ message: "Não foi possivel atualizar" });
};
