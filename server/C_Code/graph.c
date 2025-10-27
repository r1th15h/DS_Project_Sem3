#include <stdio.h>
#include <stdlib.h>
#include "graph.h"

Graph* createGraph(int V) {
    Graph *g = malloc(sizeof(Graph));
    g->V = V;
    g->adj = calloc(V, sizeof(Edge*));
    return g;
}

void addEdge(Graph *g, int u, int v, int w) {
    Edge *e1 = malloc(sizeof(Edge));
    e1->v = v; e1->w = w; e1->next = g->adj[u];
    g->adj[u] = e1;

    Edge *e2 = malloc(sizeof(Edge));
    e2->v = u; e2->w = w; e2->next = g->adj[v];
    g->adj[v] = e2; // undirected
}
