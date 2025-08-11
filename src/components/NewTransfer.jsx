import styles from "./NewTransfer.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUserAccounts } from "../contexts/UserAccountsContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TransferForm() {
  const [iban, setIban] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("Fast Transfer via Vaulta");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const { transferMoney, loading, error, clearError } = useUserAccounts();

  async function handleSubmit(e) {
    e.preventDefault();

    const success = await transferMoney(iban, amount, title, name);

    if (success) {
      navigate("/app/history");
    }
  }

  useEffect(function () {
    return () => clearError();
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <h3>Fast transfer</h3>
        <BackButton></BackButton>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>New Transfer</h2>

        <div className={styles.row}>
          <label htmlFor="iban">Receiber IBAN number</label>
          <input
            type="text"
            id="iban"
            name="iban"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            required
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="name">Receiver Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="title">Transfer Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <Button type="primaryGreen" disabled={loading}>
          {loading ? "Sending..." : "Send Transfer"}
        </Button>
      </form>
    </div>
  );
}

export default TransferForm;
