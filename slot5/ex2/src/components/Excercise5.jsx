function Excercise5() {
  const people = [
    { name: "Ann", age: 19 },
    { name: "Bob", age: 22 },
    { name: "Tom", age: 15 },
    { name: "Sue", age: 13 },
    { name: "Jane", age: 12 },
  ];

  // lọc tuổi từ 13 -> 19
  const teen = people
    .filter((person) => person.age >= 13 && person.age <= 19)
    .map((person) => `${person.name} (${person.age})`);

  return (
    <div>
      <h2>Excercise5 - Danh sách teen lọc (13-19)</h2>
      <p>
        Danh sách people: {people.map((p) => `${p.name} (${p.age})`).join(", ")}
      </p>

      <ul>
        {teen.map((str, index) => (
          <li key={index}>{str}</li>
        ))}
      </ul>
    </div>
  );
}

export default Excercise5;
