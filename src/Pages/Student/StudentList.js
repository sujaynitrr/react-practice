import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "../../Redux/studentActions/studentActions";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.student.students);

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Students List</h1>
        <button
          type="button"
          onClick={() => navigate("/student/add")}
          style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}
        >
          Add Student
        </button>
      </div>

      {students.length === 0 ? (
        <p>No students added yet.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {students.map((stu) => (
            <li
              key={stu.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <div>
                <strong>{stu.name}</strong> — {stu.email} — {stu.phone}
              </div>
              <div>
                <button
                  onClick={() => navigate(`/student/add/${stu.id}`)}
                  style={{ cursor: "pointer", color: "#fff", backgroundColor: "#17a2b8", border: "none", padding: "6px 12px", borderRadius: 4, marginRight: 8 }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(stu.id)}
                  style={{ cursor: "pointer", color: "#fff", backgroundColor: "#dc3545", border: "none", padding: "6px 12px", borderRadius: 4 }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
