import "./App.css";
import React from "react";
import SandpackContainer from "./components/sandpackProvider";
import Home from "./components/home";
import { Routes, Route } from "react-router-dom";
import Visualizer from "./components/visualizer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="code" element={<SandpackContainer />} />
        <Route exact path="visualizer" element={<Visualizer />} />
      </Routes>
    </div>
  );
}

export default App;
