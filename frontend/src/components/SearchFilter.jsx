function SearchFilter({
  department,
  setDepartment,
  handleSearch,
}) {
  return (
    <div className="card">
      <h2>Search Employee</h2>

      <input
        type="text"
        placeholder="Enter Department"
        value={department}
        onChange={(e) =>
          setDepartment(e.target.value)
        }
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchFilter;