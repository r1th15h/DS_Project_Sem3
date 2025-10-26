import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

app.post("/run-tsp", (req, res) => {
  const { numNodes, labels } = req.body;

  try {
    const graphContent = fs.readFileSync("graph.txt", "utf8").trim();
    const inputData = `${graphContent}\n${numNodes}\n${labels.join(" ")}\n`;
    fs.writeFileSync("input.txt",inputData);

    const tspProcess = spawn("./tsp_executable");

    fs.createReadStream("input.txt").pipe(tspProcess.stdin);

    let output = "";
    let error = "";

    tspProcess.stdout.on("data", (data) => (output += data.toString()));
    tspProcess.stderr.on("data", (data) => (error += data.toString()));

    tspProcess.on("close", (code) => {
      if (code !== 0) {
        console.error("C program failed:", error);
        return res.status(500).json({ error });
      }

      const lines = output.trim().split("\n").map((l) => l.trim());

      let cost = null;
      let compressed = [];
      let expanded = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith("Optimal open-path cost:")) {
          cost = parseInt(line.split(":")[1].trim());
        } 
        else if (line.startsWith("Order of required nodes visited")) {
          if (i + 1 < lines.length) {
            compressed = lines[i + 1]
              .split("->")
              .map((x) => parseInt(x.trim()))
              .filter((x) => !isNaN(x));
          }
        } 
        else if (line.startsWith("Expanded full path")) {
          if (i + 1 < lines.length) {
            expanded = lines[i + 1]
              .split("->")
              .map((x) => parseInt(x.trim()))
              .filter((x) => !isNaN(x));
          }
        }
      }
      res.json({cost,compressedOrder: compressed,expandedPath: expanded,});
    });
  } 
  catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8000, () => console.log("Backend running on port 8000"));
