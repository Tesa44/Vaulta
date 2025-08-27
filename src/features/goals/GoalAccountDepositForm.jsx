import { useState, useEffect } from "react";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import { formatCurrency } from "../../utils/formatCurrency";
import Form from "../../ui/Form";

function GoalAccountDepositForm({ onDeposit }) {
  const [amount, setAmount] = useState("");

  const {
    currentAccount,
    getMainAccount,
    error,
    clearError,
    loading,
    goalTransferMoney,
  } = useUserAccounts();
  const mainAccount = getMainAccount();

  async function handleSubmit(e) {
    e.preventDefault();

    const success = await goalTransferMoney(
      mainAccount,
      currentAccount,
      amount
    );
    if (success) {
      const newAmount = currentAccount.balance + Number(amount);
      onDeposit(newAmount);
      setAmount("");
    }
  }

  useEffect(
    function () {
      return () => clearError();
    },
    [clearError]
  );

  return (
    <Form
      onSubmit={handleSubmit}
      title="Deposit to goal"
      error={error}
      loading={loading}
      submitButtonText="Deposit now"
    >
      <Form.Row>
        <label htmlFor="iban">From account</label>
        <input
          type="text"
          value={`${mainAccount.name}  - ${formatCurrency(
            mainAccount.balance,
            mainAccount.currency
          )}`}
          disabled
        />
      </Form.Row>
      <Form.Row>
        <label>{`You will deposit (${mainAccount.currency})`}</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </Form.Row>
    </Form>
  );
}

export default GoalAccountDepositForm;
