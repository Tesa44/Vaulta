import styles from "./AccountActionsMenu.module.css";

function AccountActionsMenu({ onEdit, onDelete }) {
  return (
    <div className={styles.menu}>
      <button className={styles.menuItem} onClick={onEdit}>
        Edit name
      </button>
      <button className={styles.menuItem} onClick={onDelete}>
        Delete account
      </button>
    </div>
  );
}

export default AccountActionsMenu;
