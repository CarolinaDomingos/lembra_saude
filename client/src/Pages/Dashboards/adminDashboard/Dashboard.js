import React, { useState, useEffect, useCallback } from "react";

import TableData from "./components/TableData";

import Menu from "../components/Menu";
import { useHistory, Link } from "react-router-dom";
import * as tokeUser from "../../../Utils/localStorage";
import { getAllUsers, getAllProfessionals } from "../../../Services/user";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [menuChoice, setMenuChoice] = useState("");
  const history = useHistory();
  //redirecting...
  const goTo = useCallback((path) => history.push("/" + path), [history]);
  const menuList = [
    { icon: <i className="fas fa-user-alt "></i>, name: "Perfil" },
    { icon: <i className="fas fa-user-friends"></i>, name: "Utentes" },
    {
      icon: <i className="fas fa-user-md"></i>,
      name: "Profissionais de Saude",
    },
  ];

  // vai recolher informação dos utilizadores dependendo do tipo de user
  const getData = async (choice) => {
    var response = [];
    if (choice === "Utentes") {
      response = await getAllUsers();
    }
    if (choice === "Profissionais de Saude") {
      response = await getAllProfessionals();
    }
    //vamos para o perfil do admin
    if (choice === "Perfil") {
      const user = JSON.parse(tokeUser.getUserId());
      goTo("profile/" + user._id);
    }
    if (response.user !== undefined) {
      //código para recolha de informação da BD
      setData(response.user); //recebe a informação e guarda
    }
  };

  useEffect(() => {
    getData(menuChoice);
  }, [menuChoice]);

  useEffect(() => {}, [data]);

  return (
    <div>
      <Menu list={menuList} setChoice={setMenuChoice} />
      <div className="container">
        <div className="col-12 pt-5">
          <Link className="btn btn-primary" to="/newuser">
            Novo Utilizador
          </Link>
        </div>
        <div className="pt-5 col-12">
          <TableData data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
