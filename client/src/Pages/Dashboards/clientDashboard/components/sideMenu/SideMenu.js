import React from "react";
import { Link } from "react-router-dom";
import "./SideMenu.css";
const SideMenu = () => {
  return (
    <div className="col-12">
      <div className="container">
        <ul>
          <li className="my-2">
            <Link to="/profile" className="links">
              <i className="fas fa-user-alt"></i> Perfil
            </Link>
          </li>
          <li className="my-2">
            <Link to="/calendar" className="links">
              <i className="fas fa-calendar-alt"></i> Calendário
            </Link>
          </li>
          <li className="my-2">
            <Link to="/foodPlan" className="links">
              <i className="fas fa-seedling"></i> Plano Alimentar
            </Link>
          </li>
          <li className="my-2">
            <Link to="/settings" className="links">
              <i className="fas fa-cog"></i> Definições
            </Link>
          </li>
        </ul>
        <div>{/* Premium access goes here */}</div>
      </div>
    </div>
  );
};

export default SideMenu;
