export function Excercise2() {
  //1. Tạo 1 mảng số nguyên âm dương đầy đủ và ngẫu nhiên khoảng 20 số
  const numbers = [3, -1, 4, -2, 5, -9, 12, -10];
  //2. Tổng các phần tử của mảng
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  //3. Tính giá trị trung bình của các phần tử trong mảng
  const aver = sum / numbers.length;

  //4. khai mảng chuỗi names tầm 10 người, in ra danh sách các tên
  // theo thứ tự tăng dần Alphabet
  const names = [
    "Hà",
    "Lan",
    "An",
    "Minh",
    "Chi",
    "Nam",
    "Hùng",
    "Bình",
    "Quân",
    "Đạt",
  ];
  names.sort();

  //5. Khai báo 1 mảng students chứa 10 đối tượng students

  //Mỗi đối tượng student có các thuộc tính: id, name, age và grade
  //(id là số nguyên, name là chuỗi, age là số nguyên, grade là số thực)
  const students = [
    { id: 1, name: "An", age: 20, grade: 8.5 },
    { id: 2, name: "Bình", age: 22, grade: 7.0 },
    { id: 3, name: "Chi", age: 21, grade: 9.0 },
    { id: 4, name: "Đạt", age: 23, grade: 6.5 },
    { id: 5, name: "Hà", age: 20, grade: 8.0 },
    { id: 6, name: "Hùng", age: 22, grade: 7.5 },
    { id: 7, name: "Lan", age: 21, grade: 9.5 },
    { id: 8, name: "Minh", age: 23, grade: 6.0 },
    { id: 9, name: "Nam", age: 20, grade: 8.8 },
    { id: 10, name: "Quân", age: 22, grade: 7.8 },
  ];
  // tạo hàm tìm các bạn có grade là 8 trở lên và sắp xếp giảm dần
  const topStudents = students
    .filter((student) => student.grade >= 7)
    .sort((a, b) => b.grade - a.grade);
  // in ra danh sách topStudents dưới dạng bảng và cuối bảng có trung bình điểm
  const avg = (
    topStudents.reduce((s, st) => s + st.grade, 0) / topStudents.length
  ).toFixed(2);

  return (
    <div>
      <h2>Excercise2</h2>
      <p>In mảng số nguyên.</p>
      <ul>
        {numbers.map((num, i) => (
          <li key={i}>
            {" "}
            Phần thử thứ {i} - {num}
          </li>
        ))}
      </ul>
      <p>Tổng các phần tử của mảng: {sum}</p>
      <p>Giá trị trung bình các phần tử trong mảng: {aver.toFixed(2)}</p>
      <ul>
        {names.map((name, i) => (
          <li key={i}>
            {" "}
            Tên thứ {i} - {name}
          </li>
        ))}
      </ul>

      <h3>
        Danh sách các bạn có grade 8 trở lên và được sắp xếp dưới dạng bảng và
        cuối bảng có trung bình điểm:
      </h3>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {topStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
            </tr>
          ))}

          {/* Thêm dòng trung bình */}
          <tr>
            <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>
              Trung bình điểm của top học sinh
            </td>
            <td>{avg}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
