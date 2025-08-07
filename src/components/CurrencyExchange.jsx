import { useState } from "react";

import styles from "./CurrencyExchange.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import BackButton from "./BackButton";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useCurrencyRates } from "../contexts/currencyRatesContext";

export default function CurrencyExchange() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const {
    baseCurrency,
    rates,
    buyRates,
    sellRates,
    history,
    loading,
    filteredCurrencies,
  } = useCurrencyRates();

  const totalPages = filteredCurrencies.length;
  const currency = filteredCurrencies[currentPage - 1];

  function handleBuy() {
    navigate("exchange-form", {
      state: {
        type: "buy",
        currency: currency.code,
        rate: rates[currency.code],
        baseCurrency: "PLN",
      },
    });
  }

  function handleSell() {
    navigate("exchange-form", {
      state: {
        type: "sell",
        currency: currency.code,
        rate: rates[currency.code],
        baseCurrency: "PLN",
      },
    });
  }

  return (
    <div className={styles.exchangeContainer}>
      <div className={styles.header}>
        <h3>Currency Exchange</h3>
        <BackButton></BackButton>
      </div>
      <div className={styles.card}>
        <h4>
          {currency.code} / {baseCurrency}
        </h4>
        <p>Current rate: {rates[currency.code]}</p>

        <div className={styles.chart}>
          {loading ? (
            <p>Loading chart...</p>
          ) : (
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={history}>
                <CartesianGrid
                  stroke="#ccc"
                  strokeDasharray="5 5"
                ></CartesianGrid>
                <XAxis dataKey="date" hide />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={currency.code}
                  stroke="#7048e8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={styles.actions}>
          <Button type="big" onClick={handleSell}>
            Sell {currency.code} <span>{sellRates[currency.code]}</span>
          </Button>
          <Button type="big" onClick={handleBuy}>
            Buy {currency.code} <span>{buyRates[currency.code]}</span>
          </Button>
        </div>
      </div>
      <div className={styles.pagination}>
        <Button
          disabled={currentPage === 1}
          type="pagination"
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          ←
        </Button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <Button
          type="pagination"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          →
        </Button>
      </div>
    </div>
  );
}
