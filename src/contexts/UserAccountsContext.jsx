import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./authContext";

const BASE_URL = "http://localhost:8000";

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

    case "accounts/setCurrent":
      return { ...state, currentAccount: action.payload, loading: false };

    case "rejected":
      return { ...state, loading: false, error: action.payload };

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

  function addAccount(account) {
    dispatch({ type: "accounts/add", payload: account });
  }

  function setCurrentAccount(account) {
    dispatch({ type: "accounts/setCurrent", payload: account });
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
