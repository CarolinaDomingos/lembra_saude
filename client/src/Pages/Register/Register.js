import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import "./Register.css";

import { signup } from "../../Services/auth";

const Register = () => {
  const history = useHistory();
  const goTo = useCallback(() => history.push("/login"), [history]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    niss: "",
    address: "",
    password: "",
    userType: "client",
  });

  //Send info to server and waits for response, if the user logs in or not.
  const handleSubmit = (data) => async (e) => {
    console.log(data);
    e.preventDefault();
    try {
      await signup(data).then((res) => {
        console.log(res.message);
        goTo();
      });
    } catch (e) {
      console.log(e);
    }
  };

  // add all the info in the formData object
  const handleData = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value.replace(/\s\s+/g, " "),
    });
  };

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleSubmit(formData)}>
          <div className="title form-group">
            <h5>Registar</h5>
          </div>
          <div className="form-group">
            <label className="mt-3" htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              className="in form-control mt-1"
              id="email"
              aria-describedby="emailHelp"
              onChange={handleData("email")}
              value={formData.email}
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              Não vamos partilhar o seu e-mail com ninguém.
            </small>
          </div>
          <div className="form-group">
            <label className="mt-3" htmlFor="name">Nome Completo</label>
            <input
              type="text"
              name="name"
              className="in form-control mt-1"
              id="name"
              onChange={handleData("name")}
              value={formData.name}
            />
          </div>
          <div className="form-group">
            <label className="mt-3" htmlFor="exampleInputEmail1">NISS</label>
            <input
              type="number"
              name="niss"
              className="in form-control mt-1"
              id="niss"
              max="999999999"
              onChange={handleData("niss")}
              value={formData.niss}
            />
          </div>
          <div className="form-group">
            <label className="mt-3" htmlFor="exampleInputPassword1">Palavra-passe</label>
            <input
              type="password"
              className="in form-control mt-1"
              id="exampleInputPassword1"
              onChange={handleData("password")}
              value={formData.password}
              required
            />
          </div>
          <button type="submit" className="mt-3">
            Submeter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
