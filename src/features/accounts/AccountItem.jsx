import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AccountItem.module.css";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import { formatCurrency } from "../../utils/formatCurrency";
import AccountActionsMenu from "./AccountActionsMenu";
import EditAccountNameModal from "./EditAccountNameModal";
import DeleteAccountModal from "./DeleteAccountModal";

function AccountItem({ account, isActive }) {
  const { setCurrentAccount } = useUserAccounts();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();
  function handleSelectAccount() {
    setCurrentAccount(account);

    if (account.type === "goal") {
      navigate("/app/goal-progress");
    } else {
      navigate("/app/history");
    }
  }

  return (
    <li
      key={account.id}
      className={`${styles.accountCard} ${isActive ? styles.active : ""}`}
      onClick={handleSelectAccount}
    >
      <div className={styles.accountLabel}>{account.name}</div>
      <div className={styles.iban}>{account.iban}</div>
      <div className={styles.amountContainer}>
        <p> Available funds</p>
        <span className={styles.amount}>
          {formatCurrency(account.balance, account.currency)}
        </span>
      </div>
      {/* Trzy kropki */}
      <button
        className={styles.actionsButton}
        onClick={() => {
          //e.stopPropagation(); // żeby nie odpaliło handleSelectAccount
          setIsMenuOpen((prev) => !prev);
        }}
      >
        ⋮
      </button>

      {isMenuOpen && (
        <AccountActionsMenu
          onEdit={() => {
            setShowEditModal(true);
            setIsMenuOpen(false);
          }}
          onDelete={() => {
            setShowDeleteModal(true);
            setIsMenuOpen(false);
          }}
        />
      )}

      {showEditModal && (
        <EditAccountNameModal
          account={account}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteAccountModal
          account={account}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </li>
  );
}

export default AccountItem;
