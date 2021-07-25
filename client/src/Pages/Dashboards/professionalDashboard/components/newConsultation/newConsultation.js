import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../../../../Services/user";
import { getUserId } from "../../../../../Utils/localStorage";
import { updateAgendaByProfessional } from "../../../../../Services/agenda";

const NewConsultation = () => {
  const [allUsers, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    day: "",
    hour: "",
    clientId: "",
    consultationType: "",
  });

  const getUsers = async () => {
    const { user } = await getAllUsers();
    setUsers(user);
  };

  const handleSubmit = (formData) => async (e) => {
    e.preventDefault();
    var newFormData = {
      text: formData.consultationType,
      start: formData.day.split("-").reverse().join("-") + "T00:00:00",
      end: formData.day.split("-").reverse().join("-") + "T00:00:00",
      resource: formData.hour,
      barColor: "#38761d",
      barBackColor: "#93c47d",
      professionalId: JSON.parse(getUserId())._id,
      userId: formData.clientId,
    };

    await updateAgendaByProfessional(newFormData);
  };

  //guarda as alterações no state formData
  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value.replace(/\s\s+/g, " "),
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {}, [allUsers]);

  return (
    <div className="container">
      <h1 className="mt-3">Agendamento de Consulta</h1>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(formData)}
        className="my-5"
      >
        <div className="form-group">
          <label htmlFor="name">Tipo de consulta</label>
          <input
            type="text"
            className="form-control"
            id="consulta"
            onChange={handleChange("consultationType")}
            value={formData.consultationType}
            placeholder="Checkup trimestral"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Utente</label>
          <select
            className="custom-select custom-select-lg mb-3"
            onChange={handleChange("clientId")}
          >
            <option selected>Selecione o Utente</option>

            {allUsers.length !== 0 ? (
              allUsers.map((user) => {
                return <option value={user._id}>{user.name}</option>;
              })
            ) : (
              <option value=""></option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="day">Data da consulta</label>
          <input
            type="text"
            className="form-control"
            id="day"
            onChange={handleChange("day")}
            value={formData.day}
            placeholder="dd-mm-aaaa"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Hora</label>
          <select
            className="custom-select custom-select-lg mb-3"
            onChange={handleChange("hour")}
          >
            <option selected>Selecione a hora da consulta</option>
            <option value="8H">8:00</option>
            <option value="9H">9:00</option>
            <option value="10H">10:00</option>
            <option value="11H">11:00</option>
            <option value="12H">12:00</option>
            <option value="13H">13:00</option>
            <option value="14H">14:00</option>
            <option value="15H">15:00</option>
            <option value="16H">16:00</option>
            <option value="17H">17:00</option>
            <option value="18H">18:00</option>
            <option value="19H">19:00</option>
            <option value="20H">20:00</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
        <Link to={"/professional"} className="mx-4">
          Cancelar
        </Link>
      </form>
    </div>
  );
};

export default NewConsultation;
