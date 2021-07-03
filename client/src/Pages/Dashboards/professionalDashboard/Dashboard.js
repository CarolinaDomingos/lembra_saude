import React, { useState, useCallback } from "react";
import Menu from "../components/Menu";
import { useHistory, Link } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [menuChoice, setMenuChoice] = useState("");
  const history = useHistory();
  const menuList = [
    { icon: <i className="fas fa-user-alt "></i>, name: "Perfil" },
    { icon: <i className="fas fa-calendar-alt "></i>, name: "Utentes" },
    {
      icon: <i className="fas fa-h-square"></i>,
      name: "Profissionais de Saude",
    },
    { icon: <i className="fas fa-cog "></i>, name: "Definições" },
  ];
  //redirecting...
  const goTo = useCallback((path) => history.push("/" + path), [history]);
  return (
    <div>
      <Menu list={menuList} setChoice={setMenuChoice} />
      <div className="container">
        <div className="col-12 pt-5">
          <Link className="btn btn-primary" to="/newuser">
            Agendar consulta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
