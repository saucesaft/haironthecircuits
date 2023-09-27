- Divide el arreglo en 2 subarreglos
- Se ordenan ambos subarreglos
- Se forma el arreglo ordenado, considerando que se tienen 2 subarreglos ya ordenados

```c++
void MergeSort (inicio, fin) {

	mitad = (inicio+fin) / 2;

	MergeSort(inicio, mitad);
	MergeSort(mitad+1, fin);
	Unir(inicio, mitad, fin);

}

void Unir(inicio, mitad, fin) {
	i = inicio;
	j = mitad + 1;
	k = inicio;
	while ( i <= mitad; ) && (i <= fin) {
		if (arreglo[i] < arreglo[j] ) {
			aux[k] = arreglo[i];
			i = i + 1;
		} else {
			aux[k] = arreglo[j];
			j = j + 1;
		}
		k = k + 1;
	}

	if ( i>mitad ) {
		// Mover elementos j a fin del arreglo aux de k a fin;
	} else {
		// Mover elementos i a mitad del arreglo al arreglo aux de k a fin;
	}
	// Copiar aux a arreglo;
}
```