function Excercise3() {
  const person = {
    name: "Costos",
    address: {
      street: "LalaLand 12",
    },
  };

  // Destructuring với default value cho city
  const {
    address: { street, city = "Unknown City" },
  } = person;

  return (
    <div>
      <h2>Excercise3</h2>
      <p>Name: {person.name}</p>
      <p>Street: {street}</p>
      <p>City: {city}</p>
    </div>
  );
}

export default Excercise3;
