import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import { useCurrencyRates } from "../../contexts/CurrencyRatesContext";
import Form from "../../ui/Form";

function GoalAccountForm() {
  const [name, setName] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);
  const navigate = useNavigate();
  const { addAccount, loading, error } = useUserAccounts();

  const { baseCurrency } = useCurrencyRates();

  async function handleSubmit(e) {
    e.preventDefault();

    const accountData = {
      name,
      currency: baseCurrency,
      balance: deposit,
      targetAmount,
      type: "goal",
    };
    await addAccount(accountData);

    navigate("/app");
  }

  return (
    <Form
      onSubmit={handleSubmit}
      title="New goal account"
      error={error}
      loading={loading}
      submitButtonText="Create goal"
    >
      <Form.Row>
        <label htmlFor="name">Goal Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
      </Form.Row>
      <Form.Row>
        <label htmlFor="targetAmount">Target amount ({baseCurrency})</label>
        <input
          type="number"
          id="targetAmount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(Number(e.target.value))}
        ></input>
      </Form.Row>
      <Form.Row>
        <label htmlFor="deposit">Deposit ({baseCurrency})</label>
        <input
          type="number"
          id="deposit"
          value={deposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
        ></input>
      </Form.Row>
    </Form>
  );
}

export default GoalAccountForm;
