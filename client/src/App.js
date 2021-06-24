import "./App.css";
import { React, useEffect, Suspense } from "react";
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import Routes from "./routes/routes";
import Login from "./Pages/Login/Login";
import Client from "./Pages/Dashboards/clientDashboard";
import Professional from "./Pages/Dashboards/professionalDashboard";
import Admin from "./Pages/Dashboards/adminDashboard";
import { getUserId } from "./Utils/localStorage";

function App() {
  const user = getUserId();
  const location = window.location.pathname;

  useEffect(() => {}, []);

  if (!user && location !== "/login") {
    return (
      <Suspense fallback={<div className="spinner-border" role="status" />}>
        <Router>
          <Redirect to="/login" />
          <Route to="/login" component={Login} />
        </Router>
      </Suspense>
    );
  } else if (user.userType === "client") {
    return (
      <Suspense fallback={<div className="spinner-border" role="status" />}>
        <Router>
          <Redirect to="/client" />
          <Route to="/client" component={Client} />
        </Router>
      </Suspense>
    );
  } else if (user.userType === "professional") {
    return (
      <Suspense fallback={<div className="spinner-border" role="status" />}>
        <Router>
          <Redirect to="/client" />
          <Route to="/client" component={Professional} />
        </Router>
      </Suspense>
    );
  } else if (user.userType === "admin") {
    return (
      <Suspense fallback={<div className="spinner-border" role="status" />}>
        <Router>
          <Redirect to="/admin" />
          <Route to="/admin" component={Admin} />
        </Router>
      </Suspense>
    );
  } else return <Routes />;
}

export default App;
