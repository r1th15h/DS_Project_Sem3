# Path Optimizer for Multi-Point Coverage

A web-based tool to compute and visualize the **Modified Travelling Salesman Problem (TSP)**. Unlike traditional TSP, this system allows revisiting nodes or edges to reach the destination with minimal cost.

---

## Features

- Interactive graph interface for selecting nodes.
- Computes the optimal traversal path using a **C-based TSP algorithm**.
- Visualizes both compressed (selected nodes) and expanded (full traversal) paths.
- Highlights the optimal path on the graph dynamically.
- Flexible traversal, allowing revisiting nodes or edges if beneficial.

---

## Project Structure

- **Frontend:** HTML, CSS, JavaScript using **vis.js** for graph visualization.
- **Backend:** Node.js + Express.js server to handle requests and execute the C program.
- **Algorithm:** C program that calculates shortest paths using **Dijkstra’s algorithm** and solves the modified TSP using recursive backtracking.

---

## Setup Instructions

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/r1th15h/DS_Project_Sem3.git
cd DS_Project_Sem3
```
2. Install Dependencies

```bash
npm install
```
3. Compile the C program (if not already compiled):

```bash
cd server
make
```
4. Start The Backend Server

```bash
cd server
node server.js
```
5. For Frontend
* Start The **index.html** with any live server
* **Make Sure To Disable Auto Reload Of Live Server To Prevent Refreshing**

## How to Use In Web Browser

1. Open the frontend in your browser (Using live server).
2. The graph will be displayed.
3. Click on the desired nodes to visit to select them (node 0 is the starting point and cannot be deselected).
4. Click **Submit** to compute the optimal path.
5. The path will be highlighted on the graph along with the total cost.
6. The Content Of Output Will Be Displayed Below The Submit Button.

## How to Use Only The C Code

```bash
#From the Root Directory
cd server
make
./tsp_executable
#And Then Give Your Desired Inputs
```
### Input Type For C Code

1. First Line Takes the input of Number of Nodes (n) And Edges (e) present in the graph 
2. The consecutive 'e' line Take the input of the connecting edges (source destination edgeWeight)
3. After Complete Graph Data, Enter the number of Nodes to be visted
4. The next line should contain the input of nodes that is to be visited
5. **You Can Take The Example Graph From graph.txt in server folder and then continue the input from Step 3**