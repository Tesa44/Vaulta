import { useUserAccounts } from "../../contexts/UserAccountsContext";
import styles from "./DeleteAccountModal.module.css";

function DeleteAccountModal({ account, onClose }) {
  const { deleteAccount, loading, error } = useUserAccounts();

  function handleDelete() {
    const success = deleteAccount();
    if (success) onClose();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Delete account</h3>
        <p>
          Are you sure you want to delete <strong>{account.name}</strong>?
        </p>
        <div className={styles.actions}>
          <button onClick={handleDelete} className={styles.deleteBtn}>
            Delete
          </button>
          <button onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;
