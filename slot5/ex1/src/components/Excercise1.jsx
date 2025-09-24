function Excercise1() {
  //tính hàm double
  const double = (x) => x * 2; // arrow function
  // hàm kiểm tra số chẵn
  const isEven = (n) => n % 2 === 0; // arrow function with block body
  return (
    <div>
      <h2>Excercise1</h2>
      <p>Ket qua ham double(5): {double(5)}</p>

      <p>kết quả isEven(4): {isEven(4) / toString ? "Số chẵn" : "số lẻ"}</p>
    </div>
  );
}
export default Excercise1;
