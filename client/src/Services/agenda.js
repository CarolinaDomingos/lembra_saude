import axios from "axios";
const URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/";
const { getToken } = require("../Utils/jwt");

//configuração do header para enviar o token, desta forma o server saberá se estamos logados
const config = {
  headers: {
    Authorization: "Bearer " + getToken(),
  },
};

//update user
async function updateAgenda(payload) {
  const res = await axios.put(URL + "agenda/update", payload, config);
  return res ? res.data : "username or password incorrect";
}

//update user agenda by a professional
async function updateAgendaByProfessional(payload) {
  const res = await axios.put(
    URL + "agenda/updatebyprofessional/",
    payload,
    config
  );
  return res ? res.data : "username or password incorrect";
}
async function getUserAgenda() {
  const res = await axios.get(URL + "agenda/", config);
  return res.data;
}

async function createUserAgenda(payload) {
  const res = await axios.post(URL + "agenda/create", payload, config);
  return res.data;
}

async function getConsults() {
  const res = await axios.get(URL + "agenda/professionals/consults/", config);
  return res.data;
}

export {
  updateAgenda,
  getUserAgenda,
  updateAgendaByProfessional,
  getConsults,
  createUserAgenda,
};
