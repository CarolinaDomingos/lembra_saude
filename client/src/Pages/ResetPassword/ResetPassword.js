import React, { useState } from "react";
import { reset } from "../../Services/auth";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  //Send info to server and waits for response, if the user logs in or not.
  const handleSubmit = (data) => async (event) => {
    event.preventDefault();
    await reset(data).then((res) => console.log(res));
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
          <div className="row">
            <div className="col-4">
              <button type="submit" className="btn btn-primary">
                Reset
              </button>
            </div>
            <div className="col-4">
              <Link to="/login">Login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
