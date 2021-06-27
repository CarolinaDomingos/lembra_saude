/*
    Components will only rerender if its props have changed! Normally all of our React components 
    in our tree will go through a render when changes are made. 
    With React.memo(), we can have only some components render.

    React.lazy(): Code-splitting and lazy-loading with React Suspense
 */
import React, { lazy, memo, Suspense } from "react";
// Module to Navigate trough all the links
import { Switch, Route, BrowserRouter } from "react-router-dom";

/*
 configuring all the links, by identifying the path that we are going to use in the link 
    ex:(www.yourpage.com/login) the path will be /login,
 if the path for that component is exact, and we need to import the component.
 */
const routesConfig = [
  {
    path: "/login",
    exact: true,
    component: lazy(() => import("../Pages/Login/Login")),
  },
  {
    path: "/signup",
    exact: true,
    component: lazy(() => import("../Pages/Register/Register")),
  },
  {
    path: "/",
    exact: true,
    component: lazy(() => import("../Pages/Home/Home")),
  },
  {
    path: "/client",
    exact: true,
    component: lazy(() =>
      import("../Pages/Dashboards/clientDashboard/Dashboard")
    ),
  },
  {
    path: "/admin",
    exact: true,
    component: lazy(() =>
      import("../Pages/Dashboards/adminDashboard/Dashboard")
    ),
  },
  {
    path: "/professional",
    exact: true,
    component: lazy(() =>
      import("../Pages/Dashboards/professionalDashboard/Dashboard")
    ),
  },
  {
    path: "/resetpassword",
    exact: true,
    component: lazy(() => import("../Pages/ResetPassword/ResetPassword")),
  },
  {
    path: "/profile/:id",
    exact: true,
    component: lazy(() => import("../Pages/Profile/Profile")),
  },
];

//rendering all routes to be possible to use them
const renderRoutes = (routes) => {
  if (!routes) {
    return null;
  }

  return (
    /* While searching for the route, suspense will going to have a spinner (loading icon) to show while we are waiting */
    <Suspense fallback={<div className="spinner-border" role="status" />}>
      {/*
        We will use BrowserRouter, Switch, 
        Route and Link Reactjs module for routing, 
        The routing help to navigate page using anchor tag or menu link.
     */}
      <BrowserRouter>
        <Switch>
          {/* routes is an array, so we are going to map all the positions to get all the information */}
          {routes.map((route, i) => {
            return (
              <Route
                key={i}
                exact
                path={route.path}
                component={route.component}
              />
            );
          })}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

function Routes(token) {
  return renderRoutes(routesConfig);
}

export default memo(Routes);
