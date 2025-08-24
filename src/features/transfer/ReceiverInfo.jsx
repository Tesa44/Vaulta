import styles from "./ReceiverInfo.module.css";

function ReceiverInfo({ user, accounts, onSelect, selected }) {
  return (
    <div className={styles.receiverInfo}>
      <div className={styles.box}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
        </svg>
        <p>{user.name}</p>
        <p>{user.surname}</p>
      </div>
      {accounts.length > 0 && <h4>{`${user.name}'s accounts`}</h4>}
      {accounts.length === 0 && <h4>{`${user.name} has no accounts`}</h4>}
      <ul className={styles.list}>
        {accounts.map((acc) => (
          <AccountItem
            account={acc}
            onSelect={onSelect}
            isActive={acc.id === selected?.id}
          ></AccountItem>
        ))}
      </ul>
    </div>
  );
}

function AccountItem({ account, onSelect, isActive }) {
  function handleClick() {
    onSelect(account);
  }

  return (
    <li
      className={`${styles.accountItem} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
    >
      <p>
        {account.name} ({account.currency})
      </p>
      <p>{account.iban}</p>
    </li>
  );
}

export default ReceiverInfo;
