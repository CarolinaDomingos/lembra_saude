import React, { useEffect, useState, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import { signup } from "../../../Services/auth";
import "./NewUser.css";
const NewUser = () => {
  const history = useHistory();
  const goTo = useCallback(() => history.push("/admin"), [history]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    niss: "",
    password: "",
    userType: "",
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

  // executa a primeira vez que a página é executada
  useEffect(() => {}, []);

  return (
    <div className="container">
      <h1>New User</h1>
      <form onSubmit={handleSubmit(formData)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={handleData("name")}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            onChange={handleData("email")}
            value={formData.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">NISS</label>
          <input
            type="number"
            className="form-control"
            id="niss"
            onChange={handleData("niss")}
            maxLength="10"
            value={formData.niss}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={handleData("password")}
            value={formData.password}
          />
        </div>
        <div className="form-group">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleData("userType")}
          >
            <option>Selecione tipo de utilizador</option>
            <option value="client">Utente</option>
            <option value="professional">Profissional de saúde</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="form-group row">
          <div className="col-1">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="col-1 py-2">
            <Link to="/admin">Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
