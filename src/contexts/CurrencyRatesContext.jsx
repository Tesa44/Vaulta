import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { topCurrencies } from "../data/currencies";
import { useUserAccounts } from "./UserAccountsContext";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };

    case "rates/loaded":
      return {
        ...state,
        loading: false,
        rates: action.payload,
        buyRates: calcBuyRates(action.payload),
        sellRates: calcSellRates(action.payload),
      };

    case "history/loaded":
      return {
        ...state,
        loading: false,
        history: action.payload,
      };

    case "rejected":
      return { ...state, loading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

const CurrencyRatesContext = createContext();

const initialState = {
  rates: [],
  buyRates: [],
  sellRates: [],
  history: [],
  loading: false,
  error: "",
};

function calcBuyRates(invertedRates) {
  return Object.fromEntries(
    Object.entries(invertedRates).map(([key, value]) => [
      key,
      (value * 1.05).toFixed(5),
    ])
  );
}

function calcSellRates(invertedRates) {
  return Object.fromEntries(
    Object.entries(invertedRates).map(([key, value]) => [
      key,
      (value * 0.95).toFixed(5),
    ])
  );
}

function CurrencyRatesProvider({ children }) {
  const [{ rates, buyRates, sellRates, history, loading, error }, dispatch] =
    useReducer(reducer, initialState);

  const { getBaseCurrency } = useUserAccounts();
  const baseCurrency = getBaseCurrency() || "PLN";

  const filteredCurrencies = useMemo(() => {
    return topCurrencies.filter((c) => c.code !== baseCurrency);
  }, [baseCurrency]);

  useEffect(
    function () {
      async function fetchRates() {
        dispatch({ type: "loading" });
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?from=${baseCurrency}&to=${filteredCurrencies
              .map((cur) => cur.code)
              .join(",")}`
          );
          const { rates } = await res.json();
          const invertedRates = Object.fromEntries(
            Object.entries(rates).map(([key, value]) => [
              key,
              Math.pow(value, -1).toFixed(5),
            ])
          );
          dispatch({ type: "rates/loaded", payload: invertedRates });
        } catch (err) {
          console.error(err);
          dispatch({
            type: "rejected",
            payload: `There was an error loading data...`,
          });
        }
      }
      fetchRates();
    },
    [filteredCurrencies, baseCurrency]
  );

  useEffect(
    function () {
      async function fetchHistory() {
        dispatch({ type: "loading" });
        try {
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
          dispatch({ type: "history/loaded", payload: histArr });
        } catch (err) {
          console.error(err);
          dispatch({
            type: "rejected",
            payload: `There was an error loading data...`,
          });
        }
      }
      fetchHistory();
    },
    [filteredCurrencies, baseCurrency]
  );

  return (
    <CurrencyRatesContext.Provider
      value={{
        baseCurrency,
        rates,
        buyRates,
        sellRates,
        history,
        loading,
        error,
        filteredCurrencies,
      }}
    >
      {children}
    </CurrencyRatesContext.Provider>
  );
}

function useCurrencyRates() {
  const context = useContext(CurrencyRatesContext);
  if (!context) {
    throw new Error(
      "useCurrencyRates must be used within currencyRatesProvider"
    );
  }
  return context;
}

export { CurrencyRatesProvider, useCurrencyRates };
