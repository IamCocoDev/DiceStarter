
function sumDeepArray(array) {
    let acc = 0;
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])){
            acc += sumDeepArray(array[i]);
        } else {
            acc += array[i];
        }
    }
    return acc;
}
sumDeepArray([1, 2, 3])
sumDeepArray([13, [11, [13],], 3]);

/*1 = 6
2 = 40

si mi elemento es un array */