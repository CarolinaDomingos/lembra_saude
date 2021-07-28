import "./App.css";
import { React, useEffect, useCallback } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Routes from "./routes/routes";

import { getUserId, getToken } from "./Utils/localStorage";

function App() {
  const history = useHistory();
  //redirecting...
  const goTo = useCallback((path) => history.push("/" + path), [history]);
  const user = JSON.parse(getUserId());
  const location = window.location.pathname;
  const token = getToken();

  useEffect(() => {}, []);
  if (token && location === "/login") {
    return history.location.state ? (
      <Redirect to={history.location.state.from} />
    ) : (
      goTo(user.userType) //redirect to user dashboard
    );
  }

  /*   if (!token && location !== "/login") {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: location },
        }}
      />
    );
  } */
  return <Routes user={user} />;
}

export default App;
