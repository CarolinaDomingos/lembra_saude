exports.getToken = () => localStorage.getItem("token");

exports.clearToken = () => {
  try {
    return localStorage.removeItem("token");
  } catch {
    console.log("Error removing token");
  }
};

exports.setToken = (token) => {
  try {
    localStorage.setItem("token", token);
  } catch {
    console.log("Error setting token");
  }
};

exports.getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    console.log("Error retrieving user");
  }
};

exports.clearUser = () => {
  try {
    return localStorage.removeItem("user");
  } catch {
    console.log("Error clearing user");
  }
};

exports.setUser = (user) => {
  try {
    localStorage.setItem("user", user);
  } catch {
    console.log("Error setting user");
  }
};
