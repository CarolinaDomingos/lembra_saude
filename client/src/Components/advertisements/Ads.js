import React, { useEffect, useState } from "react";
import banner1 from "../../assets/medis.png";
import banner2 from "../../assets/fidelidade.png";
import banner3 from "../../assets/multicare.png";
import "./ads.css";

const Advertises = () => {
  const banners = [banner1, banner2, banner3];
  const [random, setRandom] = useState(0);

  const changeBanner = () => {
    const rnd = parseInt(Math.floor(Math.random() * banners.length + 1));
    setRandom(rnd);
  };

  useEffect(() => {
    setInterval(() => {
      changeBanner();
    }, 10000);
  }, []);

  useEffect(() => {}, [random]);

  return (
    <div className="mt-2 d-flex justify-content-center">
      {random === 1 ? (
        <img src={banner1} alt="..." />
      ) : random === 2 ? (
        <img src={banner2} alt="..." />
      ) : (
        <img src={banner3} alt="..." />
      )}
    </div>
  );
};

export default Advertises;
