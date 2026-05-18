import {
  useEffect,
  useState,
} from "react";

import API from "../api/api";

function Analytics() {
  const [employees, setEmployees] =
    useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const { data } = await API.get(
      "/employees"
    );

    const sortedEmployees = data.sort(
      (a, b) =>
        b.performanceScore -
        a.performanceScore
    );

    setEmployees(sortedEmployees);
  };

  return (
    <div>
      <h2>Employee Rankings</h2>

      {employees.map((employee, index) => (
        <div
          key={employee._id}
          className="card"
        >
          <h3>
            Rank #{index + 1}
          </h3>

          <p>{employee.name}</p>

          <p>
            Score:{" "}
            {employee.performanceScore}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Analytics;