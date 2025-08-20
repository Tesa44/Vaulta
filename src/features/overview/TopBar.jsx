import { Link } from "react-router-dom";
import styles from "./TopBar.module.css";
import Button from "../../ui/Button";

function TopBar() {
  return (
    <div className={styles.topBar}>
      <div className={styles.box}>
        <h3>Total balance</h3>
        <p className={styles.totalAmount}>13.756,27 €</p>
      </div>
      <div className={styles.box}>
        <h3>Fast transfer</h3>
        <p className={styles.transferSubheading}>
          Send money instantly with just a few clicks — anytime, anywhere.
        </p>
        <Link to="users">
          <Button type="primaryGreen">New transfer</Button>
        </Link>
      </div>

      {/* <div className={styles.warningBox}>
        <p>Account transactions to be assigned</p>
        <span className={styles.warningText}>
          Bring your accounting up to date.
        </span>
      </div> */}
    </div>
  );
}

export default TopBar;
