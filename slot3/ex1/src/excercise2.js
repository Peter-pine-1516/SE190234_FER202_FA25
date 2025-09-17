const sum = (...nums) =>
  nums.reduce((total, n) =>
    typeof n === "number" && !isNaN(n) ? total + n : total, 0);

const avg = (...nums) => {
  let count = 0;
  const total = nums.reduce((sum, n) => {
    if (typeof n === "number" && !isNaN(n)) {
      count++;
      return sum + n;
    }
    return sum;
  }, 0);
  return count === 0 ? 0 : +(total / count).toFixed(2);
};

// In kết quả
console.log(sum(1, 2, 3));      // 6
console.log(sum(1, 'x', 4));    // 5
console.log(avg(1, 2, 3, 4));   // 2.5
console.log(avg());             // 0