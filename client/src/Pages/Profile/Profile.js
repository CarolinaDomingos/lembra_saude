import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../Services/user";
import { update } from "../../Services/user";
import "./Profile.css"

const Profile = (props) => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    userType: "",
  });

  //guarda as alterações no state formData
  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value.replace(/\s\s+/g, " "),
    });
  };
  // executa a primeira vez que a página é executada
  useEffect(() => {
    get();
  }, []);

  // arrow function
  const get = async () => {
    const { user } = await getUser(props.match.params.id);
    const arr = {
      _id: props.match.params.id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      password: "",
    };
    setUser(arr);
    setFormData(arr);
  };

  const handleSubmit = (formData) => async (e) => {
    e.preventDefault();
    try {
      await update(user._id, formData).then((res) => {
        alert(res.message);
      });
    } catch (err) {
      alert(err.response);
    }
  };

  return (
    <div className="container">
      <h1>Profile Page</h1>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(formData)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={handleChange("name")}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            onChange={handleChange("email")}
            value={formData.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={handleChange("password")}
            value={formData.password}
          />
        </div>
        <button type="submit" className="mt-4">
          Atualizar
        </button>
        <Link to={"/" + user.userType} className="other mt-3 mx-4">
          cancelar
        </Link>
      </form>
    </div>
  );
};

export default Profile;
