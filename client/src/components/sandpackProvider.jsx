import React from "react";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import Mysandpack from "./sandpack";

const SandpackContainer = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      <h3>I am creating a under the hood series...</h3>

      <SandpackProvider>
        <Mysandpack />
      </SandpackProvider>
    </div>
  );
};
export default SandpackContainer;
