import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAccounts } from "../../contexts/UserAccountsContext";
import { topCurrencies } from "../../data/currencies";
import Form from "../../ui/Form";

function CurrencyAccountForm() {
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("PLN");
  const [deposit, setDeposit] = useState(0);
  const navigate = useNavigate();
  const { addAccount, loading, error } = useUserAccounts();

  async function handleSubmit(e) {
    e.preventDefault();

    const accountData = {
      name,
      currency,
      balance: deposit,
      type: "currency",
    };
    await addAccount(accountData);

    navigate("/app");
  }

  return (
    <Form
      onSubmit={handleSubmit}
      title="New Currency Account"
      error={error}
      loading={loading}
      submitButtonText="Open account"
    >
      <Form.Row>
        <label htmlFor="name">Account Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
      </Form.Row>
      <Form.Row>
        <label htmlFor="currency">Currency</label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {topCurrencies.map((currency) => (
            <option value={currency.code}>
              {currency.name} - {currency.code}
            </option>
          ))}
        </select>
      </Form.Row>
      <Form.Row>
        <label htmlFor="deposit">Deposit ({currency})</label>
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

export default CurrencyAccountForm;
