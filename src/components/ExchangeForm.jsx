import { useLocation } from "react-router-dom";

function ExchangeForm() {
  const location = useLocation();
  console.log(location);
  const state = location.state;
  if (!state) return <p>Error: Missing exchange data.</p>;

  const { type, currency, rate, baseCurrency } = state;

  return (
    <div>
      <h2>
        {type === "buy" ? "Buy" : "Sell"} {currency}
      </h2>
      <p>
        Exchange rate: 1 {baseCurrency} = {rate} {currency}
      </p>
    </div>
  );
}

export default ExchangeForm;
