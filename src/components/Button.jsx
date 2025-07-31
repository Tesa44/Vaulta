import styles from "./Button.module.css";

function Button({ children, onClick, type, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
