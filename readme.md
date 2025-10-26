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
git clone <repository-url>
cd <repository-folder>
