import React, {useState} from "react";
import Iframe from "react-iframe";
import "./map.css";
const Map = () => {
  const [search, setSearch] = useState('farmacias')
  return (
    <div className="mt-3 map mt-5">
    <div className="my-2">
      <input type="text" className="form-control" placeholder="search" onChange={(e) =>{e.target.value.trim() !== '' ? setSearch(e.target.value) : setSearch('farmacias')}}/>
    </div>
    
      <Iframe
        width="150%"
        height="700"
        className="frame"
        frameborder="0"
        src={"https://www.google.com/maps/embed/v1/search?key=AIzaSyDskyw90OoYBGfomRhyxUgXMdcOFcnDjDI&q="+search}
        allowfullscreen
      ></Iframe>
    </div>
  );
};

export default Map;
