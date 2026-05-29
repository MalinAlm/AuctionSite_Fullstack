import { NavLink } from "react-router";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <h1>Auction Site</h1>
      <nav>
        <ul className="header-list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>Some other link</li>
          <li>
            <NavLink to="/login">Sign in</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
