import React, { useEffect } from "react";
import { deleteCardFoodPlan } from "../../../../../../Services/foodplan";
import "./Card.css";

const Card = ({ data }) => {
  const deleteCard = async () => {
    const response = window.confirm(
      "está prestes a eliminar o cartão: " + data.title + ", deseja continuar?"
    );
    if (response) {
      const { message } = await deleteCardFoodPlan(data);
      if (message) {
        alert(message);
      }
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="card my-3" onClick={() => deleteCard(data._id)}>
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
