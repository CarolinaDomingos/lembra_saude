import axios from "axios";
const URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/";

//get user info
async function me() {
  const res = await axios.get("auth/me");
  return res ? res.data.user : null;
}

//login user (payload is the username/email and password)
async function login(payload) {
  const res = await axios.post(URL + "auth/signin", payload);
  return res ? res.data : "username or password incorrect";
}

//register user
async function signup(payload) {
  const res = await axios.post(URL + "auth/signup", payload);
  return res ? res.data : "username or password incorrect";
}

//register user
async function reset(payload) {
  const res = await axios.put(URL + "auth/reset_password", payload);
  return res.data;
}

//check if user is authenticated
async function checkAuth(payload) {
  const res = await axios.post(URL + "auth/verify", payload);
  return res ? res.data : "User not logged In!";
}

export { me, login, checkAuth, signup, reset };
