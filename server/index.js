const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const traverse = require("@babel/traverse").default;
const app = express();

const data = {
  callStack: [],
  globalMemory: [],
  webAPIContainers: [],
  conditionalStatements: [],
};

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("Hey, welcome to Rishabh's server!");
});

app.post("/analyze", (req, res) => {
  const ast = req.body;
  console.log("I got a request, with ast");
  traverse(ast, {
    FunctionDeclaration(path) {
      if (path.node.type === "FunctionDeclaration") {
        const nodeData = {
          name: path.node.id.name,
          params: path.node.params.map((el) => {
            return el.name;
          }),
        };
        data.callStack.push(nodeData);
      }
    },
    VariableDeclaration(path) {
      if (path.node.type === "VariableDeclaration") {
        data.globalMemory.push(path.node);
        // console.log("data:", data);
      }
    },
    CallExpression(path) {
      const { callee } = path.node;
      if (callee.type === "Identifier" && callee.name === "setTimeout") {
        data.webAPIContainers.push(path.node);
      }
    },
  });
  res.send(data);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
