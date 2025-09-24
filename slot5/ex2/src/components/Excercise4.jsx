function Excercise4() {
  const ages = [33, 12, 20, 16];

  // destructuring như đề
  const [first, , third = 0, ...restAges] = ages;

  return (
    <div>
      <h2>Excercise4</h2>
      <p>Ages: {ages.join(", ")}</p>
      <p>First: {first}</p>
      <p>Third: {third}</p>
      <p>Rest Ages: {restAges.join(", ")}</p>
    </div>
  );
}

export default Excercise4;
