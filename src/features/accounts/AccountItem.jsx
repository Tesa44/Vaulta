import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AccountItem.module.css";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import { formatCurrency } from "../../utils/formatCurrency";
import AccountActionsMenu from "./AccountActionsMenu";
import EditAccountNameModal from "./EditAccountNameModal";
import DeleteAccountModal from "./DeleteAccountModal";
import OptionsButton from "../../ui/OptionsButton";

function AccountItem({ account, isActive }) {
  const { setCurrentAccount, getMainAccount } = useUserAccounts();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isMain = account.id === getMainAccount().id;

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
      <div className={styles.accountLabel}>
        <p>{account.name}</p>
        <div className={styles.actions}>
          {!isMain && (
            <OptionsButton
              size={24}
              onClick={() => {
                //e.stopPropagation(); // żeby nie odpaliło handleSelectAccount
                setIsMenuOpen((prev) => !prev);
              }}
            />
          )}

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
              onClose={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      </div>
      <div className={styles.iban}>{account.iban}</div>
      <div className={styles.amountContainer}>
        <p> Available funds</p>
        <span className={styles.amount}>
          {formatCurrency(account.balance, account.currency)}
        </span>
      </div>
      {/* Trzy kropki */}

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
