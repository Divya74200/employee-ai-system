import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h2>AI Employee System</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        {userInfo && (
          <>
            <Link to="/employees">
              Employees
            </Link>

            <Link to="/recommendations">
              AI Recommendations
            </Link>

            <Link to="/analytics">
              Analytics
            </Link>

            <button
              className="logout-btn"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </>
        )}

        {!userInfo && (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/signup">
              Signup
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;