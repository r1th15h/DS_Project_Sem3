import { DataSet, Network } from "https://unpkg.com/vis-network@9.1.2/dist/vis-network.esm.min.js";

const nodes = [];
const rows = 5;
const cols = 10;
const spacingX = 100;
const spacingY = 100;
const output = document.getElementById("output");

nodes.push({
  id: 0,
  label: "0",
  x: 0,
  y: 200,
  fixed: true,
  shape: 'circle',
  color: {
    border: 'orange',   
    background: 'orange', 
  },
  borderWidth: 2,
})

for (let i = 0; i < 50; i++) {
  nodes.push({
    id: i + 1,
    label: `${i + 1}`,
    x: (i % cols) * spacingX + 100,
    y: Math.floor(i / cols) * spacingY,
    fixed: true,
    shape: 'circle',
    color: {
      border: 'red',   
      background: '#12ffdfb5', 
    },
    borderWidth: 2,
  });
}

const edges = [
  { id: 'e0-11', from: 0, to: 11, label: '13', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e0-21', from: 0, to: 21, label: '6', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e0-31', from: 0, to: 31, label: '17', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e1-2', from: 1, to: 2, label: '2', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e1-11', from: 1, to: 11, label: '10', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e2-3', from: 2, to: 3, label: '8', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e2-12', from: 2, to: 12, label: '1', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e3-4', from: 3, to: 4, label: '14', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e3-13', from: 3, to: 13, label: '19', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e4-5', from: 4, to: 5, label: '4', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e4-15', from: 4, to: 15, label: '6', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e13-14', from: 13, to: 14, label: '12', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e11-12', from: 11, to: 12, label: '9', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e12-13', from: 12, to: 13, label: '18', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e14-15', from: 14, to: 15, label: '5', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e5-15', from: 5, to: 15, label: '19', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e15-16', from: 15, to: 16, label: '8', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e5-6', from: 5, to: 6, label: '7', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e6-7', from: 6, to: 7, label: '3', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e16-17', from: 16, to: 17, label: '11', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e7-17', from: 7, to: 17, label: '0', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e7-8', from: 7, to: 8, label: '9', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e17-18', from: 17, to: 18, label: '2', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e18-19', from: 18, to: 19, label: '19', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e8-9', from: 8, to: 9, label: '1', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e9-10', from: 9, to: 10, label: '16', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e9-20', from: 9, to: 20, label: '10', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e19-30', from: 19, to: 30, label: '4', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e30-29', from: 30, to: 29, label: '5', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e30-40', from: 30, to: 40, label: '17', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e40-39', from: 40, to: 39, label: '11', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e39-38', from: 39, to: 38, label: '20', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e39-28', from: 39, to: 28, label: '8', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e28-29', from: 28, to: 29, label: '3', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e28-38', from: 28, to: 38, label: '15', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e28-18', from: 28, to: 18, label: '12', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e38-49', from: 38, to: 49, label: '19', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e49-50', from: 49, to: 50, label: '7', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e48-49', from: 48, to: 49, label: '6', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e38-48', from: 38, to: 48, label: '14', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e27-28', from: 27, to: 28, label: '5', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e37-38', from: 37, to: 38, label: '1', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e47-48', from: 47, to: 48, label: '8', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e46-47', from: 46, to: 47, label: '10', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e36-37', from: 36, to: 37, label: '2', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e36-46', from: 36, to: 46, label: '18', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e27-37', from: 27, to: 37, label: '17', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e26-27', from: 26, to: 27, label: '11', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e26-36', from: 26, to: 36, label: '5', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e26-25', from: 26, to: 25, label: '14', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e25-36', from: 25, to: 36, label: '19', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e35-36', from: 35, to: 36, label: '4', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e35-45', from: 35, to: 45, label: '9', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e45-46', from: 45, to: 46, label: '15', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e16-26', from: 16, to: 26, label: '6', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e15-25', from: 15, to: 25, label: '2', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e14-24', from: 14, to: 24, label: '18', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e24-34', from: 24, to: 34, label: '0', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e23-24', from: 23, to: 24, label: '19', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e34-35', from: 34, to: 35, label: '7', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e24-25', from: 24, to: 25, label: '3', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e34-44', from: 34, to: 44, label: '20', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e33-44', from: 33, to: 44, label: '1', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e33-43', from: 33, to: 43, label: '13', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e33-34', from: 33, to: 34, label: '5', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e43-44', from: 43, to: 44, label: '4', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e44-45', from: 44, to: 45, label: '8', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e31-41', from: 31, to: 41, label: '6', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e41-42', from: 41, to: 42, label: '10', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e42-43', from: 42, to: 43, label: '2', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e32-43', from: 32, to: 43, label: '9', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e22-32', from: 22, to: 32, label: '4', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e21-22', from: 21, to: 22, label: '1', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e12-22', from: 12, to: 22, label: '7', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e22-23', from: 22, to: 23, label: '5', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e13-23', from: 13, to: 23, label: '12', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e32-33', from: 32, to: 33, label: '11', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } },
  { id: 'e31-32', from: 31, to: 32, label: '16', width: 3, color: 'red', font: { color: 'white', size: 14, face: 'Arial' } }
];


const container = document.getElementById('graph-container');
const nodesData = new DataSet(nodes);
const edgesData = new DataSet(edges);

const network = new Network(container, { nodes: nodesData, edges: edgesData }, {
  physics: false,
  interaction: {
    zoomView: false,      
    dragView: true,      
    dragNodes: false, 
  }
});

let selectedNodes = [0];
let outputNodes = [];

network.on("click", params => {
  if (params.nodes.length){
    const nodeId = params.nodes[0];

    if (nodeId === 0) return;

    if (!selectedNodes.includes(nodeId)) {
      selectedNodes.push(nodeId);
      nodesData.update({ 
        id: nodeId, 
        color: { 
          border: 'orange',   
          background: 'orange',
          highlight: { border: 'orange', background: 'orange' }
        },
      });
    } 

    else{
      selectedNodes = selectedNodes.filter(n => n !== nodeId);
      nodesData.update({ 
        id: nodeId, 
        color: { 
          border: 'red',
          background: '#12ffdfb5' 
        } 
      });
    }
  }
});

document.getElementById('submitBtn').addEventListener('click', (e) => {
  e.preventDefault();
  outputNodes = [];
  const payload = {
    numNodes: selectedNodes.length,   
    labels: selectedNodes         
  };

  fetch("http://localhost:8000/run-tsp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(res => res.json())
    .then(data => {
      outputNodes = data.expandedPath;
      const lines = data.raw.split('\n');
      output.innerHTML = `${lines.map(line => `<li class="lines">${line}</li>`).join('')}`;
      highlightPath(outputNodes);
    }); 
});

function highlightPath(path) {
  for (let i = 0; i < path.length - 1; i++) {
    const edgeId = `e${path[i]}-${path[i+1]}`;
    const edgeRevId = `e${path[i+1]}-${path[i]}`;
    if (edgesData.get(edgeId)) edgesData.update({ id: edgeId, color: '#00ff0dff', width: 3 });
    else if (edgesData.get(edgeRevId)) edgesData.update({ id: edgeRevId, color: '#00ff0dff', width: 3 });
  }
}
