import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-main">
      <div className="child-container">
        <span className="tagLine">Under the hood series...</span>
        <div className="btn-container">
          <span
            className="btn"
            onClick={() => {
              navigate("/code");
            }}
          >
            Code
          </span>
          <span
            className="btn"
            style={{ marginLeft: "1rem" }}
            onClick={() => {
              navigate("/visualizer");
            }}
          >
            Visualizer
          </span>
        </div>
      </div>
    </div>
  );
};
export default Home;
