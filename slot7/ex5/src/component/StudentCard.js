import { useState } from "react";

export default function StudentCard({ student }) {
  const [attendance, setAttendance] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!attendance) return alert("Hãy chọn Absent/Present trước khi Submit.");
    // Tại đây bạn gọi API lưu điểm danh
    console.log("Submit attendance:", {
      code: student.code,
      name: student.name,
      status: attendance,
    });
    alert(`Đã ghi nhận: ${student.name} - ${attendance}`);
  };

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={student.photo || "/placeholder-student.jpg"}
        alt={student.name}
        className="card-img-top student-photo"
      />
      <div className="card-body">
        <div className="text-center small text-muted mb-2">{student.code}</div>
        <div className="fw-semibold text-center mb-1">{student.name}</div>

        <div className="d-flex justify-content-between small text-muted mb-3">
          <span>{student.city}</span>
          <span>{student.province}</span>
        </div>

        <form onSubmit={onSubmit}>
          <div className="d-flex justify-content-between mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`att-${student.code}`}
                id={`a-${student.code}`}
                value="Absent"
                checked={attendance === "Absent"}
                onChange={(e) => setAttendance(e.target.value)}
              />
              <label className="form-check-label" htmlFor={`a-${student.code}`}>Absent</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`att-${student.code}`}
                id={`p-${student.code}`}
                value="Present"
                checked={attendance === "Present"}
                onChange={(e) => setAttendance(e.target.value)}
              />
              <label className="form-check-label" htmlFor={`p-${student.code}`}>Present</label>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-warning btn-sm px-4">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

