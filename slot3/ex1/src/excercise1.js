
//double
const double = (x) => x * 2; // arrow function
console.log(double(7)); // 14
//cách viết khác
function double2(x) { // function declaration
    return x * 2;
}
console.log(double2(7)); // 14

//isEven
const isEven = (n) => {return n % 2 === 0 && n % 5 === 0;}; // arrow function with block body
console.log(isEven(10));
//cách viết khác

function isEven2(n) { // function declaration
    return n % 2 === 0;
}
console.log(isEven2(10));
