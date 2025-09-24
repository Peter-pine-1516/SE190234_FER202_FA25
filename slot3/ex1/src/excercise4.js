const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

const [first, , third = 0, ...restAges] = ages;

const isEven = (n) => n % 2 === 0;

// Hàm lọc ra số chẵn từ một mảng
restAges.filter(isEven);
console.log("first:", first);                // 33
console.log("third:", third);                // 20
console.log("restAges:", restAges);          // [16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32]
console.log(restAges.filter(isEven));
// [16, 54, 44, 64, 32]

//nếu ghi console.log(second) sẽ bị lỗi vì không có biến second