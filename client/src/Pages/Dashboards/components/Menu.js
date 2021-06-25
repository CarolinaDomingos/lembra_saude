import React from "react";
import { Link } from "react-router-dom";

//this will be your menu... side bar or other type of menu that I'm going to need
const Menu = ({ list }) => {
  return (
    <div>
      <ul>
        {list.forEach((el, i) => {
          <li key={i}>
            <Link to="">
              {el.icon} {el.name}
            </Link>
          </li>;
        })}
      </ul>
    </div>
  );
};

export default Menu;
