import React from "react";
import "./Menu.css";
//this will be your menu... side bar or other type of menu that I'm going to need
const Menu = ({ list, setChoice }) => {
  const handleData = (name) => (event) => {
    event.preventDefault();
    setChoice(name);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <a className="navbar-brand" href>
        Lembra Saude
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto mr-auto">
          {list.map((el, i) => {
            return (
              <li className="nav-item px-3" key={i}>
                <a
                  href
                  onClick={handleData(el.name)}
                  data-toggle="tooltip"
                  data-placement="top"
                  title={el.name}
                >
                  {el.icon}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );

  //--------------------------------

  return (
    <div>
      <ul>
        {list.map((el, i) => {
          return (
            <li key={i}>
              <button
                onClick={handleData(el.name)}
                data-toggle="tooltip"
                data-placement="top"
                title={el.name}
              >
                {el.icon}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
