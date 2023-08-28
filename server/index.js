const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const traverse = require("@babel/traverse").default;
const app = express();

const snapshots = [
  [
    {
      renderType: "callStack",
      data: [],
    },
    {
      renderType: "webAPI",
      data: [],
    },
    {
      renderType: "callbackQueue",
      data: [],
    },
  ],
];

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

        for (let i = 0; i < snapshots.length; i++) {
          const callStackSnapshot = snapshots[i].find(
            (snapshot) => snapshot.renderType === "callStack"
          );

          if (callStackSnapshot && callStackSnapshot.data.length < 1) {
            callStackSnapshot.data.push(nodeData);
          } else {
            snapshots.push([
              {
                renderType: "callStack",
                data: [],
              },
              {
                renderType: "webAPI",
                data: [],
              },
              {
                renderType: "callbackQueue",
                data: [],
              },
            ]);
          }
        }
      }
    },
    VariableDeclaration(path) {
      if (path.node.type === "VariableDeclaration") {
      }
    },
    CallExpression(path) {
      const { callee } = path.node;
      if (callee.type === "Identifier" && callee.name === "setTimeout") {
        for (let i = 0; i < snapshots.length; i++) {
          const callStackSnapshot = snapshots[i].find(
            (snapshot) => snapshot.renderType === "webAPI"
          );

          if (callStackSnapshot && callStackSnapshot.data.length < 1) {
            callStackSnapshot.data.push(path.node);
          } else {
            snapshots.push([
              {
                renderType: "callStack",
                data: [],
              },
              {
                renderType: "webAPI",
                data: [],
              },
              {
                renderType: "callbackQueue",
                data: [],
              },
            ]);
          }
        }
      }
    },
  });
  res.send(snapshots);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
