import { useEffect, useRef } from "react";
import styles from "./AccountActionsMenu.module.css";

function AccountActionsMenu({ onEdit, onDelete, onClose }) {
  const menuRef = useRef(null);

  useEffect(
    function () {
      function handleClickOutside(e) {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          onClose();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return function () {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },
    [onClose]
  );

  return (
    <div className={styles.menu} ref={menuRef}>
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
