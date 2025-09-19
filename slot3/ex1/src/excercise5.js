const people = [
  { name: "Ann", age: 19 },
  { name: "Bob", age: 22 },
  { name: "Tom", age: 15 },
  { name: "Sue", age: 13 },
  { name: "Jane", age: 12 }
];


const teenCount = people.filter( p => p.age >= 13 && p.age <= 19 ).length;
console.log(`có ${teenCount} người tuổi teen`); // 3

// let isTeen = person => person.age >= 13 && person.age <= 19;
// const teens = people.filter(isTeen);
// const teenlength = teens.length;
// const te
// console.log(`có ${teenlength} người tuổi teen`); // 3



// const teen = people
//     .filter(person => person.age >= 13 && person.age <= 19)
//     .sort((a, b) => a.age - b.age)
//     .map(person => `${person.name} có ${person.age} tuổi`);
    
// teen.forEach(str => console.log(str));
// console.log(teens);
