import React from "react";
import TableData from "../components/tableData";
import Menu from "../components/Menu";

const userDashboard = () => {
  const menuList = [
    { icon: <i className="fas fa-user-alt"></i>, name: "Perfil" },
    { icon: <i className="fas fa-calendar-alt"></i>, name: "Utentes" },
    {
      icon: <i class="fas fa-h-square"></i>,
      name: "Profissionais de Saude",
    },
    { icon: <i className="fas fa-cog"></i>, name: "Definições" },
  ];

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Menu list={menuList} />
      <TableData />
    </div>
  );
};

export default userDashboard;
