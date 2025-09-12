//1 tạo ra 1 mảng số nguyên -> duyệt qua mảng bằng for / forEach / map -> in ra màn hình
//2 lọc ra các phần từ chẳn / filter
//3 tạo 1 mảng people là list các person id, name, age. Duyệt qua mảng -> in ra danh sách với 3 tham số kia -> rồi lọc qua ds và in ra những người có age > 25 và tính tổng tuổi của nhóm người trong danh sách

//1 tạo ra 1 mảng số nguyên -> duyệt qua mảng bằng for / forEach / map -> in ra màn hình
// Bài 1: Tạo mảng số nguyên và duyệt qua mảng
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("Duyệt mảng bằng for (in cùng dòng):");
for (let i = 0; i < array.length; i++) {
  process.stdout.write(array[i] + " ");
}
console.log(); // Xuống dòng sau khi in xong

console.log("Duyệt mảng bằng forEach:");
array.forEach(item => process.stdout.write(item + " "));
console.log();

console.log("Duyệt mảng bằng map:");
array.map(item => process.stdout.write(item + " "));
console.log();
// Bài 2: Lọc ra các phần tử chẵn
const evenNumbers = array.filter(item => item % 2 === 0);
console.log("Các số chẵn trong mảng:", evenNumbers);

// Bài 3: Làm việc với mảng đối tượng people
const people = [
  { id: 1, name: "Alice", age: 20 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 28 },
  { id: 4, name: "David", age: 22 }
];

console.log("Danh sách people:");
people.forEach(person => 
  console.log(`ID: ${person.id}, Name: ${person.name}, Age: ${person.age}`)
);

const over25 = people.filter(person => person.age > 25);
console.log("Những người có tuổi > 25:", over25);

const totalAge = people.reduce((sum, person) => sum + person.age, 0);
console.log("Tổng tuổi của tất cả mọi người:", totalAge);