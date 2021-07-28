import React, { useCallback, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Menu.css";
import {
  getUserId,
  removeToken,
  removeUser,
} from "../../../../Utils/localStorage";
//this will be your menu... side bar or other type of menu that I'm going to need
const Menu = () => {
  const [user, setUsers] = useState();
  const history = useHistory();
  const goTo = useCallback(() => history.push("/login"), [history]);

  const logout = () => (e) => {
    e.preventDefault();
    removeToken();
    removeUser();
    goTo();
  };

  const getUser = () => {
    const users = JSON.parse(getUserId());
    setUsers(users);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {}, [user]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <Link className="navbar-brand pl-3 col-4" to="/">
        Lembra Saude
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto mr-auto col-7">
          <li className="nav-item mx-5 pt-2">
            <Link to="/about" className="color">
              Como Funciona
            </Link>
          </li>
          <li className="nav-item mx-5 pt-2">
            <Link to="/price" className="color">
              Preçário
            </Link>
          </li>
          {Boolean(user) ? (
            <li className="nav-item ">
              <Link className="btn btn-primary" to="/premium">
                Seja Premium
              </Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
        {!Boolean(user) ? (
          <ul className="navbar-nav ml-auto col-4">
            <li className="nav-item pt-2 mx-5">
              <Link to="/login" className="color">
                Iniciar sessão
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link to="/signup" className="btn btn-success">
                Registar
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ml-auto col-2">
            <li className="av-item mx-3">
              <Link to={"/" + user.userType} className="color">
                <i className="fas fa-address-card"></i>
              </Link>
            </li>
            <li className="av-item mx-3">
              <li className="nav-item" onClick={logout()}>
                <i className="fas fa-sign-out-alt"></i>
              </li>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Menu;
