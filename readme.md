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
gcc tsp.c -o tsp_executable
```
4. Start The Backend Server

```bash
cd server
node server.js
```
5. For Frontend

```bash
npm install -g http-server
# In Root Directory
http-server
```