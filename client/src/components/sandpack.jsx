import React, { useState, useEffect } from "react";
import { SandpackCodeEditor, useSandpack } from "@codesandbox/sandpack-react";
import { parse } from "@babel/parser";

const Mysandpack = () => {
  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;

  const [insights, setInsights] = useState([]);

  const code = files[activeFile].code;

  useEffect(() => {
    renderData();
  }, [insights]);

  const renderData = () => {
    console.log("insights:", insights);
    if (insights.callStack) {
      let currentIndex = 0;

      const removeFunction = (func) => {
        console.log("I am removing this function :", func);
        setInsights({
          ...insights,
          callStack: insights.callStack.filter((el) => {
            return el.name !== func.name;
          }),
        });

        setTimeout(() => {
          renderNextFunction();
        }, 2000);
      };
      const renderNextFunction = () => {
        if (currentIndex < insights.callStack.length) {
          const currentFunction = insights.callStack[currentIndex];
          console.log("It's my turn :", currentFunction);

          currentIndex++;

          setTimeout(() => {
            removeFunction(currentFunction);
          }, 3000);
        }
      };
      // renderNextFunction();
    }
  };

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
        // console.log("data:", JSON.parse(data));
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
