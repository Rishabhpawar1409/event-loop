import React from "react";
import "./visualizer.css";

const Visualizer = () => {
  return (
    <div className="visualizer-window">
      <div className="main-container">
        <div className="first-column">
          <div>
            <span className="header">CALL STACK</span>
            <div className="first-container-child1">
              <div
                style={{
                  height: "88%",
                  width: "90%",
                  border: "1px solid lime",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </div>

          <div>
            <span className="header">WEB API</span>
            <div className="first-container-child2">
              <div
                style={{
                  height: "84%",
                  width: "90%",
                  border: "1px solid red",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="second-column">
          <div className="second-column-child1"></div>
          <div>
            <span className="header">QUEUE</span>
            <div className="second-column-child2">
              <div
                style={{
                  height: "80%",
                  width: "95%",
                  border: "1px solid orange",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="third-column">
          <span className="header">OUTPUT</span>
          <div className="third-column-child"></div>
        </div>
      </div>
    </div>
  );
};
export default Visualizer;
