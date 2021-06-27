import React from "react";
import "./Menu.css";
//this will be your menu... side bar or other type of menu that I'm going to need
const Menu = ({ list, setChoice }) => {
  const handleData = (name) => (event) => {
    event.preventDefault();
    setChoice(name);
  };

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
