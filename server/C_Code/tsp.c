#include <stdio.h>
#include <stdlib.h>
#include "tsp.h"
#include "heap.h"

static int **tspCost;
static int *bestPath;
static int *curPath;
static int bestCost;
static int N;
static int *reqNodes;

void dijkstra(Graph *g, int src, int *dist, int *parent) {
    int V = g->V;
    for (int i = 0; i < V; i++) {
        dist[i] = INF;
        parent[i] = -1;
    }

    MinHeap *h = createHeap(V, V);
    for (int v = 0; v < V; v++) {
        h->arr[v].v = v;
        h->arr[v].dist = INF;
        h->pos[v] = v;
    }
    h->size = V;
    h->arr[src].dist = 0;
    dist[src] = 0;
    decreaseKey(h, src, 0);

    while (h->size > 0) {
        Node min = extractMin(h);
        int u = min.v;
        for (Edge *e = g->adj[u]; e; e = e->next) {
            int v = e->v, w = e->w;
            if (isInHeap(h,v) && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                parent[v] = u;
                decreaseKey(h, v, dist[v]);
            }
        }
    }
    freeHeap(h);
}

static void tspRec(int level, int cost, int mask, int last) {
    if (cost >= bestCost) return;
    if (level == N) {
        bestCost = cost;
        for (int i = 0; i < N; i++) bestPath[i] = curPath[i];
        return;
    }
    for (int i = 0; i < N; i++) {
        if (!(mask & (1<<i))) {
            int next = i;
            int c = tspCost[last][next];
            if (c < INF) {
                curPath[level] = next;
                tspRec(level+1, cost+c, mask|(1<<next), next);
            }
        }
    }
}

static void reconstructPath(int *parent, int u, int v) {
    if (u == v) {
        printf("%d", u);
        return;
    }
    if (parent[v] == -1) {
        printf("no path");
        return;
    }
    reconstructPath(parent, u, parent[v]);
    printf(" -> %d", v);
}

void tspSolve(Graph *g, int *req, int n) {
    N = n;
    reqNodes = req;
    bestCost = INF;
    tspCost = malloc(sizeof(int*)*N);
    int **parents = malloc(sizeof(int*)*N);
    int **distAll = malloc(sizeof(int*)*N);
    for (int i = 0; i < N; i++) {
        tspCost[i] = malloc(sizeof(int)*N);
        parents[i] = malloc(sizeof(int)*g->V);
        distAll[i] = malloc(sizeof(int)*g->V);
        dijkstra(g, reqNodes[i], distAll[i], parents[i]);
    }
    for (int i=0;i<N;i++)
        for (int j=0;j<N;j++)
            tspCost[i][j] = (i==j)? INF : distAll[i][reqNodes[j]];

    bestPath = malloc(sizeof(int)*N);
    curPath = malloc(sizeof(int)*N);
    curPath[0] = 0;
    tspRec(1, 0, 1, 0);

    printf("Optimal open-path cost: %d\n", bestCost);
    printf("Order of required nodes visited:\n");
    for (int i=0;i<N;i++)
        printf("%d%s", reqNodes[bestPath[i]], i==N-1?"\n":" -> ");

    printf("Expanded full path:\n");
    for (int i=0;i<N-1;i++) {
        int u = reqNodes[bestPath[i]];
        int v = reqNodes[bestPath[i+1]];
        if (i == 0) {
            reconstructPath(parents[bestPath[i]], u, v);
        } else {
            int stack[g->V], top = 0;
            int cur = v;
            while (cur != -1 && cur != u) {
                stack[top++] = cur;
                cur = parents[bestPath[i]][cur];
            }
            for (int j = top-1; j >= 0; j--) printf(" -> %d", stack[j]);
        }
    }
    printf("\n");
}
