import { useState } from "react";
import styles from "./EditAccountNameModal.module.css";

function EditAccountNameModal({ account, onClose }) {
  const [newName, setNewName] = useState(account.name);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: tutaj logika zmiany nazwy konta (np. API call / context update)
    console.log("Saving new name:", newName);
    onClose();
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
          <div className={styles.actions}>
            <button type="submit" className={styles.saveBtn}>
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAccountNameModal;
