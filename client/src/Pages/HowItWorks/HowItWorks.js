import React from "react";
import "./HowItWorks.css";
import Menu from "../Home/component/Menu/Menu";
const HowItWorks = () => {
  return (
    <div>
      <Menu />
      <div className="container">
        <h1>Como funciona</h1>

        <div className="row">         
            
              <div class="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="far fa-user"></i>
                  </h5>
                  <p className="card-text">
                    <h6>Registar</h6>
                  </p>
                </div>
              </div>
            
          
              <div class="card">
                <div className="card-body">
                  <h5 className="card-title">
                  <i className="far fa-credit-card"></i>
                  </h5>
                  <p className="card-text-pay">
                    <h6>Pagar</h6>
                  </p>
                </div>
              </div>

              <div class="card">
                <div className="card-body">
                  <h5 className="card-title">
                  <i className="far fa-calendar-check"></i>
                  </h5>
                  <p className="card-text">
                    <h6>Organizar</h6>
                  </p>
                </div>
              </div>


        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
