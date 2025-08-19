import { NavLink } from "react-router-dom";
import Logo from "../ui/Logo";
import styles from "./PageNav.module.css";

function PageNav({ dark = false }) {
  return (
    <nav className={`${styles.nav} ${dark ? styles.dark : ""} `}>
      <div>
        <Logo></Logo>
      </div>
      <ul>
        <li>
          <NavLink to="/features">Features</NavLink>
        </li>
        <li>
          <NavLink to="/support">Support</NavLink>
        </li>
        <li>
          <NavLink to="/blog">Blog</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/open-account" className={styles.ctaLink}>
            Open Account
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
