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
async function pay(payload) {
  const res = await axios.post(URL + "payment/pay/", payload, config);
  return res ? res.data : "username or password incorrect";
}

//update user
async function getPayment(id) {
  const res = await axios.get(URL + "payment/payment/" + id, config);
  return res ? res.data : "username or password incorrect";
}

export { pay, getPayment };
