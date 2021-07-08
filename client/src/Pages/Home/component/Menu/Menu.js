import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
//this will be your menu... side bar or other type of menu that I'm going to need
const Menu = () => {
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
        <ul className="navbar-nav ml-auto mr-auto col-6">
          <li className="nav-item mx-5">
            <Link to="/about" className="color">
              Como Funciona
            </Link>
          </li>
          <li className="nav-item mx-5">
            <Link to="/price" className="color">
              Preçário
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto pr-3 col-3">
          <li className="nav-item px-3 mt-2">
            <Link to="/login" className="color">
              Iniciar sessão
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="btn btn-success">
              Registar
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
