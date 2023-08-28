import React, { useState, useEffect } from "react";
import { SandpackCodeEditor, useSandpack } from "@codesandbox/sandpack-react";
import { parse } from "@babel/parser";

const Mysandpack = () => {
  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;

  const [insights, setInsights] = useState([]);

  const code = files[activeFile].code;

  useEffect(() => {
    console.log("insights:", insights);
  }, [insights]);

  const handleSubmit = () => {
    const ast = parse(code);

    fetch("http://localhost:3001/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ast),
    })
      .then((response) => response.text())
      .then((data) => {
        setInsights(JSON.parse(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <SandpackCodeEditor />
      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </button>
    </div>
  );
};
export default Mysandpack;
