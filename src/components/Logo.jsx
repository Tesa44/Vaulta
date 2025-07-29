import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img
        src="/vaulta-logo.png"
        alt="vaulta logo"
        className={styles.logo}
      ></img>
    </Link>
  );
}

export default Logo;
