import { NavLink, useNavigate } from "react-router-dom";
import styles from "./AppNav.module.css";
import Button from "./Button";
import Logo from "./Logo";
import { useAuth } from "../contexts/authContext";

function AppNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className={styles.nav}>
      <div>
        <Logo></Logo>
      </div>
      <ul>
        <li>
          <NavLink to="new-transfer">New transfer</NavLink>
        </li>
        <li>
          <NavLink to="cantor">Cantor</NavLink>
        </li>
        <li>
          <NavLink to="goals">My goals</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="account">{user?.name}</NavLink>
        </li>
        <li>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
