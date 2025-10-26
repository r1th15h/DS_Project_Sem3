#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

#define INF 1000000000

typedef struct Edge {
    int v;
    int w;
    struct Edge *next;
} Edge;

typedef struct {
    Edge **adj;
    int V;
} Graph;

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
    g->adj[v] = e2; 
}

typedef struct {
    int v, dist;
} Node;

typedef struct {
    Node *arr;
    int size;
    int cap;
    int *pos;

} MinHeap;

MinHeap* createHeap(int cap, int V) {
    MinHeap *h = malloc(sizeof(MinHeap));
    h->arr = malloc(sizeof(Node) * cap);
    h->size = 0;
    h->cap = cap;
    h->pos = malloc(sizeof(int) * V);
    return h;
}

void swap(Node *a, Node *b) {
    Node t = *a; *a = *b; *b = t;
}

void heapify(MinHeap *h, int i) {
    int smallest = i;
    int l = 2*i+1, r = 2*i+2;
    if (l < h->size && h->arr[l].dist < h->arr[smallest].dist) smallest = l;
    if (r < h->size && h->arr[r].dist < h->arr[smallest].dist) smallest = r;
    if (smallest != i) {
        h->pos[h->arr[i].v] = smallest;
        h->pos[h->arr[smallest].v] = i;
        swap(&h->arr[i], &h->arr[smallest]);
        heapify(h, smallest);
    }
}

Node extractMin(MinHeap *h) {
    Node root = h->arr[0];
    h->arr[0] = h->arr[h->size-1];
    h->pos[h->arr[0].v] = 0;
    h->size--;
    heapify(h,0);
    return root;
}

void decreaseKey(MinHeap *h, int v, int dist) {
    int i = h->pos[v];
    h->arr[i].dist = dist;
    while (i && h->arr[i].dist < h->arr[(i-1)/2].dist) {
        h->pos[h->arr[i].v] = (i-1)/2;
        h->pos[h->arr[(i-1)/2].v] = i;
        swap(&h->arr[i], &h->arr[(i-1)/2]);
        i = (i-1)/2;
    }
}

int isInHeap(MinHeap *h, int v) {
    return h->pos[v] < h->size;
}

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
    h->pos[src] = src;
    dist[src] = 0;
    decreaseKey(h, src, 0);

    while (h->size > 0) {
        Node min = extractMin(h);
        int u = min.v;
        Edge *e = g->adj[u];
        while (e) {
            int v = e->v, w = e->w;
            if (isInHeap(h,v) && dist[u] != INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                parent[v] = u;
                decreaseKey(h, v, dist[v]);
            }
            e = e->next;
        }
    }
    free(h->arr);
    free(h->pos);
    free(h);
}

int N;
int *reqNodes;
int **tspCost;
int bestCost = INF;
int *bestPath;
int *curPath;

void tspRec(int level, int cost, int mask, int last) {
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

void reconstructPath(int *parent, int u, int v) {
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

int main() {
    int V,E;
    scanf("%d %d", &V, &E);
    Graph *g = createGraph(V);
    for (int i=0;i<E;i++) {
        int u,v,w;
        scanf("%d %d %d", &u,&v,&w);
        addEdge(g,u,v,w);
    }
    scanf("%d", &N);
    reqNodes = malloc(sizeof(int)*N);
    for (int i=0;i<N;i++) scanf("%d", &reqNodes[i]);
    tspCost = malloc(sizeof(int*)*N);
    for (int i=0;i<N;i++) tspCost[i] = malloc(sizeof(int)*N);

    int **parents = malloc(sizeof(int*)*N);
    int **distAll = malloc(sizeof(int*)*N);
    for (int i=0;i<N;i++) {
        parents[i] = malloc(sizeof(int)*V);
        distAll[i] = malloc(sizeof(int)*V);
        dijkstra(g, reqNodes[i], distAll[i], parents[i]);
    }

    for (int i=0;i<N;i++)
        for (int j=0;j<N;j++)
            tspCost[i][j] = (i==j)? INF : distAll[i][reqNodes[j]];

    bestPath = malloc(sizeof(int)*N);
    curPath = malloc(sizeof(int)*N);

    curPath[0] = 0;
    tspRec(1,0,1,0);

    printf("Optimal open-path cost: %d\n", bestCost);
    printf("Order of required nodes visited (compressed):\n");
    for (int i=0;i<N;i++) printf("%d%s", reqNodes[bestPath[i]], i==N-1?"\n":" -> ");

    printf("Expanded full path in original graph nodes:\n");
    for (int i=0;i<N-1;i++) {
        int u = reqNodes[bestPath[i]];
        int v = reqNodes[bestPath[i+1]];
        if (i == 0) {
            // Print full first path
            reconstructPath(parents[bestPath[i]], u, v);
        } else {
            // Skip the starting node (already printed)
            int stack[V], top = 0;
            int cur = v;
            while (cur != -1 && cur != u) {
                stack[top++] = cur;
                cur = parents[bestPath[i]][cur];
            }
            for (int j = top-1; j >= 0; j--) {
                printf(" -> %d", stack[j]);
            }
        }
    }
    printf("\n");
    return 0;
}