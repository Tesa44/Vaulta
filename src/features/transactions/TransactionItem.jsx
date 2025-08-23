import styles from "./TransactionItem.module.css";
import {
  ArrowBendDownRightIcon,
  ArrowBendDownLeftIcon,
} from "@phosphor-icons/react";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { useUserAccounts } from "../../contexts/UserAccountsContext";

function TransactionItem({ transaction }) {
  const { currentAccount } = useUserAccounts();
  const isPositive = transaction.amount >= 0;

  return (
    <li className={styles.transactionItem}>
      <div className={styles.transactionInfo}>
        <h4>{transaction.title}</h4>
        <p>{transaction.name}</p>
        <span className={styles.transactionDate}>
          {formatDate(transaction.date)}
        </span>
      </div>
      <div className={styles.transactionAmount}>
        <p>{formatCurrency(transaction.amount, currentAccount.currency)}</p>
        {isPositive ? (
          <ArrowBendDownLeftIcon size={32} color="#40c057" />
        ) : (
          <ArrowBendDownRightIcon size={32} color="#f03e3e" />
        )}
      </div>
      <div className={styles.balanceAfter}>
        <p>Balance after transaction</p>
        <span>
          {formatCurrency(transaction.balanceAfter, currentAccount.currency)}
        </span>
      </div>
    </li>
  );
}

export default TransactionItem;
