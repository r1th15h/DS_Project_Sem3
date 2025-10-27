#ifndef HEAP_H
#define HEAP_H

typedef struct {
    int v, dist;
} Node;

typedef struct {
    Node *arr;
    int size;
    int cap;
    int *pos;
} MinHeap;

MinHeap* createHeap(int cap, int V);
void heapify(MinHeap *h, int i);
Node extractMin(MinHeap *h);
void decreaseKey(MinHeap *h, int v, int dist);
int isInHeap(MinHeap *h, int v);
void freeHeap(MinHeap *h);

#endif
