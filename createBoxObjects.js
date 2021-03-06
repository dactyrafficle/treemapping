
// 2021-03-24 LETS TRY ONLY MAKING THE SUBBOXES

function createBoxObjects(x, y, w, h, arr) {

 let key = "value";

 let thresh = 0.2;
 let output = [];

 if (arr.length > 1) {
 
  // SPLIT THE ARRAY INTO 2
  let arr2 = splitArr(arr, key, thresh);
  let sum = getSum(arr, key);
  let sum0 = getSum(arr2[0], key);

  // DIMENSION OF BOXES
  let dw = 0;
  let dh = 0;
  if (w > h) {dw=1; dh=0;} else {dw=0; dh=1;}

  let x1 = x;
  let x2 = x1 + dw*(sum0/sum)*w;
  let y1 = y;
  let y2 = y1 + dh*(sum0/sum)*h;
  let w1 = dw*(sum0/sum)*w + dh*w;
  let w2 = dw*(w-w1) + dh*w;
  let h1 = dw*h + dh*(sum0/sum)*h;
  let h2 = dw*h + dh*(h-h1);

  // THIS WAS NOT THAT EASY TO FIGURE OUT
  return output.concat(createBoxObjects(x1, y1, w1, h1, arr2[0]), createBoxObjects(x2, y2, w2, h2, arr2[1]));
    
 } else {
    
   // IF ARR.LENGTH === 1, THEN WE MIGHT BE ABLE TO MAKE BOXES
   let obj = arr[0]; // correct
   obj.px = x;
   obj.py = y;
   obj.sw = w;
   obj.sh = h;
   
  // IF THE OBJECT HAS CHILDREN
  if (obj.children) {
   return output.concat(createBoxObjects(x, y, w, h, obj.children));
  } else {
   return output.concat(obj);     
  }
 }
}

// CALCULATE SUM ON THE BASIS OF KEY
function getSum(arr, key) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += parseInt(arr[i][key]);
  }

  return sum;
}

// SPLIT THE ARRAY INTO 2 ARRAYS ON THE BASIS OF THE SUM OF KEY
// ARR IS AN ARRAY OF OBJECTS
function splitArr(arr, key, thresh_pct) {
  
  // IF THE ARRAY HAS 1 ELEMENT, RETURN THE ARRAY
  if (arr.length < 2) {
    return arr;
  }
  
  // SORT THE ARRAY, BIGGEST TO SMALLEST
  arr.sort(function(a,b) {
    if (parseInt(a[key]) > parseInt(b[key])) {return -1;};
    if (parseInt(a[key]) < parseInt(b[key])) {return 1;};
    if (parseInt(a[key]) === parseInt(b[key])) {return 0;};
  });
    
  let temp = [[],[]];
  
  let sum = getSum(arr, key);
  let sum0 = 0;

 // THE FIRST VALUE GOES IN THE FIRST ARRAY BY DEFAULT
 temp[0].push(arr[0]);
 sum0 = parseInt(arr[0][key]);
 sum0_pct = sum0 / sum;

 for (let i = 1; i < arr.length; i++) {
  
  // THE LAST ELEMENT OF ARR ALWAYS GOES TO THE SECOND ARRAY
  if (sum0_pct < thresh_pct && i !== (arr.length-1)) {
   temp[0].push(arr[i]);
   sum0 += parseInt(arr[i][key]);
   sum0_pct = sum0 / sum;
  } else {
   temp[1].push(arr[i]);
  } 
 }

 return temp;
}