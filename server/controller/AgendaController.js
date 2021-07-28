const AgendaModel = require("../models/AgendaModel");

exports.getUserAgenda = async (req, res) => {
  const _id = req._user.id;
  // try to find the user
  const agenda = await AgendaModel.find({ userId: _id });
  if (agenda.length > 0) {
    //if its not and admin or if isn't the correct user will throw an json error
    if (_id !== agenda[0].userId) {
      return res.status(401).json({ message: "You don't have permition" });
    }
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
        return res.status(400).json({ error });
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
  console.log(agenda);

  if (agenda.length > 0) {
    //if its not a professional or if isn't the correct user will throw an json error
    if (
      _id !== agenda[0].userId &&
      _id !== agenda[0].professionalId &&
      agenda[0].professionalId !== ""
    ) {
      return res.status(401).json({ message: "You don't have permition" });
    }
  }

  const Params = {
    userId: _id,
    agenda: req.body,
  };
  const result = await AgendaModel.updateOne({ userId: _id }, { $set: Params });

  if (result) {
    return res.status(200).json({ message: "Atualizado!" });
  }

  return res.status(400).json({ message: "Não foi possivel atualizar" });
};

exports.updateByProfessional = async (req, res) => {
  //if its not a professional or if isn't the correct user will throw an json error
  if (req._user.userType !== "professional") {
    return res.status(401).json({ message: "You don't have permition" });
  }
  const _id = req.body.userId;
  // try to find the user
  var user = await AgendaModel.find({ userId: _id });

  if (user.length === 0) {
    // cria agenda do utilizador na BD
    let agenda = new AgendaModel({
      userId: _id,
      agenda: [],
    });
    if (agenda) {
      //saving
      agenda.save((error) => {
        if (error) {
          return res.status(400).error({ error });
        }
      });
    }
  }
  user = await AgendaModel.find({ userId: _id });
  var count = 0;
  if (user[0].agenda.length === 0) {
    count = 1;
  } else {
    count = user[0].agenda[user[0].agenda.length - 1].id + 1;
  }
  var newBody = {
    id: count,
    text: req.body.text,
    start: req.body.start,
    end: req.body.end,
    resource: req.body.resource,
    barColor: req.body.barColor,
    barBackColor: req.body.barBackColor,
    professionalId: req.body.professionalId,
  };

  user[0].agenda = [...user[0].agenda, newBody];

  const Params = {
    userId: _id,
    agenda: req.body.agenda ? req.body.agenda : user[0].agenda,
  };
  const result = await AgendaModel.updateOne({ userId: _id }, { $set: Params });

  if (result) {
    return res.status(200).json({ message: "Atualizado!" });
  }

  return res.status(400).json({ message: "Não foi possivel atualizar" });
};

exports.getConsults = async (req, res) => {
  //if its not a professional or if isn't the correct user will throw an json error
  if (req._user.userType !== "professional") {
    return res.status(401).json({ message: "You don't have permition" });
  }

  //get all agendas
  const agendas = await AgendaModel.find();

  if (agendas) {
    return res.status(200).json({ agenda: agendas });
  }

  return res.status(401).json({ message: "Não foi possivel atualizar" });
};
