import React, { useEffect } from "react";

import "./Card.css";

const Card = ({ data }) => {
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div className="card my-3">
      <div className="card-body">
        <h2 className="card-title ml-3">{data.title}</h2>
        <div className="row">
          <div className="col-8">
            <p className="card-text">{data.alimentos}</p>
          </div>
          <div className="col-2 ml-auto ">
            <h3 className="hour">{data.hora}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
