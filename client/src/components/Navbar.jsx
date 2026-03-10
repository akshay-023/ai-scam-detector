import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link
        to={token ? "/analyze" : "/login"}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <h2 style={{ margin: 0 }}>🛡️ ScamGuard AI</h2>
      </Link>

      <div className="nav-links">
        {token ? (
          <>
            <Link to="/analyze">Analyze</Link>
            <Link to="/history">History</Link>
            <button type="button" onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;