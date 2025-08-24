import styles from "./AccountTypePicker.module.css";
import Button from "../../ui/Button";

function AccountTypePicker() {
  return (
    <div className={styles.box}>
      <h2>Select type of your new account</h2>
      <div className={styles.actions}>
        <Button type="big" to="currency">
          <span>💱</span>
          <p>Currency Account</p>
        </Button>
        <Button type="big" to="goal">
          <span>🚗</span>
          <p>Goal Account</p>
        </Button>
      </div>
    </div>
  );
}

export default AccountTypePicker;
