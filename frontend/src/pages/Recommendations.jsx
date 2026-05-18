import {
  useEffect,
  useState,
} from "react";

import API from "../api/api";

function Recommendations() {

  const [employees, setEmployees] =
    useState([]);

  const [selectedEmployee,
    setSelectedEmployee] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [recommendation,
    setRecommendation] =
    useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {

    try {

      const { data } =
        await API.get("/employees");

      setEmployees(data);

    } catch (error) {
      console.log(error);
    }
  };

  const generateAI = async () => {

    if (!selectedEmployee) {
      alert("Select Employee");
      return;
    }

    try {

      setLoading(true);

      const employee =
        employees.find(
          (emp) =>
            emp._id === selectedEmployee
        );

      const { data } =
        await API.post(
          "/ai/recommend",
          employee
        );

      setRecommendation(
        data.recommendation
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  return (
    <div>

      <div className="card">

        <h2>
          AI Recommendation System
        </h2>

        <select
          value={selectedEmployee}
          onChange={(e) =>
            setSelectedEmployee(
              e.target.value
            )
          }
        >

          <option value="">
            Select Employee
          </option>

          {employees.map((employee) => (

            <option
              key={employee._id}
              value={employee._id}
            >
              {employee.name}
            </option>

          ))}

        </select>

        <button onClick={generateAI}>

          {loading
            ? "Generating..."
            : "Generate AI Recommendation"}

        </button>

      </div>

      {recommendation && (

        <div className="ai-card">

          <h2>AI Analysis</h2>

          <div className="ai-response">

            {recommendation
              .split("\n")
              .map((line, index) => (

                <p key={index}>
                  {line}
                </p>

              ))}

          </div>

        </div>

      )}

    </div>
  );
}

export default Recommendations;