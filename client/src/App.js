import "./App.css";
import { React, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Routes from "./routes/routes";

import { getUserId, getToken } from "./Utils/localStorage";

function App() {
  const user = getUserId();
  const location = window.location.pathname;
  const history = useHistory();
  const token = getToken();

  useEffect(() => {}, []);

  if (token && location === "/login") {
    return history.location.state ? (
      <Redirect to={history.location.state.from} />
    ) : (
      <Redirect to={"/" + user.userType} />
    );
  }

  if (!token && location !== "/login") {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }
  return <Routes user={user} />;
}

export default App;
