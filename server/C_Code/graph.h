#ifndef GRAPH_H
#define GRAPH_H

typedef struct Edge {
    int v;
    int w;
    struct Edge *next;
} Edge;

typedef struct {
    Edge **adj;
    int V;
} Graph;

Graph* createGraph(int V);
void addEdge(Graph *g, int u, int v, int w);

#endif
