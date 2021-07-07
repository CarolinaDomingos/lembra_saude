import React from "react";
import Menu from "./component/Menu/Menu";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Menu />
      <div className="bg-img">
        <span></span>
        <div className="col-12 d-flex justify-content-center mt-5">
          <h1>Bem-vinda(o) à Lembra Saúde</h1>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <p>Para que nunca se esqueça da sua saúde</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
