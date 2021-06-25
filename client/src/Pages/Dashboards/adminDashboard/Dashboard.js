import React, { useState, useEffect } from "react";
import TableData from "../components/tableData";
import Menu from "../components/Menu";

const UserDashboard = () => {
  const [data, setData] = useState("");
  let menuChoice = "";

  const menuList = [
    { icon: <i className="fas fa-user-alt"></i>, name: "Perfil" },
    { icon: <i className="fas fa-calendar-alt"></i>, name: "Utentes" },
    {
      icon: <i class="fas fa-h-square"></i>,
      name: "Profissionais de Saude",
    },
    { icon: <i className="fas fa-cog"></i>, name: "Definições" },
  ];

  // vai recolher informação dos utilizadores dependendo do tipo de user
  const getData = (typeOfUser) => {
    console.log(typeOfUser);
    //código para recolha de informação da BD
    setData(""); //recebe a informação e guarda
  };

  useEffect(() => {
    getData(menuChoice);
  }, [menuChoice]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Menu list={menuList} setChoice={menuChoice} />
      <TableData data={data} />
    </div>
  );
};

export default UserDashboard;
