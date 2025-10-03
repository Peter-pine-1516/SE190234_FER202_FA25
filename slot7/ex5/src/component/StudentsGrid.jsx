import StudentCard from "./StudentCard";

export default function StudentsGrid({ students = [] }) {
  return (
    <div className="row g-4">
      {students.map((s) => (
        <div key={s.code} className="col-12 col-md-6">
          <StudentCard student={s} />
        </div>
      ))}
    </div>
  );
}

