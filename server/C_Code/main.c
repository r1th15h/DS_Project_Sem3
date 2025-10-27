#include <stdio.h>
#include <stdlib.h>
#include "graph.h"
#include "tsp.h"

int main() {
    int V,E;
    scanf("%d %d", &V, &E);
    Graph *g = createGraph(V);
    for (int i=0;i<E;i++) {
        int u,v,w;
        scanf("%d %d %d", &u,&v,&w);
        addEdge(g,u,v,w);
    }
    int N;
    scanf("%d", &N);
    int *reqNodes = malloc(sizeof(int)*N);
    for (int i=0;i<N;i++) scanf("%d", &reqNodes[i]);
    tspSolve(g, reqNodes, N);
    return 0;
}
