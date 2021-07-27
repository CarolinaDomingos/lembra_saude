import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { getUserFoodPlan, addFoodPlan } from "../../../../../Services/foodplan";
import "./FoodPlan.css";

const FoodPlan = () => {
  const [plan, setPlan] = useState([]);
  const [addPlan, setaddPlan] = useState(false);
  // This is a state where I'm going to save the email and password from the inputs
  const [formData, setFormData] = useState({
    title: "",
    hora: "",
    alimentos: "",
  });

  const getPlan = async () => {
    const data = await getUserFoodPlan();
    setPlan(data.data);
  };

  //Send info to server and waits for response, if the user logs in or not.
  const handleSubmit = (data) => async (event) => {
    event.preventDefault(); // prevent the submit button from submitting data
    const response = await addFoodPlan(data);
    if (response) {
      getPlan();
    }
  };

  // add all the info in the formData object received from the inputs
  const handleData = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value.replace(/\s\s+/g, " "),
    });
  };

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
          {addPlan ? (
            <button className="btn btn-danger">Eliminar Plano</button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => setaddPlan(true)}
            >
              Adicionar Plano
            </button>
          )}
        </div>
      </div>
      {addPlan ? (
        <div className="row">
          <div className="my-3 col-12" style={{ background: "white" }}>
            <form onSubmit={handleSubmit(formData)}>
              <div className="card-body">
                <label className="card-title" htmlFor="title">
                  Titulo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  style={{ width: 400 }}
                  placeholder="ex: Pequeno-Almoço"
                  onChange={handleData("title")}
                />
                <div className="row">
                  <div className="mt-3">
                    <label htmlFor="food">Alimentos</label>
                    <input
                      type="text"
                      className="form-control"
                      id="food"
                      style={{ width: 400 }}
                      placeholder="ex: Banana, frutos secos, carne de aves"
                      onChange={handleData("alimentos")}
                    />
                  </div>
                  <div className="col-2 ml-auto ">
                    <label htmlFor="hour">Hora</label>
                    <select
                      className="form-control"
                      id="hour"
                      onChange={handleData("hora")}
                    >
                      <option value="01:00">01:00</option>
                      <option value="01:30">01:30</option>
                      <option value="02:00">02:00</option>
                      <option value="02:30">02:30</option>
                      <option value="03:00">03:00</option>
                      <option value="03:30">03:30</option>
                      <option value="04:00">04:00</option>
                      <option value="04:30">04:30</option>
                      <option value="05:00">05:00</option>
                      <option value="05:30">05:30</option>
                      <option value="06:00">06:00</option>
                      <option value="06:30">06:30</option>
                      <option value="07:00">07:00</option>
                      <option value="07:30">07:30</option>
                      <option value="08:00">08:00</option>
                      <option value="08:30">08:30</option>
                      <option value="09:00">09:00</option>
                      <option value="09:30">09:30</option>
                      <option value="10:00">10:00</option>
                      <option value="10:30">10:30</option>
                      <option value="11:00">11:00</option>
                      <option value="11:30">11:30</option>
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="13:00">13:00</option>
                      <option value="13:30">13:30</option>
                      <option value="14:00">14:00</option>
                      <option value="14:30">14:30</option>
                      <option value="15:00">15:00</option>
                      <option value="15:30">15:30</option>
                      <option value="16:00">16:00</option>
                      <option value="16:30">16:30</option>
                      <option value="17:00">17:00</option>
                      <option value="17:30">17:30</option>
                      <option value="18:00">18:00</option>
                      <option value="18:30">18:30</option>
                      <option value="19:00">19:00</option>
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                      <option value="21:30">21:30</option>
                      <option value="22:00">22:00</option>
                      <option value="22:30">22:30</option>
                      <option value="23:00">23:00</option>
                      <option value="23:30">23:30</option>
                      <option value="24:00">24:00</option>
                      <option value="24:30">24:30</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-12">
                  <button className="btn btn-primary">Guardar</button>
                  <button className="btn" onClick={() => setaddPlan(false)}>
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
      {plan.length > 0 ? (
        <div className="table">
          {plan.map((food, index) => {
            return <Card data={food} key={index} />;
          })}
        </div>
      ) : (
        <div className="table">Não existe nenhum plano de alimentação.</div>
      )}
    </div>
  );
};

export default FoodPlan;
