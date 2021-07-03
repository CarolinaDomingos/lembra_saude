import React, { useEffect, useState } from "react";
import { getUser } from "../../Services/user";

const Profile = (props) => {
  const [user, setUser] = useState({});
  // arrow function
  const get = async () => {
    const { user } = await getUser(props.match.params.id);
    setUser(user);
  };
  // executa a primeira vez que a página é executada
  useEffect(() => {
    get();
  }, []);

  return (
    <div className="container">
      <h1>Profile Page</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            value={user.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={user.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={user.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;
