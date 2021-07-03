import React, { useState, useEffect, useCallback } from "react";
import Menu from "../components/Menu";
import { useHistory, Link } from "react-router-dom";
import * as tokeUser from "../../../Utils/localStorage";
import Agenda from "./subPages/Agenda";

//CSS
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [menuChoice, setMenuChoice] = useState("");
  const history = useHistory();
  //redirecting...
  const goTo = useCallback((path) => history.push("/" + path), [history]);
  const menuList = [
    { icon: <i className="fas fa-user-alt"></i>, name: "Perfil" },
    { icon: <i className="fas fa-calendar-alt"></i>, name: "Agenda" },
    {
      icon: <i class="fas fa-map-marked-alt"></i>,
      name: "Mapa",
    },
  ];

  // vai recolher informação dos utilizadores dependendo do tipo de user
  const getData = async (choice) => {
    var response = [];
    const user = JSON.parse(tokeUser.getUserId());

    //vamos para o perfil do admin
    if (choice === "Perfil") {
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
      <div className="container">
        {menuChoice === "Agenda" ? (
          <Agenda />
        ) : menuChoice === "Mapa" ? (
          <div>Mapa</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
