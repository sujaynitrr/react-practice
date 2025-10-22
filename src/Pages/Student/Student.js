import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addStudent, deleteStudent, editStudent } from "../../Redux/studentActions/studentActions";
import { useNavigate, useParams } from "react-router-dom";

export const Student = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.students);
  const navigate = useNavigate();
  const { id } = useParams();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (id) {
      const existing = students.find((s) => String(s.id) === String(id));
      if (existing) {
        setIsEditing(true);
        setEditId(existing.id);
        setName(existing.name);
        setEmail(existing.email);
        setPhone(existing.phone);
      }
    }
  }, [id, students]);

  // Handle form submit for add or edit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    if (isEditing) {
      // Edit student
      dispatch(editStudent({ id: editId, name, email, phone }));
      setIsEditing(false);
      setEditId(null);
      navigate("/student/list");
    } else {
      // Add new student
      dispatch(
        addStudent({
          id: Math.random(),
          name,
          email,
          phone,
        })
      );
    }

    // Reset form
    setName("");
    setEmail("");
    setPhone("");
  };

  // Start editing a student
  const handleEditClick = (student) => {
    setIsEditing(true);
    setEditId(student.id);
    setName(student.name);
    setEmail(student.email);
    setPhone(student.phone);
  };

  // Delete a student
  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <>
      <h1 style={styles.heading}>{isEditing ? "Edit Student Details" : "Add Student Details"}</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            id="name"
            type="text"
            style={styles.input}
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            id="email"
            type="email"
            style={styles.input}
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="phone" style={styles.label}>Phone:</label>
          <input
            id="phone"
            type="tel"
            style={styles.input}
            value={phone}
            placeholder="Enter your phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit" style={styles.button}>
          {isEditing ? "Update Student" : "Add Student"}
        </button>
        {isEditing && (
          <button
            type="button"
            style={{ ...styles.button, backgroundColor: "#6c757d", marginLeft: "10px" }}
            onClick={() => {
              setIsEditing(false);
              setEditId(null);
              setName("");
              setEmail("");
              setPhone("");
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
        <button
          type="button"
          onClick={() => navigate("/student/list")}
          style={{ ...styles.button, backgroundColor: "#28a745" }}
        >
          Go to Students List
        </button>
      </div>
    </>
  );
};

const styles = {
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  form: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#444",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.2s",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
