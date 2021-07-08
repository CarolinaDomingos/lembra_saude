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
async function update(id, payload) {
  console.log(id);
  const res = await axios.put(URL + "user/update/" + id, payload, config);
  return res ? res.data : "username or password incorrect";
}

async function deleteUser(id) {
  const res = await axios.delete(URL + "user/delete/" + id, config);
  return res.data;
}

async function getUser(id) {
  const res = await axios.get(URL + "user/" + id, config);
  return res.data;
}

async function getAllUsers() {
  const res = await axios.get(URL + "user/users/all", config);
  return res.data;
}

async function getAllProfessionals() {
  const res = await axios.get(URL + "user/professionals/all", config);
  return res.data;
}

export { update, deleteUser, getUser, getAllUsers, getAllProfessionals };
