function Excercise8() {
  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

  // Dùng reduce để tính toán
  const stats = ages.reduce(
    (acc, age) => {
      acc.total += age;
      if (age < acc.min) acc.min = age;
      if (age > acc.max) acc.max = age;
      if (age >= 13 && age <= 19) acc.buckets.teen++;
      if (age >= 20) acc.buckets.adult++;
      return acc;
    },
    {
      total: 0,
      min: Infinity,
      max: -Infinity,
      buckets: { teen: 0, adult: 0 },
    }
  );

  return (
    <div>
      <h2>Excercise8</h2>
      <p>Ages: {ages.join(", ")}</p>
      <p>
        Total: {stats.total}, Min: {stats.min}, Max: {stats.max}
      </p>
      <p>
        Buckets → Teen: {stats.buckets.teen}, Adult: {stats.buckets.adult}
      </p>
    </div>
  );
}

export default Excercise8;
