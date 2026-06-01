import { NavLink } from "react-router";
import "./Header.css";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const { isLoggedIn, isAdmin, userName, logout } = useAuth();

  return (
    <div className="header-container">
      <h1>Auction Site</h1>
      <nav className="header-nav">
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

          <div className="header-user-container">
            {isLoggedIn && (
              <li>
                Logged in as: <NavLink to="/my-pages">{userName}</NavLink>
              </li>
            )}

            <li>
              {!isLoggedIn ? (
                <NavLink to="/login">Sign in</NavLink>
              ) : (
                <button className="sign-out-button" onClick={logout}>
                  Sign out
                </button>
              )}
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
