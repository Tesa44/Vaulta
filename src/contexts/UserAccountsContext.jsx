import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./authContext";

const BASE_URL = "http://localhost:8000";

const EXCHANGE_TRANSFER_TITLE = "Currency exchange via Vaulta";

function generateFakeIBAN() {
  const country = "PL"; // Country
  const checksum = Math.floor(10 + Math.random() * 89); // check sum
  const bankCode = Math.floor(10000000 + Math.random() * 90000000); // 8 cyfr
  const accountNumber = Math.floor(
    1000000000000000 + Math.random() * 9000000000000000
  ); // 16 cyfr

  return `${country}${checksum}${bankCode}${accountNumber}`;
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };

    case "accounts/loaded":
      return { ...state, accounts: action.payload, loading: false };

    case "accounts/add":
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
        loading: false,
      };

    case "accounts/refresh":
      return {
        ...state,
        accounts: action.payload,
        loading: false,
      };

    case "accounts/setCurrent":
      return { ...state, currentAccount: action.payload, loading: false };

    case "accounts/updateCurrent":
      return {
        ...state,
        error: "",
        loading: false,
        currentAccount: action.payload,
        accounts: state.accounts.map((acc) =>
          acc.id === action.payload.id ? action.payload : acc
        ),
      };

    case "rejected":
      return { ...state, loading: false, error: action.payload };

    case "clearError": {
      return { ...state, error: "" };
    }

    default:
      throw new Error("Unknown action type");
  }
}

// Kontekst
const UserAccountsContext = createContext();

const initialState = {
  accounts: [],
  currentAccount: {},
  error: "",
  loading: false,
};

// Provider
function UserAccountsProvider({ children }) {
  const [{ accounts, currentAccount, error, loading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    async function fetchAccounts() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/accounts?userId=${user.id}`);
        const data = await response.json();
        dispatch({ type: "accounts/loaded", payload: data });

        const mainAccount = data.find((acc) => acc.type === "main");
        if (mainAccount) {
          dispatch({ type: "accounts/setCurrent", payload: mainAccount });
        }
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data ...",
        });
        console.error(err);
      }
    }

    fetchAccounts();
  }, [user]);

  async function addAccount({ name, currency, balance, type, targetAmount }) {
    dispatch({ type: "loading" });

    const accountData = {
      iban: generateFakeIBAN(),
      name,
      currency,
      balance,
      type,
      userId: user.id,
      transactions: [
        {
          id: crypto.randomUUID(),
          title: "Initial deposit",
          name: `${user.name} ${user.surname}`,
          amount: balance,
          balanceAfter: balance,
          date: new Date().toISOString(),
        },
      ],
      ...(type === "goal" && { targetAmount }),
    };

    try {
      const res = await fetch(`${BASE_URL}/accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountData),
      });

      const newAccount = await res.json();

      dispatch({ type: "accounts/add", payload: newAccount });
      dispatch({ type: "accounts/setCurrent", payload: newAccount });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: `Could not create account ${err.message}`,
      });
    }
  }

  function setCurrentAccount(account) {
    dispatch({ type: "accounts/setCurrent", payload: account });
  }

  async function findAccountByIBAN(iban) {
    try {
      const res = await fetch(`${BASE_URL}/accounts?iban=${iban}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      return data.length > 0 ? data[0] : null;
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
      return null;
    }
  }

  async function transferMoney(receiverIban, amount, title, receiverName) {
    dispatch({ type: "loading" });

    try {
      const receiverAccount = await findAccountByIBAN(receiverIban);

      if (receiverAccount === null) throw new Error("Could not find account");

      if (currentAccount.currency !== receiverAccount.currency)
        throw new Error(
          `Currencies do not match. (${receiverAccount.currency})`
        );

      if (Number(amount) <= 0) {
        throw new Error("Transfer amount must be greater than 0.");
      }

      if (Number(amount) > currentAccount.balance) {
        throw new Error("Insufficient funds.");
      }

      const newFromBalance = currentAccount.balance - amount;
      const newToBalance = receiverAccount.balance + Number(amount);

      const fromTransaction = createTransaction({
        title,
        name: receiverName,
        balanceAfter: newFromBalance,
        amount: -amount,
      });

      const toTransaction = createTransaction({
        title,
        name: `${user.name} ${user.surname}`,
        amount: Number(amount),
        balanceAfter: newToBalance,
      });

      const updatedCurrentAccount = updateAccount(
        currentAccount,
        newFromBalance,
        fromTransaction
      );
      const updatedReceiverAccount = updateAccount(
        receiverAccount,
        newToBalance,
        toTransaction
      );

      await Promise.all([
        patchAccount(updatedCurrentAccount),
        patchAccount(updatedReceiverAccount),
      ]);

      dispatch({
        type: "accounts/updateCurrent",
        payload: updatedCurrentAccount,
      });
      return true;
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
      console.error(err.message);
      return false;
    }
  }

  async function exchangeMoney(fromAccount, toAccount, amountFrom, amountTo) {
    dispatch({ type: "loading" });
    try {
      if (Number(amountFrom) <= 0 || Number(amountTo) <= 0) {
        throw new Error("Transfer amount must be greater than 0.");
      }
      if (!fromAccount.id || !toAccount.id)
        throw new Error("Please select or add new account");

      if (Number(amountFrom) > fromAccount.balance) {
        throw new Error("Insufficient funds.");
      }

      const newFromBalance = fromAccount.balance - amountFrom;
      const newToBalance = toAccount.balance + Number(amountTo);

      const fromTransaction = createTransaction({
        title: EXCHANGE_TRANSFER_TITLE,
        name: `${user.name} ${user.surname}`,
        amount: -amountFrom,
        balanceAfter: newFromBalance,
      });

      const toTransaction = createTransaction({
        title: EXCHANGE_TRANSFER_TITLE,
        name: `${user.name} ${user.surname}`,
        amount: Number(amountTo),
        balanceAfter: newToBalance,
      });

      const updatedFromAccount = updateAccount(
        fromAccount,
        newFromBalance,
        fromTransaction
      );

      const updatedToAccount = updateAccount(
        toAccount,
        newToBalance,
        toTransaction
      );

      const updatedUserAccounts = accounts.map((acc) => {
        if (acc.id === fromAccount.id) {
          return updatedFromAccount;
        }
        if (acc.id === toAccount.id) {
          return updatedToAccount;
        }
        return acc;
      });

      await Promise.all([
        patchAccount(updatedFromAccount),
        patchAccount(updatedToAccount),
      ]);

      dispatch({ type: "accounts/loaded", payload: updatedUserAccounts });
      return true;
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
      console.error(err.message);
      return false;
    }
  }

  function clearError() {
    dispatch({ type: "clearError" });
  }

  function getMainAccount() {
    return accounts.find((acc) => acc.type === "main");
  }

  function getAccountsByCurrency(currency) {
    return accounts.filter((acc) => acc.currency === currency);
  }

  function getBaseCurrency() {
    const mainAccount = getMainAccount();
    if (mainAccount) return mainAccount.currency;
    return null;
  }

  function createTransaction({ title, name, amount, balanceAfter }) {
    return {
      id: crypto.randomUUID(),
      title,
      name,
      amount,
      balanceAfter,
      date: new Date().toISOString(),
    };
  }

  function updateAccount(account, newBalance, transaction) {
    return {
      ...account,
      balance: newBalance,
      transactions: [...account.transactions, transaction],
    };
  }

  function patchAccount(account) {
    return fetch(`${BASE_URL}/accounts/${account.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account),
    });
  }

  return (
    <UserAccountsContext.Provider
      value={{
        accounts,
        currentAccount,
        error,
        loading,
        addAccount,
        setCurrentAccount,
        transferMoney,
        clearError,
        getMainAccount,
        getAccountsByCurrency,
        getBaseCurrency,
        exchangeMoney,
      }}
    >
      {children}
    </UserAccountsContext.Provider>
  );
}

// Hook do użycia kontekstu
function useUserAccounts() {
  const context = useContext(UserAccountsContext);
  if (!context) {
    throw new Error("useUserAccounts must be used within UserAccountsProvider");
  }
  return context;
}

export { UserAccountsProvider, useUserAccounts };
