import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
import Button from "./Button";
import Logo from "./Logo";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <div>
        <Logo></Logo>
      </div>
      <ul>
        <li>
          <NavLink to="/new-transfer">New transfer</NavLink>
        </li>
        <li>
          <NavLink to="/cantor">Support</NavLink>
        </li>
        <li>
          <NavLink to="/goals">My goals</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <Button type="primary">Logout</Button>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
