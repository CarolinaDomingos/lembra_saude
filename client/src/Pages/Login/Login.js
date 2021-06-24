import React, { useState, useCallback } from "react";
import { login } from "../../Services/auth";
import { useHistory, Link } from "react-router-dom";
import "./Login.css";
import { setUser, setToken } from "../../Utils/jwt";

const Login = () => {
  //history it is necessary because I'm going to redirect to some page when necessary
  const history = useHistory();
  //redirecting...
  const goTo = useCallback((path) => history.push("/" + path), [history]);
  // This is a state where I'm going to save the email and password from the inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Send info to server and waits for response, if the user logs in or not.
  const handleSubmit = (data) => async (event) => {
    event.preventDefault(); // prevent the submit button from submitting data
    try {
      /*
        send a request to the server to login the user and I'm going to receive the user and token and going
        to send it to a local Storage
      */
      await login(data).then((res) => {
        setUser(res.user);
        setToken(res.token);
        goTo(res.user.userType); // if the user logs in redirect to the user dashboard
      });
    } catch (e) {
      console.log(e);
    }
  };

  // add all the info in the formData object received from the inputs
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
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={handleData("email")}
              value={formData.username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleData("password")}
              value={formData.password}
            />
          </div>
          <div className="form-group form-check">
            {/* Similiar to a href, but here it is a react route link */}
            <Link to="/resetpassword">Forgot password?</Link> {"\u00A0"}
            <Link to="/signup">New user</Link>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="checkbox" />
            <label className="form-check-label" htmlFor="checkbox">
              Stay logged in
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
