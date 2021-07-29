import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import "./Register.css";
import Menu from "../Home/component/Menu/Menu";
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
    e.preventDefault();
    /* 
      ^ represents starting character of the string.
      (?=.*[0-9]) represents a digit must occur at least once.
      (?=.*[a-z]) represents a lower case alphabet must occur at least once.
      (?=.*[A-Z]) represents an upper case alphabet that must occur at least once.
      (?=.*[@#$%^&-+=()] represents a special character that must occur at least once.
      (?=\\S+$) white spaces don’t allowed in the entire string.
      .{8, 20} represents at least 8 characters and at most 20 characters.
      $ represents the end of the string.
     */
    if (
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/.test(
        data.password
      )
    ) {
      if (/[1-9]/.test(data.niss)) {
        try {
          await signup(data).then((res) => {
            console.log(res.message);
            goTo();
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("Nº de utente no formato incorrecto!");
      }
    } else {
      alert(
        "A palavra-chave deve conter os seguintes parametros:\n - entre 8 a 20 caracteres \n - minimo um caracter especial \n - minimo uma letra em maiuscula e restantes em minusculas"
      );
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
    <div>
      <Menu />
      <div className="container">
        <div className="row">
          <form onSubmit={handleSubmit(formData)}>
            <div className="title form-group">
              <h5>Registar</h5>
            </div>
            <div className="form-group">
              <label className="mt-3" htmlFor="email">
                E-mail
              </label>
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
              <label className="mt-3" htmlFor="name">
                Nome Completo
              </label>
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
              <label className="mt-3" htmlFor="exampleInputEmail1">
                Nº Utente
              </label>
              <input
                type="text"
                name="niss"
                className="in form-control mt-1"
                id="niss"
                maxLength="11"
                onChange={handleData("niss")}
                value={formData.niss}
              />
            </div>
            <div className="form-group">
              <label className="mt-3" htmlFor="exampleInputPassword1">
                Palavra-passe
              </label>
              <input
                type="password"
                className="in form-control mt-1"
                id="exampleInputPassword1"
                onChange={handleData("password")}
                value={formData.password}
                minLength="8"
                maxLength="20"
                required
              />
            </div>
            <button type="submit" className="mt-3">
              Submeter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
