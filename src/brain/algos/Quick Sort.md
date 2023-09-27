- Divide el arreglo en 2 particiones, una que contiene a los elementos menores a un elemento pivote, y otra que contiene a los elementos mayores al pivote.
- Se ordenan ambas particiones, y automáticamente se tiene todo el arreglo ordenado.
- La elección del elemento pivote es libre (por facilidad, se toma el primer elemento del arreglo).

### Complejidades
- Pero caso $O(n^2)$
- Caso promedio $O(n log n)$