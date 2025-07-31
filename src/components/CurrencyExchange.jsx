import { useEffect, useState } from "react";
import { topCurrencies } from "../data/currencies";
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

const baseCurrency = "PLN";

export default function CurrencyExchange() {
  const [rates, setRates] = useState({});
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCurrencies = topCurrencies.filter(
    (c) => c.code !== baseCurrency
  );

  const totalPages = filteredCurrencies.length;
  const currency = filteredCurrencies[currentPage - 1];
  useEffect(function () {
    async function fetchRates() {
      const res = await fetch(
        `https://api.frankfurter.app/latest?from=${baseCurrency}&to=${filteredCurrencies
          .map((cur) => cur.code)
          .join(",")}`
      );
      const data = await res.json();
      setRates(data.rates);
      console.log(data.rates);
    }

    async function fetchHistory() {
      const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);

      const res = await fetch(
        `https://api.frankfurter.app/${start}..?from=${baseCurrency}&to=${filteredCurrencies
          .map((cur) => cur.code)
          .join(",")}`
      );

      const data = await res.json();
      const histArr = Object.entries(data.rates).map(([date, allRates]) => {
        const invertedRates = Object.fromEntries(
          Object.entries(allRates).map(([key, value]) => [
            key,
            Math.pow(value, -1).toFixed(5),
          ])
        );
        return {
          date,
          ...invertedRates,
        };
      });

      setHistory(histArr);
      setLoading(false);
    }

    fetchRates();
    fetchHistory();
  }, []);

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
        <p>Current rate: {Math.pow(rates[currency.code], -1).toFixed(5)}</p>

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
                  stroke="#0f62fe"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={styles.actions}>
          <Button type="buySell">
            Sell {currency.code} <span>3.63465</span>
          </Button>
          <Button type="buySell">
            Buy {currency.code} <span>3.745356</span>
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
