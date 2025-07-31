import { createContext, useContext, useEffect, useState } from "react";

// Kontekst
const UserAccountsContext = createContext();

// Provider
function UserAccountsProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch z mocka (zastąpisz potem realnym API)
  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await fetch("/mock/accounts.json");
        const data = await response.json();
        setAccounts(data);
      } catch (err) {
        console.error("Error loading accounts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAccounts();
  }, []);

  return (
    <UserAccountsContext.Provider value={{ accounts, loading }}>
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
