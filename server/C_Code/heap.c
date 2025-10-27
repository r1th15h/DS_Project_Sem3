#include <stdlib.h>
#include "heap.h"

static void swap(Node *a, Node *b) {
    Node t = *a; *a = *b; *b = t;
}

MinHeap* createHeap(int cap, int V) {
    MinHeap *h = malloc(sizeof(MinHeap));
    h->arr = malloc(sizeof(Node) * cap);
    h->size = 0;
    h->cap = cap;
    h->pos = malloc(sizeof(int) * V);
    return h;
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

void freeHeap(MinHeap *h) {
    free(h->arr);
    free(h->pos);
    free(h);
}
