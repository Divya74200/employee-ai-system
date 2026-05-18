import {
  useEffect,
  useState,
} from "react";

import API from "../api/api";

import EmployeeForm from "../components/EmployeeForm";

import EmployeeCard from "../components/EmployeeCard";

import SearchFilter from "../components/SearchFilter";

function EmployeeList() {

  const [employees, setEmployees] =
    useState([]);

  const [department, setDepartment] =
    useState("");

  const [editEmployee,
    setEditEmployee] =
    useState(null);

  const fetchEmployees = async () => {

    const { data } =
      await API.get("/employees");

    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = async () => {

    const { data } =
      await API.get(
        `/employees/search?department=${department}`
      );

    setEmployees(data);
  };

  return (
    <div>

      <EmployeeForm
        fetchEmployees={fetchEmployees}
        editEmployee={editEmployee}
        setEditEmployee={setEditEmployee}
      />

      <SearchFilter
        department={department}
        setDepartment={setDepartment}
        handleSearch={handleSearch}
      />

      <div className="employee-grid">

        {employees.map((employee) => (

          <EmployeeCard
            key={employee._id}
            employee={employee}
            fetchEmployees={fetchEmployees}
            setEditEmployee={setEditEmployee}
          />

        ))}

      </div>

    </div>
  );
}

export default EmployeeList;