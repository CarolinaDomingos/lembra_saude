/*
    Components will only rerender if its props have changed! Normally all of our React components 
    in our tree will go through a render when changes are made. 
    With React.memo(), we can have only some components render.

    React.lazy(): Code-splitting and lazy-loading with React Suspense
 */
import React, { lazy, memo, Suspense, Fragment } from "react";
// Module to Navigate trough all the links
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

/*
 configuring all the links, by identifying the path that we are going to use in the link 
    ex:(www.yourpage.com/login) the path will be /login,
 if the path for that component is exact, and we need to import the component.
 */
const routesConfig = [
  {
    path: "/page-not-found",
    exact: true,
    component: lazy(() => import("../Pages/PageNotFound/PageNotFound")),
  },
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
    roles: ["client"],
  },
  {
    path: "/admin",
    exact: true,
    component: lazy(() =>
      import("../Pages/Dashboards/adminDashboard/Dashboard")
    ),
    roles: ["admin"],
  },
  {
    path: "/professional",
    exact: true,
    component: lazy(() =>
      import("../Pages/Dashboards/professionalDashboard/Dashboard")
    ),
    roles: ["professional"],
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
    roles: ["client", "admin", "professional"],
  },

  {
    component: () => <Redirect to="/page-not-found" />,
  },
];

//rendering all routes to be possible to use them
const renderRoutes = (routes, user) => {
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
      <Switch>
        {/* routes is an array, so we are going to map all the positions to get all the information */}
        {routes.map((route, i) => {
          const Layout = route.layout || Fragment;
          const Component = route.component;
          const RouteComponent = route.roles ? PrivateRoute : Route;

          return (
            <RouteComponent
              key={i}
              exact
              path={route.path}
              component={route.component}
              roles={route.roles}
            >
              {(props) => (
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes, user)
                  ) : (
                    <Component user={user} {...props} />
                  )}
                </Layout>
              )}
            </RouteComponent>
          );
        })}
      </Switch>
    </Suspense>
  );
};

function Routes(user) {
  return renderRoutes(routesConfig, user);
}

export default memo(Routes);
