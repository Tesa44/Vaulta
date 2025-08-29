import styles from "./Button.module.css";
import { Link } from "react-router-dom";

function Button({
  children,
  onClick,
  type,
  disabled,
  to,
  htmlType = "button",
}) {
  if (to) {
    return (
      <Link to={to} className={`${styles.btn} ${styles[type]}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.btn} ${styles[type]}`}
      type={htmlType}
    >
      {children}
    </button>
  );
}

export default Button;
