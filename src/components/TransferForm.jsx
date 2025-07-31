import styles from "./TransferForm.module.css";
import Button from "./Button";
import BackButton from "./BackButton";

function TransferForm() {
  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <h3>Fast transfer</h3>
        <BackButton></BackButton>
      </div>
      <form className={styles.form}>
        <h2>New Transfer</h2>

        <div className={styles.field}>
          <label htmlFor="account">Account Number</label>
          <input type="text" id="account" name="account" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="name">Recipient Name</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="title">Transfer Title</label>
          <input type="text" id="title" name="title" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <Button type="primaryGreen">Send Transfer</Button>
      </form>
    </div>
  );
}

export default TransferForm;
