import styles from "./Form.module.css";
import Button from "./Button";

function Form({ onSubmit, title, error, loading, submitButtonText, children }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {title && <h2>{title}</h2>}

      {children}

      {error && <p className={styles.error}>{error}</p>}

      <Button type="primary" disabled={loading}>
        {loading ? "Loading..." : submitButtonText}
      </Button>
    </form>
  );
}

Form.Row = function Row({ children }) {
  return <div className={styles.row}>{children}</div>;
};

export default Form;
