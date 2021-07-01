import React, { useState, useEffect, useCallback } from "react";
import TableData from "../components/tableData";
import Menu from "../components/Menu";
import { useHistory } from "react-router-dom";
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
    { icon: <i className="fas fa-calendar-alt "></i>, name: "Utentes" },
    {
      icon: <i className="fas fa-h-square"></i>,
      name: "Profissionais de Saude",
    },
    { icon: <i className="fas fa-cog "></i>, name: "Definições" },
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
    //código para recolha de informação da BD
    setData(response); //recebe a informação e guarda
  };

  useEffect(() => {
    getData(menuChoice);
  }, [menuChoice]);

  return (
    <div>
      <Menu list={menuList} setChoice={setMenuChoice} />
      <div className="pt-5">
        <TableData data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
