import { useState } from "react";
import styles from "./EditAccountNameModal.module.css";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
function EditAccountNameModal({ account, onClose }) {
  const [newName, setNewName] = useState(account.name);

  const { setAccountName, loading, error } = useUserAccounts();

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await setAccountName(newName);
    if (success) onClose();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Edit account name</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={styles.input}
            required
          />
          {error && <ErrorMessage message={error} />}
          <div className={styles.actions}>
            <Button type="primaryGreen" htmlType="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button type="light" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAccountNameModal;
