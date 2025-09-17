const people = [
  { name: "Ann", age: 19 },
  { name: "Bob", age: 22 },
  { name: "Tom", age: 15 },
  { name: "Sue", age: 13 },
  { name: "Jane", age: 12 }
];
const teen = people
    .filter(person => person.age >= 13 && person.age <= 19)
    .map(person => `${person.name} (${person.age})`);

teen.forEach(str => console.log(str));
