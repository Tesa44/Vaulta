import { useUserAccounts } from "../../contexts/UserAccountsContext";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import styles from "./DeleteAccountModal.module.css";

function DeleteAccountModal({ account, onClose }) {
  const { deleteAccount, setCurrentAccount, getMainAccount, loading, error } =
    useUserAccounts();

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  async function handleDelete() {
    const success = await deleteAccount();
    if (success) {
      setCurrentAccount(getMainAccount());
      onClose();
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h3>Delete account</h3>
        <p>
          Are you sure you want to delete <strong>{account.name}</strong>?
        </p>
        {error && <ErrorMessage message={error} />}
        <div className={styles.actions}>
          <Button onClick={handleDelete} type="red">
            {loading ? "Deleting..." : "Delete"}
          </Button>
          <Button onClick={onClose} type="light">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;
