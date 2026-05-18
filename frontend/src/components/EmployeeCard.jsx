import API from "../api/api";

function EmployeeCard({
  employee,
  fetchEmployees,
  setEditEmployee,
}) {

  const deleteHandler = async () => {
    try {

      await API.delete(
        `/employees/${employee._id}`
      );

      fetchEmployees();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="employee-card">

      <h3>{employee.name}</h3>

      <p>{employee.email}</p>

      <p>
        Department:
        {" "}
        {employee.department}
      </p>

      <p>
        Skills:
        {" "}
        {employee.skills.join(", ")}
      </p>

      <p>
        Score:
        {" "}
        {employee.performanceScore}
      </p>

      <p>
        Experience:
        {" "}
        {employee.experience} years
      </p>

      <div className="btn-group">

        <button
          onClick={() =>
            setEditEmployee(employee)
          }
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={deleteHandler}
        >
          Delete
        </button>

      </div>
    </div>
  );
}

export default EmployeeCard;