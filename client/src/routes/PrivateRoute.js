import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { getUserId } from "../Utils/localStorage";
/* import AppBar from "Components/AppBar/AppBar"; */

function PrivateRoute({ children, roles, ...rest }) {
  const user = JSON.parse(getUserId());
  if (!getUserId()) {
    children = <Redirect to="/login" />;
  } else if (!roles.includes(user.userType)) {
    children = <Redirect to={`/${user.userType}`} />;
  }

  return <Route {...rest}>{children}</Route>;
}

PrivateRoute.propTypes = {
  children: PropTypes.any,
  user: PropTypes.object,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
