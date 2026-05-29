import { useState, useEffect } from "react"

function App() {

  const [students, setStudents] = useState([])
  const [name, setName] = useState("")
  const [rollNumber, setRollNumber] = useState("")
  const [department, setDepartment] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [year, setYear] = useState("")
  const [cgpa, setCgpa] = useState("")
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState("")

  // get all students when page loads
  useEffect(() => {
    fetchStudents()
  }, [])

  function fetchStudents() {
    fetch("https://student-management-mern-v2sx.onrender.com/api/students")
      .then(res => res.json())
      .then(data => {
        setStudents(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleSubmit() {

    if (name == "" || rollNumber == "" || department == "" || email == "" || phone == "" || year == "" || cgpa == "") {
      alert("Please fill all fields")
      return
    }

    const studentData = {
      name: name,
      rollNumber: rollNumber,
      department: department,
      email: email,
      phone: phone,
      year: Number(year),
      cgpa: Number(cgpa)
    }

    if (editId != null) {
      // update
      fetch("https://student-management-mern-v2sx.onrender.com/api/students/" + editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData)
      })
      .then(res => res.json())
      .then(data => {
        setMessage("Student updated successfully!")
        clearForm()
        fetchStudents()
      })
      .catch(err => {
        console.log(err)
      })

    } else {
      // add new
      fetch("https://student-management-mern-v2sx.onrender.com/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData)
      })
      .then(res => res.json())
      .then(data => {
        setMessage("Student added successfully!")
        clearForm()
        fetchStudents()
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  function handleEdit(student) {
    setEditId(student._id)
    setName(student.name)
    setRollNumber(student.rollNumber)
    setDepartment(student.department)
    setEmail(student.email)
    setPhone(student.phone)
    setYear(student.year)
    setCgpa(student.cgpa)
    setShowForm(true)
    setMessage("")
  }

  function handleDelete(id) {
    const confirm = window.confirm("Are you sure you want to delete this student?")
    if (confirm) {
      fetch("https://student-management-mern-v2sx.onrender.com/api/students/" + id, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => {
        setMessage("Student deleted!")
        fetchStudents()
      })
    }
  }

  function resetFields() {
    setName("")
    setRollNumber("")
    setDepartment("")
    setEmail("")
    setPhone("")
    setYear("")
    setCgpa("")
    setEditId(null)
  }

  function clearForm() {
    resetFields()
    setShowForm(false)
  }

  return (
    <div>

      <div style={{ backgroundColor: "#1a73e8", padding: "15px 30px", color: "white" }}>
        <h2 style={{ margin: 0 }}>Student Management System</h2>
        <p style={{ margin: 0, fontSize: "13px" }}>CIT Coimbatore - Department of IT</p>
      </div>

      <div style={{ padding: "20px 30px" }}>

        <button
          onClick={() => { setShowForm(!showForm); resetFields(); setMessage("") }}
          style={{ backgroundColor: "#1a73e8", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", marginBottom: "15px" }}>
          {showForm ? "Cancel" : "+ Add New Student"}
        </button>

        {message != "" &&
          <div style={{ backgroundColor: "#d4edda", border: "1px solid #c3e6cb", color: "#155724", padding: "10px", borderRadius: "4px", marginBottom: "15px" }}>
            {message}
          </div>
        }

        {showForm &&
          <div style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "20px", marginBottom: "20px", backgroundColor: "#f9f9f9" }}>
            <h4 style={{ marginTop: 0 }}>{editId ? "Edit Student" : "Add New Student"}</h4>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>

              <div>
                <label>Name</label><br />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter student name"
                  style={{ width: "100%", padding: "7px", marginTop: "4px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>

              <div>
                <label>Roll Number</label><br />
                <input
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="Enter roll number"
                  style={{ width: "100%", padding: "7px", marginTop: "4px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>

              <div>
                <label>Department</label><br />
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Enter department"
                  style={{ width: "100%", padding: "7px", marginTop: "4px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>

              <div>
                <label>Email</label><br />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  style={{ width: "100%", padding: "7px", marginTop: "4px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>

              <div>
                <label>Phone</label><br />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  style={{ width: "100%", padding: "7px", marginTop: "4px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>

              <div>
                <label>Year</label><br />
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  style={{ width: "100%", padding: "7px", marginTop: "4px", border: "1px solid #ccc", borderRadius: "4px" }}>
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              <div>
                <label>CGPA</label><br />
                <input
                  type="number"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  placeholder="Enter CGPA"
                  min="0"
                  max="10"
                  step="0.1"
                  style={{ width: "100%", padding: "7px", marginTop: "4px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>

            </div>

            <div style={{ marginTop: "15px" }}>
              <button
                onClick={handleSubmit}
                style={{ backgroundColor: "#28a745", color: "white", border: "none", padding: "8px 20px", borderRadius: "4px", cursor: "pointer", marginRight: "10px" }}>
                {editId ? "Update" : "Submit"}
              </button>
              <button
                onClick={clearForm}
                style={{ backgroundColor: "#6c757d", color: "white", border: "none", padding: "8px 20px", borderRadius: "4px", cursor: "pointer" }}>
                Clear
              </button>
            </div>

          </div>
        }

        <h4>All Students ({students.length})</h4>

        {students.length == 0 ?
          <p style={{ color: "gray" }}>No students added yet.</p>
          :
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Roll No</th>
                <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Name</th>
                <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Department</th>
                <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Email</th>
                <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Phone</th>
                <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Year</th>
                <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>CGPA</th>
                <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{student.rollNumber}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{student.name}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{student.department}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{student.email}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{student.phone}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{student.year}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{student.cgpa}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    <button
                      onClick={() => handleEdit(student)}
                      style={{ backgroundColor: "#ffc107", border: "none", padding: "5px 10px", borderRadius: "3px", cursor: "pointer", marginRight: "5px" }}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "3px", cursor: "pointer" }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }

      </div>
    </div>
  )
}

export default App
