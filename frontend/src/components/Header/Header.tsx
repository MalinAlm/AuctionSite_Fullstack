import { NavLink } from "react-router";
import "./Header.css";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const { isLoggedIn, isAdmin, logout } = useAuth();

  return (
    <div className="header-container">
      <h1>Auction Site</h1>
      <nav>
        <ul className="header-list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            {isLoggedIn && (
              <NavLink to="/create-auction">Create auction</NavLink>
            )}
          </li>
          <li>{isAdmin && <NavLink to="/admin">Admin</NavLink>}</li>

          <li>
            {/* <NavLink to="/login">Sign in</NavLink> */}
            {!isLoggedIn ? (
              <NavLink to="/login">Sign in</NavLink>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
