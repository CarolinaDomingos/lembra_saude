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
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={handleData("email")}
              value={formData.email}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              onChange={handleData("name")}
              value={formData.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">NISS</label>
            <input
              type="number"
              name="niss"
              className="form-control"
              id="niss"
              max="999999999"
              onChange={handleData("niss")}
              value={formData.niss}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleData("password")}
              value={formData.password}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
