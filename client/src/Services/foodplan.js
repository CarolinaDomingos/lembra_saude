import axios from "axios";
const URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/";
const { getToken } = require("../Utils/jwt");

//configuração do header para enviar o token, desta forma o server saberá se estamos logados
const config = {
  headers: {
    Authorization: "Bearer " + getToken(),
  },
};

async function getUserFoodPlan() {
  const res = await axios.get(URL + "foodplan/", config);
  return res.data;
}

async function addFoodPlan(payload) {
  const res = await axios.post(URL + "foodplan/add", payload, config);
  return res.data;
}

export { getUserFoodPlan, addFoodPlan };
