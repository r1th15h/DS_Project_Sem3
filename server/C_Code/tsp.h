#ifndef TSP_H
#define TSP_H

#include "graph.h"

#define INF 1000000000

void dijkstra(Graph *g, int src, int *dist, int *parent);
void tspSolve(Graph *g, int *reqNodes, int N);

#endif
