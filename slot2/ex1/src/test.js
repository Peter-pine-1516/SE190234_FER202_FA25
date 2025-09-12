const result = (a, b) => a + b;
console.log(result(1, 2));
module.exports = result;

let square = (num) => num * num;
console.log(square(5));
console.log(square(8));


let greet = (name, timeOfDay) => {
  console.log(`Good ${timeOfDay}, ${name}!`);
};
greet("Bob", "morning");
greet("Charlie", "evening");


let sayHi = () => {
    console.log("Anonaseyooooo!!!");
};
sayHi();

let person = {
  name: "HongPhuc",
  age: 20,
  greet: function () {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`);
  },
};
person.greet();


