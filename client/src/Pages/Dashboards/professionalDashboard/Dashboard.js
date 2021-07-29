import React, { useState, useCallback, useEffect } from "react";
import Menu from "../components/Menu";
import { useHistory, Link } from "react-router-dom";
import { getUserId } from "../../../Utils/localStorage";
import { getConsults } from "../../../Services/agenda";
import TableData from "./components/TableData/tableData";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [menuChoice, setMenuChoice] = useState("");
  const history = useHistory();
  const menuList = [
    { icon: <i className="fas fa-user-alt "></i>, name: "Perfil" },
  ];
  //redirecting...
  const goTo = useCallback((path) => history.push("/" + path), [history]);

  // vai recolher informação dos utilizadores dependendo do tipo de user
  const getData = async (choice) => {
    const user = JSON.parse(getUserId());
    //vamos para o perfil do admin
    if (choice === "Perfil") {
      goTo("profile/" + user._id);
    }
  };

  const getConsultations = async () => {
    const { agenda } = await getConsults();
    var consults = [];
    const userId = JSON.parse(getUserId())._id;
    for (let i = 0; i < agenda.length; i++) {
      for (let j = 0; j < agenda[i].agenda.length; j++) {
        if (agenda[i].agenda[j].professionalId === userId) {
          consults = [
            ...consults,
            {
              _id: agenda[i].agenda[j]._id,
              id: agenda[i].agenda[j].id,
              text: agenda[i].agenda[j].text,
              start: agenda[i].agenda[j].start,
              end: agenda[i].agenda[j].end,
              resource: agenda[i].agenda[j].resource,
              barColor: agenda[i].agenda[j].barColor,
              barBackColor: agenda[i].agenda[j].barBackColor,
              professionalId: agenda[i].agenda[j].professionalId,
              userId: agenda[i].userId,
            },
          ];
        }
      }
    }
    setData(consults);
  };

  //Recolhe todas as consultas do profissional de saúde
  useEffect(() => {
    getConsultations();
  }, []);

  //sempre que a variavel menuchoice seja alterada irá executar a função getData
  useEffect(() => {
    getData(menuChoice);
  }, [menuChoice]);

  useEffect(() => {}, [data]);

  return (
    <div>
      <Menu list={menuList} setChoice={setMenuChoice} />
      <div className="container">
        <div className="col-12 pt-5">
          <Link className="btn btn-primary" to="/professional/newConsultation">
            Agendar consulta
          </Link>
        </div>
        <div className="col-12 pt-5">
          <h1>Consultas</h1>
        </div>
        <div className="pt-5 col-12">
          <TableData data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
