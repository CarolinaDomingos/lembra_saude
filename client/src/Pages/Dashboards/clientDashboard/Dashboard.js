import React from "react";
import SideMenu from "./components/sideMenu/SideMenu";
import Panel from "./components/Panel/Panel";
import ProfilePicture from "./components/ProfilePicture/ProfilePicture";
import "./Dashboard.css";
const userDashboard = () => {
  return (
    <div>
      <div className="row mt-2 ">
        <div className="col-2 clr-primary">
          <ProfilePicture />
          <SideMenu />
        </div>
        <div className="col-7">
          <Panel />
        </div>
      </div>
    </div>
  );
};

export default userDashboard;
