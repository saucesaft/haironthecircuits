## Eduardo Hernández Valdez A01285233

## 1 - Responde a qué término o concepto se refiere cada inciso siguiente:
**a) Se dice cuando el número de valores posibles es un número finito o que “puede contarse”.**
Cuantitativo

**b) Es cuando se subdivide a la población en subgrupos, de manera que los sujetos que pertenecen al mismo subgrupo comparten las mismas características (como el género o la categoría de edad), y luego obtenemos una muestra de cada subgrupo.**
Muestreo Aleatorio estratificado

**c) Ocurre cuando se elige algún punto de partida y luego por ende a seleccionarse a cada k-ésimo elemento en la población.**
Muestreo Aleatorio Sistemático

**d) Es un tipo de muestro donde todos los elementos de la población, tienen la misma probabilidad de ser seleccionados**
Muestreo Aleatorio Simple

**e) Son aquellas que se dividen en diferentes categorías que se distinguen por algunas características no numéricas (no se pueden contar).**
Cualitativa

**f) Es el conjunto completo de todos los elementos (puntuaciones, personas, medidas, etcétera) que se va estudiar.**
Población

**g) Es un subconjunto de miembros seleccionados de una población.**
Muestra

**h) Es una medición numérica que describe algunas características de una población.**
Parametro

**i) Es un conjunto de métodos para planear estudios y experimentos, obtener datos y luego organizar, resumir, presentar, analizar, interpretar y llegar a conclusiones basadas en los datos.**
Estadística

**j) Resulta al dividir el área de la población en secciones y luego seleccionar (aleatoriamente) a una(s) de éstas, para finalmente obtener datos de todos sus elementos**
Muestreo por conglomerados

## 2 - Función leeVector
```matlab
function [vx, vy] = leeVector(Archivo)
    mat = readmatrix(Archivo);

    dimensiones = size(mat);

    if dimensiones(1) == 2 % checar filas
        vx = mat(1, :);
        vy = mat(2, :);

    elseif dimensiones(2) == 2 % checar columnas
        vx = mat(:, 1);
        vy = mat(:, 2);
    end
end
```

## 3 - Función ajusteLinea
```matlab
function [m, b] = ajusteLinea(VecX, VecY)
    nx = numel(VecX);

  
    sumx = sum(VecX);
    sumx2 = sum(VecX.^2);
    sumy = sum(VecY);
    sumxy = sum(VecX.*VecY);

    m = (sumxy - (sumx * sumy/nx)) / (sumx2 - ( (sumx^2) / nx ));
    b = (sumy / nx) - (m * (sumx / nx));
end
```

## 4 - Recta Puntos Inciso 4
**y = -0.838211x + 11.599117**

```matlab
vx = [5, 1, 12, 6, 4, 3, 11, 9, 3, 2, 10, 7];
vy = [4, 10, 2, 6, 7, 9, 3, 6, 13, 11, 2, 5];

scatter(vx, vy);
hold on;

[m, b] = ajusteLinea(vx, vy);
fplot(@(x) m*x + b);
title(sprintf('y = %fx + %f', m, b))
```

![[Pasted image 20230607134859.png]]


## 5- Recta PuntosAct3.csv
**y = 0.348563x + 1.586610**

```matlab
[vx, vy] = leeVector("PuntosAct3.csv");

scatter(vx, vy);
hold on;

[m, b] = ajusteLinea(vx, vy);
fplot(@(x) m*x + b);
title(sprintf('y = %fx + %f', m, b))
```

![[Pasted image 20230607135010.png]]
