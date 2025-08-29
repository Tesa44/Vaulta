import { createContext, useCallback, useContext, useReducer } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };

    case "auth/login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: "",
      };

    case "auth/logout":
      localStorage.removeItem("token");
      return { ...state, user: null, isAuthenticated: false, loading: false };

    case "rejected":
      return { ...state, error: action.payload, loading: false };

    case "clearError": {
      return { ...state, error: "" };
    }

    default:
      throw new Error("Unknown action type");
  }
}

const FAKE_USER = {
  id: 1,
  name: "Jan",
  surname: "Kowalski",
  email: "kowalski@gmail.com",
  password: "12345",
};

const initialState = {
  user: FAKE_USER,
  isAuthenticated: false,
  loading: "",
  error: "",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email, password) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      const token = data.access_token;
      localStorage.setItem("token", token);

      const user = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "auth/login", payload: user });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  function logout() {
    dispatch({ type: "auth/logout" });
  }

  async function register(user) {
    const { name, surname, email, password } = user;
    dispatch({ type: "loading" });
    try {
      const existing = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      await console.log(existing);
      const found = await existing.json();

      if (found.length > 0) {
        throw new Error("User already exists");
      }

      const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password }),
      });

      if (!res.ok) throw new Error("Something went wrong with register");

      return true;
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
      return false;
    }
  }

  const clearError = useCallback(function () {
    dispatch({ type: "clearError" });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        error,
        loading,
        register,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside  AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
