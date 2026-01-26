import { NavLink } from "react-router-dom";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        🛡️ ScamGuard AI
        <span className="nav-owner">by Akshay Raavi</span>
      </div>

      <div className="nav-links">
        <NavLink to="/analyze">Analyze</NavLink>
        <NavLink to="/history">History</NavLink>
        <NavLink to="/login">Login</NavLink>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
