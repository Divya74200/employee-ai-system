import { useEffect, useState } from "react";

import API from "../api/api";

function EmployeeForm({
  fetchEmployees,
  editEmployee,
  setEditEmployee,
}) {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      department: "",
      skills: "",
      performanceScore: "",
      experience: "",
    });

  useEffect(() => {
    if (editEmployee) {
      setFormData({
        name: editEmployee.name,
        email: editEmployee.email,
        department: editEmployee.department,

        skills:
          editEmployee.skills.join(", "),

        performanceScore:
          editEmployee.performanceScore,

        experience:
          editEmployee.experience,
      });
    }
  }, [editEmployee]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      ...formData,

      skills: formData.skills
        .split(",")
        .map((skill) =>
          skill.trim()
        ),

      performanceScore: Number(
        formData.performanceScore
      ),

      experience: Number(
        formData.experience
      ),
    };

    try {

      if (editEmployee) {

        await API.put(
          `/employees/${editEmployee._id}`,
          employeeData
        );

        alert("Employee Updated");

        setEditEmployee(null);

      } else {

        await API.post(
          "/employees",
          employeeData
        );

        alert("Employee Added");
      }

      setFormData({
        name: "",
        email: "",
        department: "",
        skills: "",
        performanceScore: "",
        experience: "",
      });

      fetchEmployees();

    } catch (error) {
      alert("Operation Failed");
    }
  };

  return (
    <div className="card">

      <h2>
        {editEmployee
          ? "Update Employee"
          : "Add Employee"}
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleChange}
        />

        <input
          type="number"
          name="performanceScore"
          placeholder="Performance"
          value={
            formData.performanceScore
          }
          onChange={handleChange}
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
        />

        <button type="submit">

          {editEmployee
            ? "Update Employee"
            : "Add Employee"}

        </button>

      </form>
    </div>
  );
}

export default EmployeeForm;