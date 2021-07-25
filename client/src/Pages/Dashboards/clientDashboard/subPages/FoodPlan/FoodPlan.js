import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./components/Card";

import "./FoodPlan.css";
const FoodPlan = () => {
  const [plan, setPlan] = useState([]);

  const getPlan = () => {};

  useEffect(() => {
    getPlan();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="">
          <h1>Plano alimentar</h1>
        </div>
        <div className="ml-auto">
          <Link className="btn btn-primary">Adicionar Plano</Link>
        </div>
      </div>
      <div className="table">
        <Card data="" />
        <Card data="" />
        <Card data="" />
        <Card data="" />
      </div>
    </div>
  );
};

export default FoodPlan;
