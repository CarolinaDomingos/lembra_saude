import React from "react";
import "./ProfilePicture.css";
const ProfilePicture = () => {
  return (
    <div className="d-flex justify-content-center ml-4">
      <div className="container">
        <img
          className="profile"
          src="https://img1.cgtrader.com/items/2101714/0d706e7038/face-texture-3d-model-animated-rigged-obj.jpg"
          alt="face"
        />
        <p className="welcome-text">Bemvindo</p>
      </div>
    </div>
  );
};

export default ProfilePicture;
