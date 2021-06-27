import React from "react";
import Menu from "../components/Menu";
import Panel from "./components/Panel/Panel";
import ProfilePicture from "./components/ProfilePicture/ProfilePicture";
import "./Dashboard.css";

const Dashboard = () => {
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
      <div className="row mt-2 ">
        <div className="col-2 clr-primary">
          <ProfilePicture />
          <Menu list={menuList} />
        </div>
        <div className="col-7">
          <Panel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
