import React, { useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Menu.css";
import { removeToken, removeUser } from "../../../Utils/localStorage";
//this will be your menu... side bar or other type of menu that I'm going to need
const Menu = ({ list, setChoice }) => {
  const history = useHistory();
  const goTo = useCallback(() => history.push("/login"), [history]);
  const handleData = (name) => (event) => {
    event.preventDefault();
    setChoice(name);
  };

  const logout = () => (e) => {
    e.preventDefault();
    removeToken();
    removeUser();
    goTo();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <Link className="navbar-brand pl-3" to="/">
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
        <ul className="navbar-nav ml-auto mr-auto">
          {list.map((el, i) => {
            return (
              <li 
                className="nav-item px-3" key={i}
                 onClick={handleData(el.name)}
                  data-toggle="tooltip"
                  data-placement="top"
                  title={el.name}
              >
                  {el.icon}
              </li>
            );
          })}
        </ul>
        <ul className="navbar-nav ml-auto pr-3">
          <li className="nav-item" onClick={logout()}>
            <i className="fas fa-sign-out-alt"></i>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
