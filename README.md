# amarillo
treemapping!

https://dactyrafficle.github.io/amarillo/


makeBoxes
1. makeBoxes(0, 0, w, h, array_of_objects)
2. if array > 1? if so, SPLIT into 2, else return object with coordinates and dimensions
3. is h > w? get dimensions for recursive bit
4. makeBoxes(x1,y1,w1,h1,arr1) and makeBoxes(x2,y2,w2,h2,arr2)

need to store all the returns of makeBoxes and its recursive children

and improve SPLIT -> maybe 1. random split ie. n/2 elements per list
or what im using now, n_ where value > some percentage in one box, else in next box
