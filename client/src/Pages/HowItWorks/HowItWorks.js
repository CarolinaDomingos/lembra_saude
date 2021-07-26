import React from "react";
import "./HowItWorks.css"
import Menu from "../Home/component/Menu/Menu";
const HowItWorks = () => {
  return (
    <div>
    <Menu />
    <div className="container">
      <h1>Como funciona</h1>

      <div className="registar">
        <div className="row">
          <i className="far fa-user"></i>
          <h6>Regista-se</h6>
        </div>
      </div>

      <div className="pagar">
        <div className="row">
          <i className="far fa-credit-card"></i>
          <h6>Paga</h6>
        </div>
      </div>

      <div className="organizar">
        <div className="row">
          <i className="far fa-calendar-check"></i>
          <h6>Organiza-se</h6>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HowItWorks