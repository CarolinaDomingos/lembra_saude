import React from "react";

import "./Card.css";

const Card = ({ props }) => {
  return (
    <div class="card my-3">
      <div class="card-body">
        <h2 class="card-title ml-3">Pequeno-Almoço</h2>
        <div className="row">
          <div className="col-8">
            <p class="card-text">Iogurte, Peça de fruta, pão</p>
          </div>
          <div className="col-2 ml-auto ">
            <h3 class="hour">8:30H</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
